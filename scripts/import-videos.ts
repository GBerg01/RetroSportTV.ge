import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  extractYouTubeId,
  getYouTubeWatchUrl,
  isValidYouTubeId,
} from "../lib/content/validation";

type IntakeVideo = {
  urlOrId: string;
  title: string;
  tags?: string[];
  vibeTags?: string[];
  qualityScore?: number;
};

type IntakeFile = {
  channelSlug: string;
  videos: IntakeVideo[];
};

type ImportSummary = {
  added: number;
  skippedDuplicates: number;
  rejectedInvalid: number;
};

function usage(): never {
  console.error(`
Usage:
  npm run content:import-videos -- <path-to-intake-json>

Example:
  npm run content:import-videos -- data/intake/example-videos.json
`);
  process.exit(1);
}

function assertString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
}

function normalizeStringArray(value: unknown, label: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${label} must be an array of strings.`);
  }

  const normalized = value.map((item) => item.trim()).filter(Boolean);
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeQualityScore(value: unknown): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error("qualityScore must be a number from 0 to 100.");
  }
  return value;
}

function parseIntakeFile(raw: string): IntakeFile {
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Intake file must be a JSON object.");
  }

  const record = parsed as Record<string, unknown>;
  const channelSlug = assertString(record.channelSlug, "channelSlug");

  if (!Array.isArray(record.videos)) {
    throw new Error("videos must be an array.");
  }

  const videos = record.videos.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`videos[${index}] must be an object.`);
    }

    const video = item as Record<string, unknown>;
    return {
      urlOrId: assertString(video.urlOrId, `videos[${index}].urlOrId`),
      title: assertString(video.title, `videos[${index}].title`),
      tags: normalizeStringArray(video.tags, `videos[${index}].tags`),
      vibeTags: normalizeStringArray(video.vibeTags, `videos[${index}].vibeTags`),
      qualityScore: normalizeQualityScore(video.qualityScore),
    };
  });

  return { channelSlug, videos };
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
    throw new Error(`No channel found for slug "${channelSlug}".`);
  }

  const videosIndex = source.indexOf("videos:", slugIndex);
  if (videosIndex === -1) {
    throw new Error(`Channel "${channelSlug}" does not have a videos array.`);
  }

  const openIndex = source.indexOf("[", videosIndex);
  if (openIndex === -1) {
    throw new Error(`Channel "${channelSlug}" has an invalid videos array.`);
  }

  const closeIndex = findMatchingBracket(source, openIndex);
  if (closeIndex === -1) {
    throw new Error(`Could not find the end of the videos array for "${channelSlug}".`);
  }

  return { openIndex, closeIndex };
}

function getExistingVideoIds(videosSource: string): Set<string> {
  const ids = new Set<string>();
  const pattern = /id:\s*"([^"]+)"/g;
  let match = pattern.exec(videosSource);

  while (match) {
    ids.add(match[1]);
    match = pattern.exec(videosSource);
  }

  return ids;
}

function formatVideoObject(video: IntakeVideo, videoId: string): string {
  const lines = [
    "      {",
    `        id: ${JSON.stringify(videoId)},`,
    `        title: ${JSON.stringify(video.title)},`,
    `        originalUrl: ${JSON.stringify(getYouTubeWatchUrl(videoId))},`,
    `        source: "manual-curation",`,
    `        thumbnailUrl: ${JSON.stringify(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)},`,
  ];

  if (video.tags && video.tags.length > 0) {
    lines.push(`        tags: ${JSON.stringify(video.tags)},`);
  }

  if (video.vibeTags && video.vibeTags.length > 0) {
    lines.push(`        vibeTags: ${JSON.stringify(video.vibeTags)},`);
  }

  if (typeof video.qualityScore === "number") {
    lines.push(`        qualityScore: ${video.qualityScore},`);
  }

  lines.push(
    "        approved: true,",
    "        embeddable: true,",
    `        validationStatus: "unchecked",`,
    "      },"
  );

  return lines.join("\n");
}

const [intakePathArg] = process.argv.slice(2);
if (!intakePathArg) usage();

const summary: ImportSummary = {
  added: 0,
  skippedDuplicates: 0,
  rejectedInvalid: 0,
};

try {
  const intakePath = resolve(process.cwd(), intakePathArg);
  const intake = parseIntakeFile(readFileSync(intakePath, "utf8"));
  const channelsPath = resolve(process.cwd(), "data/channels.ts");
  const source = readFileSync(channelsPath, "utf8");
  const { openIndex, closeIndex } = findChannelVideosRange(source, intake.channelSlug);
  const videosSource = source.slice(openIndex, closeIndex + 1);
  const seenVideoIds = getExistingVideoIds(videosSource);
  const videoObjects: string[] = [];

  for (const video of intake.videos) {
    const videoId = extractYouTubeId(video.urlOrId);

    if (!videoId || !isValidYouTubeId(videoId)) {
      summary.rejectedInvalid += 1;
      console.warn(`Rejected invalid video: ${video.urlOrId}`);
      continue;
    }

    if (seenVideoIds.has(videoId)) {
      summary.skippedDuplicates += 1;
      console.warn(`Skipped duplicate video: ${videoId}`);
      continue;
    }

    seenVideoIds.add(videoId);
    videoObjects.push(formatVideoObject(video, videoId));
    summary.added += 1;
  }

  if (videoObjects.length > 0) {
    const insertionIndex = source.lastIndexOf("\n", closeIndex) + 1;
    const insertion = `${videoObjects.join("\n")}\n`;
    const updated = `${source.slice(0, insertionIndex)}${insertion}${source.slice(insertionIndex)}`;
    writeFileSync(channelsPath, updated);
  }

  console.log(
    `Import complete: added ${summary.added}, skipped duplicates ${summary.skippedDuplicates}, rejected invalid ${summary.rejectedInvalid}.`
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

