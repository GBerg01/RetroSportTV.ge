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

1. Decode the channel with `CHANNEL_ASSET_IDEATION_FRAMEWORK.md`.
2. Pick one of the three concept routes.
3. Use the prompt bible or `data/channelArtPrompts.ts` to get the production prompt set.
4. Generate the asset in OpenAI image generation.
5. Use Midjourney only if you want extra concept exploration.
6. Export or crop to the recommended aspect ratio.
7. Save the result to Desktop or Downloads.
8. Import it with the helper script.
9. Wire the file path into `data/channels.ts` if the channel should use it now.
10. Run `npm run build`.

## Midjourney Flow

1. Copy the same prompt direction from the prompt bible or data file.
2. Add the correct aspect suffix.
3. Generate in Discord.
4. Download the selected result.
5. Save it to Desktop or Downloads.
6. Import it with the helper script.

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
