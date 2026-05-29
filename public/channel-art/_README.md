# Channel Art Assets

Place generated channel art in this directory using one folder per channel slug.

Required naming:

```text
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/badge.png
public/channel-art/{slug}/logo-spin.webp
```

Example:

```text
public/channel-art/kobe-tv/row-bg.png
public/channel-art/kobe-tv/profile-bg.png
public/channel-art/kobe-tv/logo.png
public/channel-art/kobe-tv/badge.png
public/channel-art/kobe-tv/logo-spin.webp
```

Recommended formats:

- `row-bg.png`: wide horizontal guide rectangle background, `4:1` or `5:1`.
- `profile-bg.png`: vertical profile card background, `3:4`.
- `logo.png`: square transparent static fallback logo, `1:1`.
- `badge.png`: square collectible badge or emblem, `1:1`.
- `logo-spin.webp`: preferred future rotating collectible logo item, `1:1`.
- `logo-spin.gif` or `logo-spin.png`: acceptable temporary fallbacks if animated WebP is not available yet.

Generation rules:

- Do not include real team logos.
- Do not include real athlete faces.
- Do not include readable text, letters, numbers, watermarks, or trademarks.
- Treat all images as art layers. React renders channel names, CH numbers, badges, metadata, and CTAs.
- Keep row backgrounds readable in the left and center safe zones.
- Keep profile backgrounds low-detail behind text areas.
- Logo-spin assets should be centered collectible objects that read clearly at small size.

Midjourney workflow:

- Append `--ar 5:1 --style raw` for row-bg. Use `--ar 4:1` only as a fallback if 5:1 feels too stretched.
- Append `--ar 3:4 --style raw` for profile-bg.
- Append `--ar 1:1 --style raw` for logo, badge, and logo-spin.
- Midjourney's first output is a 4-option preview grid. Do not download the grid. Upscale the best single option first, then download and import that image.
- Full workflow: see `CHANNEL_ART_MASTER_PRODUCTION_DOC.md` Section 5.

Runtime strategy:

- Current UI uses `logoUrl` through `ChannelLogo`.
- Future rotating-logo UI should prefer `logoSpinUrl` when present.
- Fallback order should be `logoSpinUrl` -> `logoUrl` -> `emoji`.
- `badge.png` is an asset format for future surfaces or design iterations, not current UI.

Generation — script path (fastest):

```bash
# Set your API key once
export OPENAI_API_KEY=sk-...
# or add OPENAI_API_KEY=sk-... to .env.local

# Dry-run — no API call, shows prompt and target path
npm run art:generate -- --channel kobe-tv --asset row-bg --dry-run

# Generate directly into the correct folder
npm run art:generate -- --channel kobe-tv --asset row-bg
npm run art:generate -- --channel tiger-sundays --asset logo
npm run art:generate -- --channel mike-tyson-tv --asset badge --force
```

The script reads prompts from `data/channelArtPrompts.ts`, calls OpenAI `gpt-image-1`, and writes the asset directly to `public/channel-art/{slug}/`. No manual download or import step needed.

Generation — manual path (copy-paste):

1. Copy a prompt from `CHANNEL_ASSET_PROMPT_BIBLE.md`.
2. Paste into OpenAI image generation or Midjourney.
3. Download the selected result.
4. Import it:

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop
npm run art:import -- --channel kobe-tv --asset profile-bg --source latest-downloads
npm run art:import -- --channel kobe-tv --asset logo-spin --source /full/path/to/logo-spin.webp
```

Wiring:

After generating or importing, add to `data/channels.ts`:

```ts
rowBackgroundUrl: "/channel-art/{slug}/row-bg.png",
profileBackgroundUrl: "/channel-art/{slug}/profile-bg.png",
logoUrl: "/channel-art/{slug}/logo.png",
logoSpinUrl: "/channel-art/{slug}/logo-spin.webp",
```

Then run `npm run build`.
