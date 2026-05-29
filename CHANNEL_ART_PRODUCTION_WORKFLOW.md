# Channel Art Production Workflow

This is the repeatable process for creating, organizing, importing, and iterating channel art for RetroSportTV.ge.

Use these files together:

- [CHANNEL_ASSET_IDEATION_FRAMEWORK.md](/Users/grayson/Desktop/RetroSportTV.ge/CHANNEL_ASSET_IDEATION_FRAMEWORK.md)
- [CHANNEL_ASSET_PROMPT_BIBLE.md](/Users/grayson/Desktop/RetroSportTV.ge/CHANNEL_ASSET_PROMPT_BIBLE.md)
- [data/channelArtPrompts.ts](/Users/grayson/Desktop/RetroSportTV.ge/data/channelArtPrompts.ts)
- [public/channel-art/_README.md](/Users/grayson/Desktop/RetroSportTV.ge/public/channel-art/_README.md)

## Asset Set

Each channel can have these asset types:

```text
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/badge.png
public/channel-art/{slug}/logo-spin.webp
```

- `row-bg.png`: wide guide-row background, `5:1` preferred, `4:1` acceptable.
- `profile-bg.png`: vertical profile-card background, `3:4`.
- `logo.png`: static icon or emblem, `1:1`.
- `badge.png`: collectible badge/emblem, `1:1`.
- `logo-spin.webp`: future rotating collectible object, `1:1`.

Temporary `logo-spin` fallbacks:

- `logo-spin.png`: static frame if animation is not ready.
- `logo-spin.gif`: acceptable animated fallback if WebP is not available.

## Creative Loop

### Script path — fastest, no manual download

1. Decode the channel with `CHANNEL_ASSET_IDEATION_FRAMEWORK.md`.
2. Pick one of the three concept routes.
3. Set `OPENAI_API_KEY` in your shell or in `.env.local`.
4. Run the generate script:
   ```bash
   npm run art:generate -- --channel {slug} --asset {type}
   ```
5. The script writes the asset directly to `public/channel-art/{slug}/`.
6. Wire the printed field into `data/channels.ts`.
7. Run `npm run build`.
8. If the result is bad, re-run with `--force`.

### Manual path — full control over output

1. Decode the channel with `CHANNEL_ASSET_IDEATION_FRAMEWORK.md`.
2. Pick one of the three concept routes.
3. Use the prompt bible or `data/channelArtPrompts.ts` to get the production prompt set.
4. Paste the prompt into OpenAI image generation. Midjourney is optional for concept exploration only.
5. Export or crop to the recommended aspect ratio.
6. Save the result to Desktop or Downloads.
7. Import it with the helper script.
8. Wire the file path into `data/channels.ts` if the channel should use it now.
9. Run `npm run build`.

## OpenAI Generate Script

### Setup

```bash
# Option A — export in shell
export OPENAI_API_KEY=sk-...

# Option B — .env.local (auto-loaded by the script, not committed)
echo 'OPENAI_API_KEY=sk-...' >> .env.local
```

### Commands

```bash
# Dry-run — shows prompt and target path, no API call
npm run art:generate -- --channel tiger-sundays --asset row-bg --dry-run

# Generate
npm run art:generate -- --channel tiger-sundays --asset row-bg
npm run art:generate -- --channel kobe-tv --asset logo
npm run art:generate -- --channel mike-tyson-tv --asset badge --force
```

### Supported asset types

`row-bg` | `profile-bg` | `logo` | `badge` | `logo-spin`

### What the script does

1. Loads the matching prompt from `data/channelArtPrompts.ts` — prompts are not hardcoded in the script.
2. Calls `gpt-image-1` via the OpenAI Node SDK.
3. Decodes the base64 response and writes the PNG (or WebP for `logo-spin`) to `public/channel-art/{slug}/`.
4. Creates the target folder if it does not exist.
5. Refuses to overwrite an existing file unless `--force` is passed.
6. Prints the exact field to wire into `data/channels.ts`.

## Midjourney Flow

### Aspect Ratio Reference

Always append the aspect ratio and style flags at the very end of every Midjourney prompt.

| Asset | Midjourney suffix |
|---|---|
| `row-bg` | `--ar 5:1 --style raw` |
| `profile-bg` | `--ar 3:4 --style raw` |
| `logo` | `--ar 1:1 --style raw` |
| `badge` | `--ar 1:1 --style raw` |
| `logo-spin` | `--ar 1:1 --style raw` |

For row-bg: `--ar 5:1` is the preferred ratio. Use `--ar 4:1` only if the composition feels too stretched at 5:1.

### The 4-Option Grid Warning

Midjourney's first output is a 2×2 preview grid of four variations in a single image. Do not download or import the grid. It is a low-resolution preview only. Always upscale a single option before downloading.

### Midjourney Steps

1. Copy the prompt from `CHANNEL_ART_MASTER_PRODUCTION_DOC.md` Section 7 or `CHANNEL_ASSET_PROMPT_BIBLE.md`.
2. Paste into Discord as `/imagine prompt: {full prompt} --ar 5:1 --style raw` (or the correct suffix for the asset type).
3. Midjourney generates a 4-option preview grid.
4. Pick the best option.
5. Upscale that specific option by clicking U1, U2, U3, or U4.
6. Wait for the upscale to complete.
7. Download the upscaled single image — not the preview grid.
8. Save to Desktop or Downloads.
9. Import with the helper script.

### Common Mistakes

- Result looks square: confirm `--ar 5:1` is at the end of the prompt and the syntax is correct.
- Image looks low-res or shows four options side-by-side: you downloaded the preview grid instead of upscaling a single option first.
- Wrong ratio: confirm the asset type matches the correct suffix in the table above.

## Quick Import Commands

List recent images:

```bash
npm run art:list-recent
npm run art:list-recent -- --desktop --limit 10
npm run art:list-recent -- --downloads --limit 10
```

Import the newest Desktop image:

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop
```

Import the newest Downloads image:

```bash
npm run art:import -- --channel kobe-tv --asset profile-bg --source latest-downloads
```

Import a specific file:

```bash
npm run art:import -- --channel kobe-tv --asset logo-spin --source /full/path/to/logo-spin.webp
```

Replace an existing asset intentionally:

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop --force
```

Rules:

- The script creates `public/channel-art/{slug}/` if needed.
- The script copies, never moves.
- The script refuses to overwrite unless `--force` is present.
- `row-bg`, `profile-bg`, `logo`, and `badge` target PNG files.
- `logo-spin` accepts `.webp`, `.gif`, or `.png` and names the output accordingly.

## Wiring Assets Into Channels

After importing files, wire them into `data/channels.ts` through the reviewed channel data workflow:

```ts
rowBackgroundUrl: "/channel-art/kobe-tv/row-bg.png",
profileBackgroundUrl: "/channel-art/kobe-tv/profile-bg.png",
logoUrl: "/channel-art/kobe-tv/logo.png",
logoSpinUrl: "/channel-art/kobe-tv/logo-spin.webp",
```

Current UI behavior:

- `ChannelRow` uses `rowBackgroundUrl` through `lib/channelArt.ts`.
- `ChannelProfileCard` uses `profileBackgroundUrl` through `lib/channelArt.ts`.
- `ChannelLogo` uses `logoUrl`.
- `logoSpinUrl` is typed and resolved for future rotating-logo UI, but it is not currently rendered.
- `badge.png` is a production asset for future surfaces or design iterations, not current UI.

## Rotating Collectible Strategy

The `logo-spin` asset should feel like a collectible video-game object, not a normal logo.

Creative rules:

- centered object
- transparent or easily removable background
- no readable text
- no real logos
- no real athlete faces
- reads clearly at 40-64px
- looks good as a static frame even before animation is wired into UI

Examples:

- Kobe TV: rotating purple/gold #24 jersey collectible.
- Jordan TV: rotating red/black #23 jersey or trophy-like basketball object.
- Florida Gators TV: rotating helmet or football collectible without real marks.
- Mike Tyson TV: rotating glove or championship-belt-inspired object.
- Tiger Sundays: rotating golf ball or Sunday red collectible.
- Inside the NBA Classics: rotating microphone/monitor studio collectible.

Future UI should prefer:

1. `logoSpinUrl`
2. `logoUrl`
3. `emoji`

## Quick Iteration Loop

1. Generate art.
2. Save or download it to Desktop or Downloads.
3. Import it:

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop --force
```

4. Run or keep the dev server running.
5. Refresh the browser.
6. If the result is bad, regenerate and re-import with `--force`.
7. Run `npm run build` before committing.

## Architecture Check

Current system readiness:

- custom row backgrounds: ready
- custom profile-card backgrounds: ready
- static logos through `logoUrl`: ready
- collectible badges through `badge.png`: ready as a production asset format
- rotating logo assets through `logoSpinUrl`: typed and resolved, not rendered yet
- full-screen player behavior: separate and unchanged
- routes/database/auth/admin: unchanged

The visual source of truth remains `lib/channelArt.ts`, with rendering split across `ChannelRow`, `ChannelPreview`, `ChannelProfileCard`, and `ChannelLogo`.
