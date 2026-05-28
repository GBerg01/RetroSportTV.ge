import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  extractYouTubeId,
  getYouTubeWatchUrl,
  isValidYouTubeId,
} from "../lib/content/validation";

type ParsedArgs = {
  channelSlug: string;
  input: string;
  title: string;
  tags: string[];
  qualityScore?: number;
};

function usage(): never {
  console.error(`
Usage:
  npm run content:add-video -- <channel-slug> <youtube-url-or-id> "<title>" [--tags tag1,tag2] [--qualityScore 80]

Example:
  npm run content:add-video -- kobe-tv https://youtu.be/0RvPKROSXEQ "Kobe Bryant 81 Point Game" --tags kobe,lakers,nba --qualityScore 95
`);
  process.exit(1);
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  const tags: string[] = [];
  let qualityScore: number | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--tags") {
      const value = argv[i + 1];
      if (!value) usage();
      tags.push(
        ...value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      );
      i += 1;
      continue;
    }

    if (arg === "--qualityScore") {
      const value = argv[i + 1];
      if (!value) usage();
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
        console.error("qualityScore must be a number from 0 to 100.");
        process.exit(1);
      }
      qualityScore = parsed;
      i += 1;
      continue;
    }

    positionals.push(arg);
  }

  const [channelSlug, input, ...titleParts] = positionals;
  const title = titleParts.join(" ").trim();

  if (!channelSlug || !input || !title) usage();
  return { channelSlug, input, title, tags, qualityScore };
}

function findMatchingBracket(source: string, openIndex: number): number {
  let depth = 0;
  let quote: '"' | "'" | "`" | null = null;
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function findChannelVideosRange(source: string, channelSlug: string) {
  const slugNeedle = `slug: ${JSON.stringify(channelSlug)}`;
  const slugIndex = source.indexOf(slugNeedle);
  if (slugIndex === -1) {
    console.error(`No channel found for slug "${channelSlug}".`);
    process.exit(1);
  }

  const videosNeedle = "videos:";
  const videosIndex = source.indexOf(videosNeedle, slugIndex);
  if (videosIndex === -1) {
    console.error(`Channel "${channelSlug}" does not have a videos array.`);
    process.exit(1);
  }

  const openIndex = source.indexOf("[", videosIndex);
  if (openIndex === -1) {
    console.error(`Channel "${channelSlug}" has an invalid videos array.`);
    process.exit(1);
  }

  const closeIndex = findMatchingBracket(source, openIndex);
  if (closeIndex === -1) {
    console.error(`Could not find the end of the videos array for "${channelSlug}".`);
    process.exit(1);
  }

  return { openIndex, closeIndex };
}

function formatVideoObject(args: ParsedArgs, videoId: string): string {
  const lines = [
    "      {",
    `        id: ${JSON.stringify(videoId)},`,
    `        title: ${JSON.stringify(args.title)},`,
    `        originalUrl: ${JSON.stringify(getYouTubeWatchUrl(videoId))},`,
    `        source: "manual-curation",`,
    `        thumbnailUrl: ${JSON.stringify(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)},`,
  ];

  if (args.tags.length > 0) {
    lines.push(`        tags: ${JSON.stringify(args.tags)},`);
  }

  if (typeof args.qualityScore === "number") {
    lines.push(`        qualityScore: ${args.qualityScore},`);
  }

  lines.push(
    "        approved: true,",
    "        embeddable: true,",
    `        validationStatus: "unchecked",`,
    "      },"
  );

  return lines.join("\n");
}

const args = parseArgs(process.argv.slice(2));
const videoId = extractYouTubeId(args.input);

if (!videoId || !isValidYouTubeId(videoId)) {
  console.error(`Invalid YouTube URL or video ID: ${args.input}`);
  process.exit(1);
}

const channelsPath = resolve(process.cwd(), "data/channels.ts");
const source = readFileSync(channelsPath, "utf8");
const { openIndex, closeIndex } = findChannelVideosRange(source, args.channelSlug);
const videosSource = source.slice(openIndex, closeIndex + 1);
const duplicatePattern = new RegExp(`id:\\s*${JSON.stringify(videoId).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);

if (duplicatePattern.test(videosSource)) {
  console.error(`Video ${videoId} already exists in channel "${args.channelSlug}".`);
  process.exit(1);
}

const videoObject = formatVideoObject(args, videoId);
const insertion = `\n${videoObject}`;
const updated = `${source.slice(0, closeIndex)}${insertion}${source.slice(closeIndex)}`;

writeFileSync(channelsPath, updated);

console.log(`Added ${videoId} to ${args.channelSlug}: ${args.title}`);

