# Channel Art Master Production Doc

Open this file when producing channel art. Everything you need is here.

---

## 1. Full Process Overview

### Script path (fastest — no manual download needed)

```
npm run art:generate → asset saved automatically → Wire into channel → Build
```

1. Run the generate script for the target channel and asset type (see Section 3).
2. The script reads the prompt from `data/channelArtPrompts.ts`, calls OpenAI, and writes the file directly to `public/channel-art/{slug}/`.
3. Wire the file path into `data/channels.ts` using the field names in Section 6.
4. Run `npm run build`. Refresh the browser to confirm.
5. If the result is bad, re-run the script with `--force`.

### Manual path (copy-paste into OpenAI or Midjourney)

```
Copy prompt → Generate image → Download → Import → Wire into channel → Build
```

1. Copy the prompt from Section 7.
2. Paste into OpenAI image generation. Use Midjourney only for concept exploration.
3. Download the output to Desktop or Downloads.
4. Run the import command from Section 4.
5. Wire into `data/channels.ts` using the field names in Section 6.
6. Run `npm run build`. Refresh the browser to confirm.
7. If the result is bad, regenerate and re-import with `--force`.

---

## 2. Asset Types

### `row-bg`

Wide guide-row background rendered behind the channel name, CH number, and metadata.

| Property | Value |
|---|---|
| Used for | Channel guide row background |
| Aspect ratio | `5:1` preferred, `4:1` acceptable |
| Pixel target | `2400 x 420` |
| File path | `public/channel-art/{slug}/row-bg.png` |
| Required | Optional (fallback: generated gradient + texture) |
| Safe zone | Keep left and center low-detail — React renders text there. Push strong imagery to the right. |

### `profile-bg`

Vertical background for the channel profile card under the preview monitor.

| Property | Value |
|---|---|
| Used for | Channel profile card background |
| Aspect ratio | `3:4` |
| Pixel target | `1200 x 1600` or `900 x 1200` |
| File path | `public/channel-art/{slug}/profile-bg.png` |
| Required | Optional (fallback: generated gradient + accent color) |
| Safe zone | Keep upper-left and center calm — React renders title, metadata, badges, and CTA there. |

### `logo`

Static square icon or emblem displayed in the logo slot of the channel row and profile card.

| Property | Value |
|---|---|
| Used for | Channel logo slot (replaces emoji fallback) |
| Aspect ratio | `1:1` |
| Pixel target | `512 x 512` transparent PNG or SVG |
| File path | `public/channel-art/{slug}/logo.png` |
| Required | Optional (fallback: `channel.emoji`) |
| Safe zone | Centered, readable at `40–64px`. |

### `badge`

Collectible-style badge or emblem. Future asset surface — not currently rendered in the UI.

| Property | Value |
|---|---|
| Used for | Future collectible badge surface |
| Aspect ratio | `1:1` |
| Pixel target | `512 x 512` |
| File path | `public/channel-art/{slug}/badge.png` |
| Required | No — future surface only |
| Safe zone | Centered sticker shape. No text in the image. |

> **Note:** `badgeUrl` is not a supported field in `data/channels.ts` yet. Produce the asset now and wire it in later when the badge surface is built.

### `logo-spin`

Future rotating collectible object. Not currently rendered — produce now for future use.

| Property | Value |
|---|---|
| Used for | Future rotating collectible logo UI |
| Aspect ratio | `1:1` |
| Pixel target | `512 x 512` or `1024 x 1024`, transparent WebP preferred |
| File path | `public/channel-art/{slug}/logo-spin.webp` |
| Required | No — future surface only |
| Safe zone | Centered object. Must read clearly as a static frame before animation exists. |

Fallback priority when `logo-spin` UI is built: `logoSpinUrl` → `logoUrl` → `emoji`.

---

## 3. Generate Script (OpenAI — Fastest Path)

### Setup

Add your OpenAI API key once. Either:

```bash
# Option A — shell environment (recommended for daily use)
export OPENAI_API_KEY=sk-...

# Option B — .env.local in repo root (auto-loaded by the script)
echo 'OPENAI_API_KEY=sk-...' >> .env.local
```

Do not commit `.env.local`. It is already in `.gitignore`.

### Dry-run (no API call — shows prompt and target path)

```bash
npm run art:generate -- --channel tiger-sundays --asset row-bg --dry-run
npm run art:generate -- --channel kobe-tv --asset logo --dry-run
npm run art:generate -- --channel mike-tyson-tv --asset badge --dry-run
```

### Generate one asset

```bash
npm run art:generate -- --channel tiger-sundays --asset row-bg
npm run art:generate -- --channel kobe-tv --asset logo
npm run art:generate -- --channel mike-tyson-tv --asset badge
npm run art:generate -- --channel nba-2000s --asset profile-bg
npm run art:generate -- --channel jordan-tv --asset logo-spin
```

The script:

1. Loads the matching prompt from `data/channelArtPrompts.ts`.
2. Calls the OpenAI `gpt-image-1` model.
3. Decodes the base64 response and writes the file to `public/channel-art/{slug}/`.
4. Creates the target folder if it does not exist.
5. Prints the exact `data/channels.ts` field to wire.

### Regenerate (overwrite existing file)

```bash
npm run art:generate -- --channel tiger-sundays --asset row-bg --force
```

### Aspect ratio note

OpenAI `gpt-image-1` does not support arbitrary aspect ratios. The script uses the nearest supported size per asset type:

| Asset | Target ratio | Generated size | Notes |
|---|---|---|---|
| `row-bg` | 5:1 | 1536×1024 (~3:2) | Wider crop or padding may be needed |
| `profile-bg` | 3:4 | 1024×1536 (~2:3) | Slightly taller than target |
| `logo` | 1:1 | 1024×1024 | Exact match |
| `badge` | 1:1 | 1024×1024 | Exact match |
| `logo-spin` | 1:1 | 1024×1024, WebP | Exact match |

Midjourney remains the option for exact aspect ratios (`--ar 5:1 --style raw`). Use the manual workflow in Section 4 for that path.

---

## 4. File Naming System

One folder per channel slug. All names are fixed.

```
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/badge.png
public/channel-art/{slug}/logo-spin.webp
```

Examples:

```
public/channel-art/kobe-tv/row-bg.png
public/channel-art/tiger-sundays/row-bg.png
public/channel-art/mike-tyson-tv/logo-spin.webp
public/channel-art/florida-gators-tv/profile-bg.png
```

Acceptable `logo-spin` fallbacks during iteration:

- `logo-spin.png` — static frame if animation is not ready
- `logo-spin.gif` — acceptable animated fallback if WebP is not available

The import script names the output file correctly based on the file extension you provide.

---

## 4. Fast Import Commands

### List recent images

```bash
npm run art:list-recent
npm run art:list-recent -- --desktop --limit 10
npm run art:list-recent -- --downloads --limit 10
```

### Import newest Desktop image

```bash
npm run art:import -- --channel {slug} --asset row-bg --source latest-desktop --force
```

### Import newest Downloads image

```bash
npm run art:import -- --channel {slug} --asset row-bg --source latest-downloads --force
```

### Import from explicit file path

```bash
npm run art:import -- --channel {slug} --asset row-bg --source "/full/path/to/file.png" --force
```

### Rules

- The script creates `public/channel-art/{slug}/` if it does not exist.
- The script copies, never moves.
- The script refuses to overwrite unless `--force` is present.
- `row-bg`, `profile-bg`, `logo`, and `badge` target PNG.
- `logo-spin` accepts `.webp`, `.gif`, or `.png` and names the output accordingly.

### Live examples

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop --force
npm run art:import -- --channel tiger-sundays --asset row-bg --source latest-desktop --force
npm run art:import -- --channel mike-tyson-tv --asset row-bg --source latest-desktop --force
npm run art:import -- --channel florida-gators-tv --asset profile-bg --source latest-downloads --force
npm run art:import -- --channel jordan-tv --asset logo-spin --source "/Users/grayson/Downloads/jordan-spin.webp" --force
```

---

## 5. Midjourney Generation Workflow

### Aspect Ratio Rules

Always append the aspect ratio flag at the end of every Midjourney prompt. The ratio is determined by the asset type, not the channel.

| Asset | Midjourney suffix | Notes |
|---|---|---|
| `row-bg` | `--ar 5:1 --style raw` | Preferred. Use `--ar 4:1` only if 5:1 feels too stretched. |
| `profile-bg` | `--ar 3:4 --style raw` | Vertical card background. |
| `logo` | `--ar 1:1 --style raw` | Square icon. |
| `badge` | `--ar 1:1 --style raw` | Square collectible badge. |
| `logo-spin` | `--ar 1:1 --style raw` | Square rotating collectible. |

### Correct Prompt Format

Paste into Discord as `/imagine prompt:`. All flags go at the very end, after all descriptive content.

```
/imagine prompt: Wide horizontal background asset for Tiger Sundays, bold Sunday red and deep green bird's-eye golf hole arcade panel, 90s arcade golf game menu energy, chunky fairway stripe graphics, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, dark safe zones for UI text, no readable text --ar 5:1 --style raw
```

```
/imagine prompt: Wide horizontal background asset for Kobe TV, bold purple and gold NBA Jam-style hardwood legend panel, arena spotlight cones, jersey mesh overlay, championship ring glow, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, dark safe zones for UI text, no readable text --ar 5:1 --style raw
```

### The 4-Option Grid Warning

Midjourney's first output is always a 2×2 preview grid — four low-resolution variations in one image. **Do not download or import the grid.** It is a preview only.

Correct steps:

1. Midjourney returns a 4-option grid.
2. Review all four options.
3. Pick the best one.
4. Click **U1**, **U2**, **U3**, or **U4** to upscale that specific option.
5. Wait for the upscale to finish.
6. Download only the upscaled single image.
7. Import with `npm run art:import`.

### Step-by-Step Row-BG Workflow

1. Copy the `row-bg` prompt from Section 7 for the target channel.
2. Confirm the prompt ends with `--ar 5:1 --style raw`.
3. Paste into Discord: `/imagine prompt: {full prompt text} --ar 5:1 --style raw`
4. Wait for the 4-option grid.
5. Pick the best option.
6. Upscale only that option (U1–U4).
7. Download the upscaled single image to Desktop or Downloads.
8. Run:
   ```bash
   npm run art:import -- --channel {slug} --asset row-bg --source latest-desktop --force
   ```
9. Wire `rowBackgroundUrl` in `data/channels.ts` if not already set.
10. Run `npm run build` and test on localhost.

### Common Mistakes

If the result looks square, low-res, or wrong:

- Did you include `--ar 5:1` at the end of the prompt?
- Did Midjourney ignore the aspect ratio because the `--ar` flag syntax was wrong?
- Did you accidentally use `--ar 1:1` (logo ratio) instead of `--ar 5:1`?
- Did you download the 4-option preview grid instead of upscaling a single option first?
- Are you using a logo or badge prompt instead of a row-bg prompt?

---

## 6. Wiring Instructions

After importing, add the matching field to the channel entry in `data/channels.ts`.

```ts
// data/channels.ts — example wiring for kobe-tv
{
  slug: "kobe-tv",
  rowBackgroundUrl: "/channel-art/kobe-tv/row-bg.png",
  profileBackgroundUrl: "/channel-art/kobe-tv/profile-bg.png",
  logoUrl: "/channel-art/kobe-tv/logo.png",
  logoSpinUrl: "/channel-art/kobe-tv/logo-spin.webp",
  // badgeUrl: not yet supported — produce badge.png now, wire later
}
```

### Field reference

| Asset | Field in `data/channels.ts` | Currently rendered |
|---|---|---|
| `row-bg.png` | `rowBackgroundUrl` | Yes — via `lib/channelArt.ts` → `ChannelRow` |
| `profile-bg.png` | `profileBackgroundUrl` | Yes — via `lib/channelArt.ts` → `ChannelProfileCard` |
| `logo.png` | `logoUrl` | Yes — via `ChannelLogo` |
| `logo-spin.webp` | `logoSpinUrl` | No — typed and resolved, not rendered yet |
| `badge.png` | `badgeUrl` (not yet a field) | No — future surface |

### After wiring

```bash
npm run build
```

Then refresh the browser and confirm the row and profile card look correct for the channel.

---

## 7. Prompt Copy Section

**How to use these prompts:**

1. Copy the full prompt text from the code block.
2. Paste directly into OpenAI image generation.
3. For Midjourney, append the aspect ratio and `--style raw` flag shown under each prompt. Follow the full generation workflow in Section 5.

**Prompt formula used:** `{asset opener} for {channel name}, {layer note}, {visual direction}, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, {safe-zone note}, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots`

**Core style:** Every prompt uses the same arcade sports world — NBA Jam / NFL Blitz energy, bold saturated colors, chunky graphics, CRT cabinet glow. Channels differ by color palette, object, and era — not by art style.

---

### Kobe TV — row-bg

```text
wide horizontal channel guide rectangle background for Kobe TV, background art layer only, bold purple and gold NBA Jam-style hardwood legend panel, arena spotlight cones, jersey mesh overlay, championship ring glow, arcade sports menu composition, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Kobe TV — profile-bg

```text
vertical channel profile card background for Kobe TV, background art layer only, bold purple and gold arcade player-select card, spotlight cone from above, hardwood floor reflection, trophy glow, NBA Jam character-select energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Kobe TV — logo

```text
square static channel logo icon for Kobe TV, collectible art only, chunky basketball jersey silhouette, bold purple and gold, arcade sports emblem, character icon energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Kobe TV — badge

```text
square collectible badge emblem for Kobe TV, collectible art only, bold championship seal badge, purple and gold metallic relief, ring-seal shape, arcade unlock collectible feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Kobe TV — logo-spin

```text
rotating 3D collectible item for Kobe TV, collectible art only, rotating basketball jersey collectible, bold purple body gold trim, fabric folds, chrome hanger loop, arcade game-pickup item, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA 2000s — row-bg

```text
wide horizontal channel guide rectangle background for NBA 2000s, background art layer only, bold red-white-blue chrome basketball arcade panel, 90s broadcast bar graphics, baggy-shorts era arcade energy, chunky NBA era motion graphics, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### NBA 2000s — profile-bg

```text
vertical channel profile card background for NBA 2000s, background art layer only, bold red-blue 90s arcade basketball card, chrome edge graphics, early-2000s arcade highlight show energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### NBA 2000s — logo

```text
square static channel logo icon for NBA 2000s, collectible art only, chunky chrome basketball badge, bold red and blue arcade energy arcs, throwback 90s sports icon, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA 2000s — badge

```text
square collectible badge emblem for NBA 2000s, collectible art only, bold chrome highlight badge, arcade seal shape, 90s TV gloss, chunky 2000s sports emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA 2000s — logo-spin

```text
rotating 3D collectible item for NBA 2000s, collectible art only, rotating throwback basketball collectible, bold chrome shine, red and blue arcade streaks, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NFL Big Hits — row-bg

```text
wide horizontal channel guide rectangle background for NFL Big Hits, background art layer only, bold dark turf NFL Blitz-style arcade impact panel, white chalk marks, steel collision burst graphics, chunky stadium light beams, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### NFL Big Hits — profile-bg

```text
vertical channel profile card background for NFL Big Hits, background art layer only, bold dark football arcade card, scuffed turf texture, steel shockwave graphics, NFL Blitz-style stadium energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### NFL Big Hits — logo

```text
square static channel logo icon for NFL Big Hits, collectible art only, chunky football shield icon, bold steel and dark green, defensive collision energy, arcade impact emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NFL Big Hits — badge

```text
square collectible badge emblem for NFL Big Hits, collectible art only, bold collision badge, hard-hit shield shape, gritty turf texture, steel-medal chunky arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NFL Big Hits — logo-spin

```text
rotating 3D collectible item for NFL Big Hits, collectible art only, rotating scuffed football collectible, bold impact scars, arena-light glint, arcade game-item feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Florida Gators TV — row-bg

```text
wide horizontal channel guide rectangle background for Florida Gators TV, background art layer only, bold orange and royal blue arcade college football panel, swamp heat glow, humid SEC night energy, chunky campus broadcast graphics, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Florida Gators TV — profile-bg

```text
vertical channel profile card background for Florida Gators TV, background art layer only, bold orange-blue arcade college football card, swamp mist glow, campus arcade broadcast energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Florida Gators TV — logo

```text
square static channel logo icon for Florida Gators TV, collectible art only, chunky Gators helmet silhouette, bold orange and blue, arcade college football icon, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Florida Gators TV — badge

```text
square collectible badge emblem for Florida Gators TV, collectible art only, bold swamp football badge, helmet-shaped arcade emblem, orange-blue chunky sticker, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Florida Gators TV — logo-spin

```text
rotating 3D collectible item for Florida Gators TV, collectible art only, rotating football collectible, bold orange-blue armor, swamp-energy arcade accents, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Tiger Sundays — row-bg

```text
wide horizontal channel guide rectangle background for Tiger Sundays, background art layer only, bold Sunday red and deep green bird's-eye golf hole arcade panel, 90s arcade golf game menu energy, chunky fairway stripe graphics, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Tiger Sundays — profile-bg

```text
vertical channel profile card background for Tiger Sundays, background art layer only, bold red and green golf arcade card, fairway texture, red glow accent, 90s arcade golf energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Tiger Sundays — logo

```text
square static channel logo icon for Tiger Sundays, collectible art only, chunky tiger-striped golf ball icon, bold red and green, golden tee, arcade sports collectible, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Tiger Sundays — badge

```text
square collectible badge emblem for Tiger Sundays, collectible art only, bold golf championship badge, green-jacket-style seal, golf flag silhouette, chunky arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Tiger Sundays — logo-spin

```text
rotating 3D collectible item for Tiger Sundays, collectible art only, rotating tiger-striped golf ball collectible, bold golden tee, red accent, arcade game-pickup feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Jordan TV — row-bg

```text
wide horizontal channel guide rectangle background for Jordan TV, background art layer only, bold red-black-white NBA Jam-style basketball legend panel, championship spotlight, Bulls-era hardwood floor, flight-path motion graphics, arcade character energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Jordan TV — profile-bg

```text
vertical channel profile card background for Jordan TV, background art layer only, bold red-black arcade player-select card, deep red glow, hardwood reflection, NBA Jam legend energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Jordan TV — logo

```text
square static channel logo icon for Jordan TV, collectible art only, chunky basketball jersey silhouette, bold red and black, arcade character icon, championship emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Jordan TV — badge

```text
square collectible badge emblem for Jordan TV, collectible art only, bold championship badge, red and black arcade seal, crown-like shape, collectible sports unlock, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Jordan TV — logo-spin

```text
rotating 3D collectible item for Jordan TV, collectible art only, rotating basketball jersey collectible, bold red and black, airborne arcade energy, game-item feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Bulls MJ Era — row-bg

```text
wide horizontal channel guide rectangle background for Bulls MJ Era, background art layer only, bold red-black-white dynasty arcade panel, 90s championship banner silhouettes, old arena rafters, NBA Jam-style dynasty energy, chunky banner graphics, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Bulls MJ Era — profile-bg

```text
vertical channel profile card background for Bulls MJ Era, background art layer only, bold red-black arcade dynasty card, hanging banner silhouettes, spotlight haze, old arena championship arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Bulls MJ Era — logo

```text
square static channel logo icon for Bulls MJ Era, collectible art only, chunky Bulls dynasty crest icon, bold red and black, six-ring arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Bulls MJ Era — badge

```text
square collectible badge emblem for Bulls MJ Era, collectible art only, bold dynasty badge, banner geometry, old arena arcade polish, championship seal chunky emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Bulls MJ Era — logo-spin

```text
rotating 3D collectible item for Bulls MJ Era, collectible art only, rotating championship ring collectible, bold Bulls red, black trim, trophy arcade energy, game-item feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Mike Tyson TV — row-bg

```text
wide horizontal channel guide rectangle background for Mike Tyson TV, background art layer only, bold black-gold-red Punch-Out-style arcade fight panel, ring ropes, smoky canvas texture, heavyweight arcade energy, boxing cabinet feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Mike Tyson TV — profile-bg

```text
vertical channel profile card background for Mike Tyson TV, background art layer only, bold black-gold arcade boxing card, red corner glow, canvas texture, title-fight arcade intensity, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Mike Tyson TV — logo

```text
square static channel logo icon for Mike Tyson TV, collectible art only, chunky boxing glove silhouette, bold black and gold, arcade combat icon, heavyweight emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Mike Tyson TV — badge

```text
square collectible badge emblem for Mike Tyson TV, collectible art only, bold championship belt badge, belt-plate shape, black-gold arcade relief, fight-night collectible emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Mike Tyson TV — logo-spin

```text
rotating 3D collectible item for Mike Tyson TV, collectible art only, rotating boxing glove collectible, bold belt-metal accents, smoky highlights, knockout arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Inside the NBA Classics — row-bg

```text
wide horizontal channel guide rectangle background for Inside the NBA Classics, background art layer only, bold blue-orange arcade studio desk panel, CRT monitor wall glow, stat sheet graphics, late-night desk arcade energy, 90s cable sports TV menu feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Inside the NBA Classics — profile-bg

```text
vertical channel profile card background for Inside the NBA Classics, background art layer only, bold blue-orange arcade studio card, CRT monitor wall glow, desk reflections, late-night TV arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Inside the NBA Classics — logo

```text
square static channel logo icon for Inside the NBA Classics, collectible art only, chunky studio monitor badge icon, bold blue and orange, desk-show arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Inside the NBA Classics — badge

```text
square collectible badge emblem for Inside the NBA Classics, collectible art only, bold studio replay badge, monitor-wall shape, blue and orange chunky arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Inside the NBA Classics — logo-spin

```text
rotating 3D collectible item for Inside the NBA Classics, collectible art only, rotating microphone-and-monitor collectible, bold studio chrome, blue-orange arcade desk energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### SportsCenter Classics — row-bg

```text
wide horizontal channel guide rectangle background for SportsCenter Classics, background art layer only, bold red-blue arcade newsroom panel, CRT monitor wall, highlight wall graphics, 90s ESPN countdown arcade energy, classic broadcast menu feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### SportsCenter Classics — profile-bg

```text
vertical channel profile card background for SportsCenter Classics, background art layer only, bold red-blue arcade newsroom card, CRT monitor glow, archive-highlight arcade broadcast energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### SportsCenter Classics — logo

```text
square static channel logo icon for SportsCenter Classics, collectible art only, chunky red-blue highlight badge icon, bold newsroom arcade emblem, classic sports broadcast icon, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### SportsCenter Classics — badge

```text
square collectible badge emblem for SportsCenter Classics, collectible art only, bold top-ten replay badge, CRT glow seal, red and blue chunky arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### SportsCenter Classics — logo-spin

```text
rotating 3D collectible item for SportsCenter Classics, collectible art only, rotating highlight-reel collectible, bold newsroom chrome, red-blue arcade streaks, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Super Bowl Channel — row-bg

```text
wide horizontal channel guide rectangle background for Super Bowl Channel, background art layer only, bold gold championship arcade panel, stadium light beams, confetti burst, aerial field geometry, big-game arcade broadcast energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Super Bowl Channel — profile-bg

```text
vertical channel profile card background for Super Bowl Channel, background art layer only, bold gold arcade championship card, field-diagram geometry, trophy glow, big-game arcade broadcast energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Super Bowl Channel — logo

```text
square static channel logo icon for Super Bowl Channel, collectible art only, chunky trophy-gold stage emblem, bold championship arcade icon, big-game energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Super Bowl Channel — badge

```text
square collectible badge emblem for Super Bowl Channel, collectible art only, bold championship badge, confetti-edge seal, gold arcade relief, trophy chunky emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Super Bowl Channel — logo-spin

```text
rotating 3D collectible item for Super Bowl Channel, collectible art only, rotating football collectible, bold gold trophy treatment, stadium-light gleam, arcade game-item energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA Finals Channel — row-bg

```text
wide horizontal channel guide rectangle background for NBA Finals Channel, background art layer only, bold gold championship trophy-room arcade panel, banner silhouettes, game-seven court line graphics, bold gold broadcast energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### NBA Finals Channel — profile-bg

```text
vertical channel profile card background for NBA Finals Channel, background art layer only, bold gold arcade Finals card, trophy-room glow, legacy-board arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### NBA Finals Channel — logo

```text
square static channel logo icon for NBA Finals Channel, collectible art only, chunky championship seal icon, bold gold arcade relief, Finals-history prestige emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA Finals Channel — badge

```text
square collectible badge emblem for NBA Finals Channel, collectible art only, bold championship badge, trophy-room geometry, gold arcade shine, legacy seal chunky emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### NBA Finals Channel — logo-spin

```text
rotating 3D collectible item for NBA Finals Channel, collectible art only, rotating championship trophy collectible, bold gold trim, court-line arcade detailing, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### March Madness TV — row-bg

```text
wide horizontal channel guide rectangle background for March Madness TV, background art layer only, bold bracket-chaos arcade panel, hardwood motion graphics, tournament board line art, buzzer-beater arcade energy, 90s NCAA game menu feel, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### March Madness TV — profile-bg

```text
vertical channel profile card background for March Madness TV, background art layer only, bold bracket arcade card, bracket fragment graphics, arena tension, postseason arcade pressure, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### March Madness TV — logo

```text
square static channel logo icon for March Madness TV, collectible art only, chunky tournament-bracket emblem icon, bold collegiate arcade colors, hardwood energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### March Madness TV — badge

```text
square collectible badge emblem for March Madness TV, collectible art only, bold bracket seal badge, Cinderella drama, chunky arcade tournament emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### March Madness TV — logo-spin

```text
rotating 3D collectible item for March Madness TV, collectible art only, rotating college basketball collectible, bold bracket geometry, buzzer-light arcade streaks, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Patriots Dynasty — row-bg

```text
wide horizontal channel guide rectangle background for Patriots Dynasty, background art layer only, bold cold blue-gray Foxboro arcade panel, playbook grid line art, comeback drive graphics, dynasty arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Patriots Dynasty — profile-bg

```text
vertical channel profile card background for Patriots Dynasty, background art layer only, bold blue-gray arcade dynasty card, stadium-cold atmosphere, ring-room glow, methodical arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Patriots Dynasty — logo

```text
square static channel logo icon for Patriots Dynasty, collectible art only, chunky New England dynasty crest icon, bold cold blue, disciplined football arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Patriots Dynasty — badge

```text
square collectible badge emblem for Patriots Dynasty, collectible art only, bold dynasty badge, ring-room geometry, blue and silver arcade shine, playbook grid emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Patriots Dynasty — logo-spin

```text
rotating 3D collectible item for Patriots Dynasty, collectible art only, rotating football collectible, bold cold-weather steel, ring-metal accents, comeback arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Random Sports Compilations — row-bg

```text
wide horizontal channel guide rectangle background for Random Sports Compilations, background art layer only, bold mixed-sport arcade collage panel, CRT scanlines, remote-shuffle tape label graphics, wildcard multi-sport arcade energy, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1 --style raw`

---

### Random Sports Compilations — profile-bg

```text
vertical channel profile card background for Random Sports Compilations, background art layer only, bold mixed-sport arcade card, archive tape texture, collage fragment graphics, TV-static arcade glow, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4 --style raw`

---

### Random Sports Compilations — logo

```text
square static channel logo icon for Random Sports Compilations, collectible art only, chunky remote-shuffle highlight badge icon, bold mixed-sport arcade collage, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Random Sports Compilations — badge

```text
square collectible badge emblem for Random Sports Compilations, collectible art only, bold wildcard badge, archive-tape edges, highlight-pile energy, chunky sports-bar arcade emblem, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

### Random Sports Compilations — logo-spin

```text
rotating 3D collectible item for Random Sports Compilations, collectible art only, rotating mixed-sport collectible, bold collage fragments, tape-label arcade charm, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1 --style raw`

---

## 8. Quality Checklist

Before committing any asset:

- [ ] Does it feel like the channel identity?
- [ ] Does it read at small size (logo and badge especially)?
- [ ] Is the text-safe zone clear on row-bg?
- [ ] Does the row-bg differ from the profile-bg without feeling unrelated?
- [ ] Does the palette match the channel accent colors in `data/channels.ts`?
- [ ] No readable text, real logos, real faces, or watermarks baked into the image?
- [ ] Did you run `npm run build` after wiring?

## 9. What These Prompts Do Not Include

- Real team logos or trademarks — excluded by negatives
- Real athlete faces — excluded by negatives
- Readable text — excluded by negatives
- UI mockups or screenshots — excluded by negatives

React renders all channel names, CH numbers, badges, metadata lines, and CTAs. The image is only an art layer.
