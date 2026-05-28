/**
 * Harvests YouTube videos from a public playlist or channel RSS feed.
 * No API key required — uses YouTube's public RSS endpoint.
 *
 * Usage:
 *   npm run content:harvest-playlist -- --playlist <PLAYLIST_ID> --slug <channel-slug> [--keywords kw1,kw2]
 *   npm run content:harvest-playlist -- --channel <CHANNEL_ID> --slug <channel-slug> [--keywords kw1,kw2]
 *
 * Examples:
 *   npm run content:harvest-playlist -- --playlist PLbpi6ZahtOH6Ar_3GPy3workfGYez3EVY --slug sportscenter-classics
 *   npm run content:harvest-playlist -- --channel UCiWLfSweyRNmLpgEHekhoAg --slug sportscenter-classics --keywords sportscenter
 *   npm run content:harvest-playlist -- --channel UCWJ2lWNubArHWmf3FIHbfcQ --slug nba-finals-channel --keywords finals,classic
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import https from "node:https";
import { extractYouTubeId, isValidYouTubeId, getYouTubeWatchUrl } from "../lib/content/validation";

type CandidateVideo = {
  urlOrId: string;
  title: string;
  tags: string[];
  vibeTags: string[];
  qualityScore: number;
};

type CandidateFile = {
  channelSlug: string;
  videos: CandidateVideo[];
};

function usage(): never {
  console.error(`
Usage:
  npm run content:harvest-playlist -- --playlist <PLAYLIST_ID> --slug <channel-slug> [--keywords kw1,kw2]
  npm run content:harvest-playlist -- --channel <CHANNEL_ID> --slug <channel-slug> [--keywords kw1,kw2]

Examples:
  npm run content:harvest-playlist -- --playlist PLbpi6ZahtOH6Ar_3GPy3workfGYez3EVY --slug sportscenter-classics
  npm run content:harvest-playlist -- --channel UCiWLfSweyRNmLpgEHekhoAg --slug sportscenter-classics --keywords sportscenter
  npm run content:harvest-playlist -- --channel UCWJ2lWNubArHWmf3FIHbfcQ --slug nba-finals-channel --keywords finals
`);
  process.exit(1);
}

function getArg(args: string[], flag: string): string | null {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        } else {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseRssFeed(xml: string): Array<{ id: string; title: string }> {
  const entries: Array<{ id: string; title: string }> = [];
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryPattern.exec(xml)) !== null) {
    const entry = match[1];
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]*)<\/title>/);
    if (idMatch && titleMatch) {
      entries.push({
        id: idMatch[1].trim(),
        title: decodeHtmlEntities(titleMatch[1].trim()),
      });
    }
  }
  return entries;
}

function checkEmbeddable(videoId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      resolve(res.statusCode === 200);
      res.resume();
    });
    req.on("error", () => resolve(false));
    req.setTimeout(8000, () => { req.destroy(); resolve(false); });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const playlistId = getArg(args, "--playlist");
  const channelId = getArg(args, "--channel");
  const slug = getArg(args, "--slug");
  const keywordsArg = getArg(args, "--keywords");

  if ((!playlistId && !channelId) || !slug) usage();

  const keywords = keywordsArg ? keywordsArg.toLowerCase().split(",").map((k) => k.trim()) : [];

  const feedUrl = channelId
    ? `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    : `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  console.log(`\nFetching ${channelId ? "channel" : "playlist"} RSS: ${feedUrl}`);

  let xml: string;
  try {
    xml = await fetchUrl(feedUrl);
  } catch (err) {
    console.error(`Failed to fetch feed: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }

  const videos = parseRssFeed(xml);
  console.log(`Found ${videos.length} video(s) in feed`);

  if (videos.length === 0) {
    console.error("No videos found — check the playlist ID and ensure it is public.");
    process.exit(1);
  }

  const filtered = keywords.length > 0
    ? videos.filter((v) => keywords.some((kw) => v.title.toLowerCase().includes(kw)))
    : videos;

  if (keywords.length > 0) {
    console.log(`Keyword-filtered to ${filtered.length} video(s) matching: ${keywords.join(", ")}`);
  }

  console.log("\nChecking embeddability via oEmbed...");
  const embeddable: Array<{ id: string; title: string }> = [];

  for (const video of filtered) {
    if (!isValidYouTubeId(video.id)) {
      console.log(`  SKIP  ${video.id}  (invalid ID)`);
      continue;
    }
    const ok = await checkEmbeddable(video.id);
    console.log(`  ${ok ? "OK  " : "SKIP"} ${video.id}  ${video.title.slice(0, 70)}`);
    if (ok) embeddable.push(video);
    await sleep(100);
  }

  const outPath = resolve(process.cwd(), `data/intake/${slug}-candidates.json`);
  const existing: CandidateFile = existsSync(outPath)
    ? JSON.parse(readFileSync(outPath, "utf8"))
    : { channelSlug: slug, videos: [] };

  const existingIds = new Set(
    existing.videos.map((v) => extractYouTubeId(v.urlOrId)).filter(Boolean)
  );

  const newCandidates = embeddable
    .filter((v) => !existingIds.has(v.id))
    .map((v) => ({
      urlOrId: getYouTubeWatchUrl(v.id),
      title: v.title,
      tags: [] as string[],
      vibeTags: [] as string[],
      qualityScore: 80,
    }));

  existing.videos.push(...newCandidates);
  writeFileSync(outPath, JSON.stringify(existing, null, 2) + "\n");

  console.log(`\nResult: ${newCandidates.length} new candidate(s) added to ${outPath}`);
  console.log(`Total candidates in file: ${existing.videos.length}`);
  if (embeddable.length < filtered.length) {
    console.log(`Skipped ${filtered.length - embeddable.length} embed-blocked or invalid video(s)`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
