/**
 * generate-channel-art.ts
 *
 * Reads a production prompt from data/channelArtPrompts.ts and generates
 * the asset directly into the correct repo folder using the OpenAI images API.
 *
 * Usage:
 *   npm run art:generate -- --channel tiger-sundays --asset row-bg
 *   npm run art:generate -- --channel kobe-tv --asset logo --dry-run
 *   npm run art:generate -- --channel mike-tyson-tv --asset badge --force
 *
 * Aspect-ratio note:
 *   gpt-image-1 supported sizes: 1024x1024 (1:1), 1536x1024 (~3:2), 1024x1536 (~2:3)
 *   Target ratios vs nearest available:
 *     row-bg     : target 5:1  → 1536x1024 (~3:2). Crop/resize if needed.
 *     profile-bg : target 3:4  → 1024x1536 (~2:3). Slightly taller than target.
 *     logo       : target 1:1  → 1024x1024. Exact match.
 *     badge      : target 1:1  → 1024x1024. Exact match.
 *     logo-spin  : target 1:1  → 1024x1024. Exact match.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import OpenAI from "openai";
import { getPromptForAsset } from "../data/channelArtPrompts";
import type { ChannelArtAssetType } from "../data/channelArtPrompts";

// --- Types ---

type SupportedSize = "1024x1024" | "1536x1024" | "1024x1536";
type OutputFormat = "png" | "webp";

// --- Constants ---

const SIZE_MAP: Record<ChannelArtAssetType, SupportedSize> = {
  "row-bg": "1536x1024",
  "profile-bg": "1024x1536",
  logo: "1024x1024",
  badge: "1024x1024",
  "logo-spin": "1024x1024",
};

const FORMAT_MAP: Record<ChannelArtAssetType, OutputFormat> = {
  "row-bg": "png",
  "profile-bg": "png",
  logo: "png",
  badge: "png",
  "logo-spin": "webp",
};

const WIRE_FIELD: Record<ChannelArtAssetType, string> = {
  "row-bg": "rowBackgroundUrl",
  "profile-bg": "profileBackgroundUrl",
  logo: "logoUrl",
  badge: "badgeUrl  // future field — not in data/channels.ts yet",
  "logo-spin": "logoSpinUrl",
};

const VALID_ASSETS: ChannelArtAssetType[] = ["row-bg", "profile-bg", "logo", "badge", "logo-spin"];

// --- Env loading ---

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  let contents: string;
  try {
    contents = readFileSync(envPath, "utf-8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const raw = trimmed.slice(eqIdx + 1).trim();
    const value = raw.replace(/^["']|["']$/g, "");
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// --- CLI ---

function usage(): never {
  console.error(`
Usage:
  npm run art:generate -- --channel <slug> --asset <type> [--force] [--dry-run] [--provider openai]

Asset types:
  row-bg | profile-bg | logo | badge | logo-spin

Examples:
  npm run art:generate -- --channel tiger-sundays --asset row-bg
  npm run art:generate -- --channel kobe-tv --asset logo --dry-run
  npm run art:generate -- --channel mike-tyson-tv --asset badge --force
`);
  process.exit(1);
}

function readOption(args: string[], name: string): string | undefined {
  const idx = args.indexOf(name);
  return idx === -1 ? undefined : args[idx + 1];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const channel = readOption(args, "--channel");
  const assetRaw = readOption(args, "--asset");
  const provider = readOption(args, "--provider") ?? "openai";
  const force = args.includes("--force");
  const dryRun = args.includes("--dry-run");

  if (!channel || !/^[a-z0-9-]+$/.test(channel)) {
    console.error("Error: --channel is required and must be a valid slug (lowercase, hyphens only).");
    usage();
  }

  if (!assetRaw || !VALID_ASSETS.includes(assetRaw as ChannelArtAssetType)) {
    console.error(`Error: --asset is required. Valid values: ${VALID_ASSETS.join(", ")}`);
    usage();
  }

  return { channel, asset: assetRaw as ChannelArtAssetType, provider, force, dryRun };
}

// --- Main ---

async function main() {
  loadEnvLocal();

  const { channel, asset, provider, force, dryRun } = parseArgs();

  const promptData = getPromptForAsset(channel, asset);
  if (!promptData) {
    console.error(`No prompt found for channel "${channel}" + asset "${asset}".`);
    console.error(`Check CHANNEL_ASSET_IDEATION_BLUEPRINTS in data/channelArtPrompts.ts for valid slugs.`);
    process.exit(1);
  }

  const targetPath = resolve(process.cwd(), `public${promptData.targetPath}`);
  const targetDir = dirname(targetPath);
  const size = SIZE_MAP[asset];
  const outputFormat = FORMAT_MAP[asset];
  const wireValue = `/channel-art/${channel}/${promptData.targetFileName}`;
  const wireField = WIRE_FIELD[asset];

  // --- Print summary ---
  console.log("");
  console.log(`Channel  : ${promptData.channelName} (${channel})`);
  console.log(`Asset    : ${asset}`);
  console.log(`Provider : ${provider}`);
  console.log(`Model    : gpt-image-1`);
  console.log(`Size     : ${size} (target ratio: ${promptData.aspectRatio})`);
  console.log(`Format   : ${outputFormat}`);
  console.log(`Target   : ${targetPath}`);
  console.log(`Prompt   :`);
  console.log(`  ${promptData.prompt}`);
  console.log("");

  if (dryRun) {
    console.log("--- DRY RUN — no API call made ---");
    console.log("");
    console.log(`Wire into data/channels.ts for "${channel}":`);
    console.log(`  ${wireField}: "${wireValue}",`);
    console.log("");
    return;
  }

  if (existsSync(targetPath) && !force) {
    console.error(`File already exists: ${targetPath}`);
    console.error(`Re-run with --force to overwrite.`);
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY. Add it to your shell or .env.local.");
    process.exit(1);
  }

  if (provider !== "openai") {
    console.error(`Provider "${provider}" is not supported yet. Only "openai" is available.`);
    process.exit(1);
  }

  console.log("Calling OpenAI image generation...");

  const client = new OpenAI({ apiKey });

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: promptData.prompt,
    n: 1,
    size,
    output_format: outputFormat,
  });

  const imageData = response.data?.[0];
  if (!imageData) {
    console.error("OpenAI returned no image data.");
    process.exit(1);
  }

  const b64 = imageData.b64_json;
  if (!b64) {
    console.error("Expected base64 image data but received none.");
    console.error("gpt-image-1 should always return b64_json. Check the API response.");
    process.exit(1);
  }

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetPath, Buffer.from(b64, "base64"));

  if (!existsSync(targetPath)) {
    console.error(`Write appeared to succeed but file not found: ${targetPath}`);
    process.exit(1);
  }

  console.log(`Saved    : ${targetPath}`);
  console.log("");
  console.log(`Wire into data/channels.ts for "${channel}":`);
  console.log(`  ${wireField}: "${wireValue}",`);
  console.log("");
  console.log(`Then run: npm run build`);
  console.log("");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
