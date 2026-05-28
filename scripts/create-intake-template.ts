import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function usage(): never {
  console.error(`
Usage:
  npm run content:create-intake -- <channel-slug> [--force]

Example:
  npm run content:create-intake -- kobe-tv
`);
  process.exit(1);
}

const args = process.argv.slice(2);
const channelSlug = args.find((arg) => !arg.startsWith("--"));
const force = args.includes("--force");

if (!channelSlug) usage();

if (!/^[a-z0-9-]+$/.test(channelSlug)) {
  console.error("channel-slug must use lowercase letters, numbers, and hyphens.");
  process.exit(1);
}

const intakeDir = resolve(process.cwd(), "data/intake");
const outputPath = resolve(intakeDir, `${channelSlug}-candidates.json`);

mkdirSync(intakeDir, { recursive: true });

if (existsSync(outputPath) && !force) {
  console.error(`Refusing to overwrite existing file: ${outputPath}`);
  console.error("Re-run with --force if you intentionally want to replace it.");
  process.exit(1);
}

const template = {
  channelSlug,
  videos: [],
};

writeFileSync(outputPath, `${JSON.stringify(template, null, 2)}\n`);
console.log(`Created ${outputPath}`);

