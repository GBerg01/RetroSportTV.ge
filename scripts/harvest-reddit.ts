/**
 * Harvests YouTube highlight links from Reddit's public JSON API.
 * No API key required — uses Reddit's unauthenticated read endpoint.
 * Top-voted posts are community-quality-filtered already.
 *
 * Usage:
 *   npm run content:harvest-reddit -- --sub <subreddit> --query <search> --slug <channel-slug> [--min-score N]
 *
 * Examples:
 *   npm run content:harvest-reddit -- --sub nba --query "jordan highlights" --slug jordan-tv
 *   npm run content:harvest-reddit -- --sub nfl --query "super bowl highlights" --slug super-bowl-channel --min-score 2000
 *   npm run content:harvest-reddit -- --sub Boxing --query "tyson knockout" --slug mike-tyson-tv
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

type RedditPost = {
  data: {
    title: string;
    url: string;
    score: number;
    subreddit: string;
    permalink: string;
  };
};

function usage(): never {
  console.error(`
Usage:
  npm run content:harvest-reddit -- --sub <subreddit> --query <search> --slug <channel-slug> [--min-score N]

Examples:
  npm run content:harvest-reddit -- --sub nba --query "jordan highlights" --slug jordan-tv
  npm run content:harvest-reddit -- --sub nfl --query "super bowl highlights" --slug super-bowl-channel
  npm run content:harvest-reddit -- --sub Boxing --query "tyson knockout" --slug mike-tyson-tv --min-score 500
`);
  process.exit(1);
}

function getArg(args: string[], flag: string): string | null {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

function fetchJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "retrosport-content-harvester/1.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error("Invalid JSON response"));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
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

function scoreToQuality(score: number): number {
  if (score >= 20000) return 95;
  if (score >= 10000) return 92;
  if (score >= 5000) return 89;
  if (score >= 2000) return 86;
  if (score >= 1000) return 83;
  return 80;
}

async function main() {
  const args = process.argv.slice(2);
  const sub = getArg(args, "--sub");
  const query = getArg(args, "--query");
  const slug = getArg(args, "--slug");
  const minScoreArg = getArg(args, "--min-score");
  const minScore = minScoreArg ? parseInt(minScoreArg, 10) : 500;

  if (!sub || !query || !slug) usage();

  const encoded = encodeURIComponent(query!);
  const apiUrl = `https://www.reddit.com/r/${sub}/search.json?q=${encoded}&sort=top&t=all&limit=100&type=link&restrict_sr=1`;

  console.log(`\nSearching r/${sub} for: "${query}" (min score: ${minScore})`);
  console.log(`API: ${apiUrl}\n`);

  let json: unknown;
  try {
    json = await fetchJson(apiUrl);
  } catch (err) {
    console.error(`Reddit API failed: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }

  // Extract posts
  const posts: RedditPost[] = [];
  try {
    const listing = json as { data: { children: RedditPost[] } };
    posts.push(...listing.data.children);
  } catch {
    console.error("Unexpected Reddit API response shape.");
    process.exit(1);
  }

  console.log(`Found ${posts.length} post(s) from Reddit`);

  // Filter for YouTube links above minimum score
  const ytPosts = posts.filter((p) => {
    const url = p.data.url;
    const score = p.data.score;
    return score >= minScore && (url.includes("youtube.com/watch") || url.includes("youtu.be/"));
  });

  console.log(`${ytPosts.length} YouTube link(s) meet score threshold (≥${minScore})\n`);

  if (ytPosts.length === 0) {
    console.log("No qualifying YouTube links found. Try a different query or lower --min-score.");
    process.exit(0);
  }

  // Validate embeddability
  console.log("Checking embeddability via oEmbed...");
  const embeddable: Array<{ id: string; title: string; score: number }> = [];

  for (const post of ytPosts) {
    const videoId = extractYouTubeId(post.data.url);
    if (!videoId || !isValidYouTubeId(videoId)) {
      console.log(`  SKIP  (bad ID)  ${post.data.url.slice(0, 60)}`);
      continue;
    }
    const ok = await checkEmbeddable(videoId);
    const scoreLabel = post.data.score.toLocaleString().padStart(6);
    console.log(`  ${ok ? "OK  " : "SKIP"} [${scoreLabel}] ${videoId}  ${post.data.title.slice(0, 55)}`);
    if (ok) {
      embeddable.push({ id: videoId, title: post.data.title, score: post.data.score });
    }
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
      qualityScore: scoreToQuality(v.score),
    }));

  existing.videos.push(...newCandidates);
  writeFileSync(outPath, JSON.stringify(existing, null, 2) + "\n");

  console.log(`\nResult: ${newCandidates.length} new verified candidate(s) added to ${outPath}`);
  console.log(`Total candidates in file: ${existing.videos.length}`);
  if (embeddable.length < ytPosts.length) {
    console.log(`Skipped ${ytPosts.length - embeddable.length} embed-blocked or duplicate video(s)`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
