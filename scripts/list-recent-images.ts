import { readdirSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";
import { homedir } from "node:os";

type RecentImage = {
  path: string;
  modifiedAt: number;
  size: number;
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const DEFAULT_LIMIT = 20;
const REPO_ROOT = resolve(process.cwd());

function usage(): never {
  console.error(`
Usage:
  npm run art:list-recent -- [--desktop] [--downloads] [--limit 20]

Examples:
  npm run art:list-recent
  npm run art:list-recent -- --downloads --limit 10
`);
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let includeDesktop = args.includes("--desktop");
  let includeDownloads = args.includes("--downloads");
  let limit = DEFAULT_LIMIT;

  const limitIndex = args.indexOf("--limit");
  if (limitIndex !== -1) {
    const rawLimit = args[limitIndex + 1];
    if (!rawLimit || Number.isNaN(Number(rawLimit))) usage();
    limit = Number(rawLimit);
  }

  if (!includeDesktop && !includeDownloads) {
    includeDesktop = true;
    includeDownloads = true;
  }

  return { includeDesktop, includeDownloads, limit };
}

function collectImages(dir: string, images: RecentImage[]) {
  const resolvedDir = resolve(dir);
  if (resolvedDir === REPO_ROOT || resolvedDir.startsWith(`${REPO_ROOT}${sep}`)) return;

  let entries: string[];

  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".git" || entry === ".next") continue;

    const path = join(dir, entry);
    let stat;

    try {
      stat = statSync(path);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      collectImages(path, images);
      continue;
    }

    if (!stat.isFile()) continue;

    if (IMAGE_EXTENSIONS.has(extname(entry).toLowerCase())) {
      images.push({
        path,
        modifiedAt: stat.mtimeMs,
        size: stat.size,
      });
    }
  }
}

const { includeDesktop, includeDownloads, limit } = parseArgs();
const roots = [
  includeDesktop ? resolve(homedir(), "Desktop") : null,
  includeDownloads ? resolve(homedir(), "Downloads") : null,
].filter((root): root is string => Boolean(root));

const images: RecentImage[] = [];
for (const root of roots) collectImages(root, images);

images.sort((a, b) => b.modifiedAt - a.modifiedAt);

for (const image of images.slice(0, limit)) {
  const modified = new Date(image.modifiedAt).toLocaleString();
  console.log(`${modified}\t${image.size} bytes\t${image.path}`);
}
