# Channel Art Master Production Doc

Open this file when producing channel art. Everything you need is here.

---

## 1. Full Process Overview

```
Prompt → Generate image → Download → Import → Wire into channel → Build
```

1. Copy the prompt for the target channel and asset type from Section 6.
2. Paste it into OpenAI image generation (primary path). Use Midjourney for extra concept exploration only.
3. Download the output to Desktop or Downloads.
4. Run the import command from Section 4.
5. Wire the file path into `data/channels.ts` using the field names in Section 5.
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

## 3. File Naming System

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

## 5. Wiring Instructions

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

## 6. Prompt Copy Section

**How to use these prompts:**

1. Copy the full prompt text from the code block.
2. Paste directly into OpenAI image generation.
3. For Midjourney, append the aspect ratio suffix shown under each prompt.

**Prompt formula used:** `{asset opener} for {channel name}, {layer note}, {visual direction}, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, {safe-zone note}, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots`

---

### Kobe TV — row-bg

```text
wide horizontal channel guide rectangle background for Kobe TV, background art layer only, purple-gold hardwood legend banner with arena tunnel lights, jersey mesh, and championship aura, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Kobe TV — profile-bg

```text
vertical channel profile card background for Kobe TV, background art layer only, vertical purple-gold legend card with spotlight haze, hardwood sheen, and trophy glow, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Kobe TV — logo

```text
square static channel logo icon for Kobe TV, collectible art only, static collectible icon based on a #24 jersey silhouette, metallic purple and gold, premium basketball emblem, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Kobe TV — badge

```text
square collectible badge emblem for Kobe TV, collectible art only, collectible championship badge with black-mamba energy, ring-seal shape, and sports-card unlock feel, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Kobe TV — logo-spin

```text
rotating 3D collectible item for Kobe TV, collectible art only, rotating #24 jersey collectible with premium game-item energy, folded fabric, and chrome hanger loop, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA 2000s — row-bg

```text
wide horizontal channel guide rectangle background for NBA 2000s, background art layer only, chrome basketball graphics with red-white-blue broadcast bars, baggy-shorts era motion, and old highlight-show texture, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### NBA 2000s — profile-bg

```text
vertical channel profile card background for NBA 2000s, background art layer only, retro basketball profile panel with chrome edges, CRT glow, and early-2000s arena nostalgia, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### NBA 2000s — logo

```text
square static channel logo icon for NBA 2000s, collectible art only, static icon built from a chrome basketball badge, red and blue energy arcs, and a throwback broadcast feel, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA 2000s — badge

```text
square collectible badge emblem for NBA 2000s, collectible art only, collectible badge shaped like a chrome highlight emblem, old-school TV gloss, and early-2000s attitude, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA 2000s — logo-spin

```text
rotating 3D collectible item for NBA 2000s, collectible art only, rotating throwback basketball collectible with chrome shine, red and blue streaks, and era-authentic swagger, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NFL Big Hits — row-bg

```text
wide horizontal channel guide rectangle background for NFL Big Hits, background art layer only, dark turf broadcast banner with chalk marks, steel collision bursts, and violent highlight energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### NFL Big Hits — profile-bg

```text
vertical channel profile card background for NFL Big Hits, background art layer only, football profile panel with scuffed turf, impact shockwaves, and hard-edged stadium lighting, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### NFL Big Hits — logo

```text
square static channel logo icon for NFL Big Hits, collectible art only, static icon built from a collision-ready football shield, rugged steel edges, and defensive energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NFL Big Hits — badge

```text
square collectible badge emblem for NFL Big Hits, collectible art only, collectible badge with hard-hit energy, gritty turf texture, and a steel-medal shape, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NFL Big Hits — logo-spin

```text
rotating 3D collectible item for NFL Big Hits, collectible art only, rotating scuffed football collectible with impact scars, arena-light glint, and collision swagger, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Florida Gators TV — row-bg

```text
wide horizontal channel guide rectangle background for Florida Gators TV, background art layer only, orange and royal blue swamp banner with wet grass, stadium lights, and humid SEC night-game energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Florida Gators TV — profile-bg

```text
vertical channel profile card background for Florida Gators TV, background art layer only, college football profile panel with swamp mist, orange-blue glow, and campus broadcast polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Florida Gators TV — logo

```text
square static channel logo icon for Florida Gators TV, collectible art only, static icon inspired by a Gators helmet silhouette and swamp-football energy, bold and readable, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Florida Gators TV — badge

```text
square collectible badge emblem for Florida Gators TV, collectible art only, collectible badge with swamp heat, college-football swagger, and a helmet-shaped emblem feel, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Florida Gators TV — logo-spin

```text
rotating 3D collectible item for Florida Gators TV, collectible art only, rotating football collectible with orange-blue armor, swamp-energy accents, and college-title-game presence, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Tiger Sundays — row-bg

```text
wide horizontal channel guide rectangle background for Tiger Sundays, background art layer only, bird's-eye view of a pristine golf hole with Sunday red accents, green fairway stripes, and calm championship sunlight, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Tiger Sundays — profile-bg

```text
vertical channel profile card background for Tiger Sundays, background art layer only, premium golf profile panel with fairway texture, soft red glow, and major-championship atmosphere, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Tiger Sundays — logo

```text
square static channel logo icon for Tiger Sundays, collectible art only, static icon built from a tiger-striped golf ball, golden tee, and red-polo golf energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Tiger Sundays — badge

```text
square collectible badge emblem for Tiger Sundays, collectible art only, collectible badge inspired by a green-jacket emblem, golf flag silhouette, and tiger-energy detail, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Tiger Sundays — logo-spin

```text
rotating 3D collectible item for Tiger Sundays, collectible art only, rotating tiger-striped golf ball collectible with a golden tee, red accent ribbon, and calm premium finish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Jordan TV — row-bg

```text
wide horizontal channel guide rectangle background for Jordan TV, background art layer only, red-black-white basketball legend banner with championship spotlight, hardwood sheen, and flight-path motion, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Jordan TV — profile-bg

```text
vertical channel profile card background for Jordan TV, background art layer only, mythic basketball profile panel with deep red glow, hardwood reflection, and trophy-room drama, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Jordan TV — logo

```text
square static channel logo icon for Jordan TV, collectible art only, static icon inspired by a red-and-black #23 jersey relic, premium basketball emblem, and championship aura, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Jordan TV — badge

```text
square collectible badge emblem for Jordan TV, collectible art only, collectible badge with mythic Finals energy, crown-like shape, and classic dynasty polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Jordan TV — logo-spin

```text
rotating 3D collectible item for Jordan TV, collectible art only, rotating red-and-black #23 jersey collectible with airborne motion, premium fabric, and game-winning swagger, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Bulls MJ Era — row-bg

```text
wide horizontal channel guide rectangle background for Bulls MJ Era, background art layer only, 1990s championship banner room with red-black-white hardwood, old-arena rafters, and dynasty tension, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Bulls MJ Era — profile-bg

```text
vertical channel profile card background for Bulls MJ Era, background art layer only, Bulls dynasty profile panel with hanging banners, spotlight haze, and old championship polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Bulls MJ Era — logo

```text
square static channel logo icon for Bulls MJ Era, collectible art only, static icon inspired by a Bulls-dynasty crest, red and black authority, and six-ring legacy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Bulls MJ Era — badge

```text
square collectible badge emblem for Bulls MJ Era, collectible art only, collectible badge with dynasty-banner geometry, old-arena polish, and championship seal energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Bulls MJ Era — logo-spin

```text
rotating 3D collectible item for Bulls MJ Era, collectible art only, rotating dynasty-ring collectible with Bulls red, black trim, and a trophy-room finish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Mike Tyson TV — row-bg

```text
wide horizontal channel guide rectangle background for Mike Tyson TV, background art layer only, black-gold-red fight-poster banner with ring ropes, smoky canvas, and heavyweight menace, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Mike Tyson TV — profile-bg

```text
vertical channel profile card background for Mike Tyson TV, background art layer only, boxing profile panel with red-corner glow, canvas texture, and title-fight intensity, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Mike Tyson TV — logo

```text
square static channel logo icon for Mike Tyson TV, collectible art only, static icon built from a boxing glove silhouette, gold trim, and heavyweight fight-poster energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Mike Tyson TV — badge

```text
square collectible badge emblem for Mike Tyson TV, collectible art only, collectible badge inspired by a championship belt plate, black-gold menace, and fight-night shine, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Mike Tyson TV — logo-spin

```text
rotating 3D collectible item for Mike Tyson TV, collectible art only, rotating boxing glove collectible with belt-metal accents, smoky highlights, and knockout authority, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Inside the NBA Classics — row-bg

```text
wide horizontal channel guide rectangle background for Inside the NBA Classics, background art layer only, studio desk banner with monitor wall, blue-orange broadcast lights, stat sheets, and late-night desk energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Inside the NBA Classics — profile-bg

```text
vertical channel profile card background for Inside the NBA Classics, background art layer only, studio profile panel with CRT monitor wall, desk reflections, and comfortable late-night glow, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Inside the NBA Classics — logo

```text
square static channel logo icon for Inside the NBA Classics, collectible art only, static icon inspired by a studio monitor badge, blue-orange broadcast lights, and desk-show charm, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Inside the NBA Classics — badge

```text
square collectible badge emblem for Inside the NBA Classics, collectible art only, collectible badge shaped like a studio replay emblem, monitor-wall texture, and TNT-era comfort, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Inside the NBA Classics — logo-spin

```text
rotating 3D collectible item for Inside the NBA Classics, collectible art only, rotating microphone-and-monitor collectible with desk-show polish, studio chrome, and late-night energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### SportsCenter Classics — row-bg

```text
wide horizontal channel guide rectangle background for SportsCenter Classics, background art layer only, newsroom desk banner with CRT monitors, highlight wall, red-blue broadcast package, and classic countdown energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### SportsCenter Classics — profile-bg

```text
vertical channel profile card background for SportsCenter Classics, background art layer only, SportsCenter profile panel with newsroom gloss, monitor glow, and archive-highlight nostalgia, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### SportsCenter Classics — logo

```text
square static channel logo icon for SportsCenter Classics, collectible art only, static icon built from a red-blue highlight badge, newsroom energy, and classic ESPN rhythm, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### SportsCenter Classics — badge

```text
square collectible badge emblem for SportsCenter Classics, collectible art only, collectible badge shaped like a top-ten replay seal, CRT glow, and SportsCenter nostalgia, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### SportsCenter Classics — logo-spin

```text
rotating 3D collectible item for SportsCenter Classics, collectible art only, rotating highlight-reel collectible with newsroom chrome, red-blue energy, and archive broadcast swagger, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Super Bowl Channel — row-bg

```text
wide horizontal channel guide rectangle background for Super Bowl Channel, background art layer only, stadium-light banner with confetti burst, aerial field geometry, and trophy-gold big-game atmosphere, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Super Bowl Channel — profile-bg

```text
vertical channel profile card background for Super Bowl Channel, background art layer only, Super Bowl profile panel with gold glow, field-diagram geometry, and championship scale, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Super Bowl Channel — logo

```text
square static channel logo icon for Super Bowl Channel, collectible art only, static icon inspired by a trophy-gold stage emblem, championship energy, and big-game polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Super Bowl Channel — badge

```text
square collectible badge emblem for Super Bowl Channel, collectible art only, collectible badge with confetti edges, trophy-room shine, and championship-stage authority, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Super Bowl Channel — logo-spin

```text
rotating 3D collectible item for Super Bowl Channel, collectible art only, rotating football collectible with gold trophy treatment, stadium-light gleam, and title-game presence, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA Finals Channel — row-bg

```text
wide horizontal channel guide rectangle background for NBA Finals Channel, background art layer only, trophy-room banner with gold banners, game-seven court lines, and championship broadcast polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### NBA Finals Channel — profile-bg

```text
vertical channel profile card background for NBA Finals Channel, background art layer only, Finals profile panel with gold glow, trophy-room depth, and legacy-board atmosphere, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### NBA Finals Channel — logo

```text
square static channel logo icon for NBA Finals Channel, collectible art only, static icon inspired by a championship seal, gold trim, and Finals-history prestige, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA Finals Channel — badge

```text
square collectible badge emblem for NBA Finals Channel, collectible art only, collectible badge with trophy-room geometry, championship shine, and legacy energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### NBA Finals Channel — logo-spin

```text
rotating 3D collectible item for NBA Finals Channel, collectible art only, rotating championship trophy collectible with gold trim, court-line detailing, and legacy authority, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### March Madness TV — row-bg

```text
wide horizontal channel guide rectangle background for March Madness TV, background art layer only, bracket-chaos banner with hardwood motion, tournament boards, and buzzer-beater energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### March Madness TV — profile-bg

```text
vertical channel profile card background for March Madness TV, background art layer only, March profile panel with bracket fragments, arena tension, and postseason pressure, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### March Madness TV — logo

```text
square static channel logo icon for March Madness TV, collectible art only, static icon inspired by a tournament-bracket emblem, collegiate urgency, and hardwood energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### March Madness TV — badge

```text
square collectible badge emblem for March Madness TV, collectible art only, collectible badge shaped like a bracket seal, Cinderella drama, and tournament countdown energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### March Madness TV — logo-spin

```text
rotating 3D collectible item for March Madness TV, collectible art only, rotating college-basketball collectible with bracket geometry, buzzer-light streaks, and upset swagger, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Patriots Dynasty — row-bg

```text
wide horizontal channel guide rectangle background for Patriots Dynasty, background art layer only, cold blue-gray banner with playbook grids, comeback drive lines, and Foxboro discipline, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Patriots Dynasty — profile-bg

```text
vertical channel profile card background for Patriots Dynasty, background art layer only, Patriots profile panel with stadium-cold atmosphere, ring-room glow, and methodical polish, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Patriots Dynasty — logo

```text
square static channel logo icon for Patriots Dynasty, collectible art only, static icon inspired by a New England dynasty crest, cold blue authority, and disciplined football design, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Patriots Dynasty — badge

```text
square collectible badge emblem for Patriots Dynasty, collectible art only, collectible badge with ring-room precision, playbook geometry, and dynasty-blue shine, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Patriots Dynasty — logo-spin

```text
rotating 3D collectible item for Patriots Dynasty, collectible art only, rotating football collectible with cold-weather steel, ring-metal accents, and comeback discipline, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Random Sports Compilations — row-bg

```text
wide horizontal channel guide rectangle background for Random Sports Compilations, background art layer only, mixed-sport collage banner with CRT scanlines, remote-shuffle tape labels, and sports-bar-night energy, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 5:1`

---

### Random Sports Compilations — profile-bg

```text
vertical channel profile card background for Random Sports Compilations, background art layer only, compilation profile panel with archive tape texture, multi-sport collage fragments, and TV-static glow, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, keep the upper-left and center readable behind title, metadata, and CTA copy, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 3:4`

---

### Random Sports Compilations — logo

```text
square static channel logo icon for Random Sports Compilations, collectible art only, static icon inspired by a remote-shuffle highlight badge, mixed-sport collage, and tape-label nostalgia, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered silhouette, readable at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Random Sports Compilations — badge

```text
square collectible badge emblem for Random Sports Compilations, collectible art only, collectible badge with archive-tape edges, highlight-pile energy, and wildcard sports-bar flavor, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, centered sticker-like collectible, readable at small size, future badge surface, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

### Random Sports Compilations — logo-spin

```text
rotating 3D collectible item for Random Sports Compilations, collectible art only, rotating mixed-sport collectible with collage fragments, tape-label charm, and remote-shuffle chaos, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, transparent background preferred, centered object, collectible-item feel that reads at small size, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Midjourney: append `--ar 1:1`

---

## 7. Quality Checklist

Before committing any asset:

- [ ] Does it feel like the channel identity?
- [ ] Does it read at small size (logo and badge especially)?
- [ ] Is the text-safe zone clear on row-bg?
- [ ] Does the row-bg differ from the profile-bg without feeling unrelated?
- [ ] Does the palette match the channel accent colors in `data/channels.ts`?
- [ ] No readable text, real logos, real faces, or watermarks baked into the image?
- [ ] Did you run `npm run build` after wiring?

## 8. What These Prompts Do Not Include

- Real team logos or trademarks — excluded by negatives
- Real athlete faces — excluded by negatives
- Readable text — excluded by negatives
- UI mockups or screenshots — excluded by negatives

React renders all channel names, CH numbers, badges, metadata lines, and CTAs. The image is only an art layer.
