import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";

type AssetType = "row-bg" | "profile-bg" | "logo" | "logo-spin";

type ImageCandidate = {
  path: string;
  modifiedAt: number;
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const REPO_ROOT = resolve(process.cwd());
const STATIC_ASSET_TARGETS: Record<Exclude<AssetType, "logo-spin">, string> = {
  "row-bg": "row-bg.png",
  "profile-bg": "profile-bg.png",
  logo: "logo.png",
};

function usage(): never {
  console.error(`
Usage:
  npm run art:import -- --channel <slug> --asset <row-bg|profile-bg|logo|logo-spin> --source <latest-desktop|latest-downloads|/full/path> [--force] [--reveal]

Examples:
  npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop
  npm run art:import -- --channel kobe-tv --asset profile-bg --source latest-downloads
  npm run art:import -- --channel kobe-tv --asset logo-spin --source /full/path/to/file.webp
`);
  process.exit(1);
}

function readOption(args: string[], name: string) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const channel = readOption(args, "--channel");
  const asset = readOption(args, "--asset") as AssetType | undefined;
  const source = readOption(args, "--source");
  const force = args.includes("--force");
  const reveal = args.includes("--reveal");

  if (!channel || !/^[a-z0-9-]+$/.test(channel)) usage();
  if (!asset || !["row-bg", "profile-bg", "logo", "logo-spin"].includes(asset)) usage();
  if (!source) usage();

  return { channel, asset, source, force, reveal };
}

function collectImages(dir: string, images: ImageCandidate[]) {
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

    if (stat.isFile() && IMAGE_EXTENSIONS.has(extname(entry).toLowerCase())) {
      images.push({ path, modifiedAt: stat.mtimeMs });
    }
  }
}

function latestImageFrom(dir: string) {
  const images: ImageCandidate[] = [];
  collectImages(dir, images);
  images.sort((a, b) => b.modifiedAt - a.modifiedAt);
  return images[0]?.path;
}

function resolveSource(source: string) {
  if (source === "latest-desktop") {
    const latest = latestImageFrom(resolve(homedir(), "Desktop"));
    if (!latest) throw new Error("No recent image found on Desktop.");
    return latest;
  }

  if (source === "latest-downloads") {
    const latest = latestImageFrom(resolve(homedir(), "Downloads"));
    if (!latest) throw new Error("No recent image found in Downloads.");
    return latest;
  }

  return resolve(source);
}

function targetFileName(asset: AssetType, sourcePath: string) {
  if (asset !== "logo-spin") return STATIC_ASSET_TARGETS[asset];

  const sourceExt = extname(sourcePath).toLowerCase();
  if (sourceExt === ".gif") return "logo-spin.gif";
  if (sourceExt === ".png") return "logo-spin.png";
  return "logo-spin.webp";
}

function assertExtension(asset: AssetType, sourcePath: string, targetName: string) {
  const sourceExt = extname(sourcePath).toLowerCase();
  const targetExt = extname(targetName).toLowerCase();

  if (sourceExt !== targetExt) {
    throw new Error(
      `Source extension ${sourceExt} does not match target ${targetName}. Export/convert the asset first, or choose a matching source file.`,
    );
  }
}

try {
  const { channel, asset, source, force, reveal } = parseArgs();
  const sourcePath = resolveSource(source);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source file does not exist: ${sourcePath}`);
  }

  const sourceStat = statSync(sourcePath);
  if (!sourceStat.isFile()) {
    throw new Error(`Source is not a file: ${sourcePath}`);
  }

  const sourceExt = extname(sourcePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(sourceExt)) {
    throw new Error(`Source is not a supported image file: ${sourcePath}`);
  }

  const fileName = targetFileName(asset, sourcePath);
  assertExtension(asset, sourcePath, fileName);

  const targetDir = resolve(process.cwd(), "public/channel-art", channel);
  const targetPath = join(targetDir, fileName);

  mkdirSync(targetDir, { recursive: true });

  if (existsSync(targetPath) && !force) {
    throw new Error(`Refusing to overwrite existing file: ${targetPath}. Re-run with --force to replace it.`);
  }

  copyFileSync(sourcePath, targetPath);

  if (!existsSync(targetPath)) {
    throw new Error(`Copy did not create target file: ${targetPath}`);
  }

  console.log(`Copied ${sourcePath}`);
  console.log(`To     ${targetPath}`);
  console.log(`Asset  ${asset}`);
  console.log(`Channel ${channel}`);

  if (reveal) {
    spawnSync("open", ["-R", targetPath], { stdio: "ignore" });
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
