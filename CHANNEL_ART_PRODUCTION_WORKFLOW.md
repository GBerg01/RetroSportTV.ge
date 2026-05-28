# Channel Art Production Workflow

This is the repeatable production process for generating, organizing, importing, and iterating custom channel art for RetroSportTV.ge.

The current app supports custom row backgrounds and profile-card backgrounds. Rotating logo assets are documented and typed for future UI use without changing current player behavior.

## Asset Types

Each channel can have these assets:

```text
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/logo-spin.webp
```

- `row-bg.png`: wide channel guide rectangle background, 5:1 preferred, 4:1 acceptable.
- `profile-bg.png`: vertical TV/profile card background, 3:4.
- `logo.png`: static transparent fallback logo/icon, 1:1.
- `logo-spin.webp`: preferred future rotating collectible logo/item, 1:1 animated WebP.

Temporary logo-spin fallbacks:

- `logo-spin.png`: static frame if animation is not ready.
- `logo-spin.gif`: acceptable animated fallback if WebP is not available.

## Prompt Sources

- `CHANNEL_ART_PROMPTS.md`: human-readable prompt library and creative guidance.
- `data/channelArtPrompts.ts`: structured prompt catalog generated from every live channel in `data/channels.ts`.

Every current live channel gets prompt sets for:

- `row-bg`
- `profile-bg`
- `logo-spin`

OpenAI image generation is the recommended production provider. Midjourney is supported for concept exploration and high-vibe style exploration.

## Generation Workflow

1. Pick a channel slug, such as `kobe-tv`.
2. Pick an asset type: `row-bg`, `profile-bg`, or `logo-spin`.
3. Copy the OpenAI prompt from `CHANNEL_ART_PROMPTS.md` or `data/channelArtPrompts.ts`.
4. Generate the asset.
5. Export/crop to the target aspect ratio.
6. Save or download the file to Desktop or Downloads.
7. Import it with the helper script.

Midjourney/Discord flow:

1. Copy the Midjourney prompt from `data/channelArtPrompts.ts` or append the documented `--ar` value.
2. Generate in Discord.
3. Open/download the selected image.
4. Save to Desktop or Downloads.
5. Run the import command below.

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
- Static row/profile/logo assets must be PNG files because their target names are `.png`.
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
- `logoSpinUrl` is typed/resolved for future rotating-logo UI, but it is not currently rendered.

## Rotating Logo / 3D Item Strategy

The `logo-spin` asset should feel like a collectible video-game object, not a normal logo.

Creative rules:

- Centered object.
- Transparent or easily removable background.
- No readable text.
- No real logos.
- No real athlete faces.
- Reads clearly at 40-64px.
- Looks good as a static frame even before animation is wired into UI.

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
2. Save/download it to Desktop or Downloads.
3. Import it:

```bash
npm run art:import -- --channel kobe-tv --asset row-bg --source latest-desktop --force
```

4. Run or keep dev server running:

```bash
npm run dev
```

5. Refresh the browser.
6. If the result is bad, regenerate and re-import with `--force`.
7. Run `npm run build` before committing.

## Architecture Verification

Current system readiness:

- Custom row backgrounds: ready.
- Custom profile card backgrounds: ready.
- Static logos through `logoUrl`: ready.
- Rotating logo assets through `logoSpinUrl`: typed and resolved, not rendered yet.
- Full-screen player behavior: separate and unchanged.
- Routes/database/auth/admin: unchanged.

The visual source of truth remains `lib/channelArt.ts`, with rendering split across `ChannelRow`, `ChannelPreview`, `ChannelProfileCard`, and `ChannelLogo`.
