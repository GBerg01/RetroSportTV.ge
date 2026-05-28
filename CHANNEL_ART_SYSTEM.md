# Channel Art System

## A. Purpose

RetroSportTV channels should feel like custom sports broadcast packages while still using one consistent component format. A channel can look like Kobe TV, Florida Gators TV, Tiger Sundays, or NFL Big Hits without each row becoming one-off component code.

The current system supports this by keeping channel metadata in data, resolving visual defaults in one helper, and rendering those resolved values through reusable channel guide and preview components.

## B. Architecture Overview

- `data/channels.ts` is the live channel metadata source. It owns required channel data such as `id`, `slug`, `name`, `channelNumber`, `sport`, `era`, `vibe`, `accentColor`, `emoji`, videos, and optional art fields.
- `lib/types.ts` defines the supported channel shape and optional art/theme fields.
- `lib/channelArt.ts` is the visual resolver. It combines channel-provided fields, slug-specific presets, sport/category fallbacks, generated textures, and safe defaults into one `ChannelArt` object.
- `components/ChannelRow.tsx` renders each homepage guide rectangle. It consumes `getChannelArt(channel)` for accent color, secondary accent, texture/background, and right-side graphic label.
- `components/ChannelPreview.tsx` owns the right-side mini TV/Jumbotron video preview. It uses the same resolved accent color as the selected row and passes the selected channel to the profile card.
- `components/ChannelProfileCard.tsx` renders the selected-channel profile card under the preview video. It consumes `getChannelArt(channel)` for borders, glow, texture, background, and accent treatment.
- `components/ChannelLogo.tsx` is the current logo/icon swap point. If `channel.logoUrl` exists, it renders the image; otherwise it falls back to `channel.emoji`.
- `app/page.tsx` loads all channels and renders `ChannelBrowser`.
- `components/ChannelBrowser.tsx` owns filtering and hover state. Hovering a row updates `activeChannel`, which updates both `ChannelPreview` and `ChannelProfileCard`.

Verification: the preview monitor and profile card use the same visual source of truth as the channel rows: `lib/channelArt.ts`.

## C. Supported Channel Art Fields

Current supported fields on `SportsChannel`:

- `logoUrl`: optional image/SVG logo path. Rendered by `ChannelLogo`.
- `logoSpinUrl`: optional future rotating collectible logo/item path. Resolved by `lib/channelArt.ts`, documented for production, and not currently rendered by the UI.
- `rowBackgroundUrl`: optional guide-row background image.
- `profileBackgroundUrl`: optional profile-card background image.
- `heroImageUrl`: optional broader hero/preview image field for future layouts.
- `textureUrl`: optional custom texture image layered with generated texture treatment.
- `rowTexture`: optional generated texture key. Current values: `hardwood`, `gridiron`, `scoreboard`, `swamp`, `fairway`, `court`, `ice`, `canvas`, `broadcast`.
- `accentColor`: primary channel accent. Drives row borders, CH block, monitor border, profile card glow, and CTA color.
- `secondaryAccentColor`: secondary channel accent. Drives logo-slot border, profile highlights, badges, and background glow.
- `displayStyle`: optional broad style hint. Current values: `arena`, `broadcast`, `classic`, `impact`, `premium`, `local`.
- `emoji`: required fallback icon when `logoUrl` is not present.

Defaults and fallbacks:

- `accentColor` falls back to phosphor green (`#39ff14`) in `getChannelArt`.
- `secondaryAccentColor` falls back to slug presets, then amber (`#ffb000`).
- `rowTexture` falls back to slug presets, then sport-based defaults, then `broadcast`.
- `displayStyle` falls back from explicit channel field, to slug preset, to category-based defaults.
- `graphicLabel` falls back from slug preset to the first three alphanumeric characters of the channel name.
- Channels with no custom assets still get generated gradients, generated texture layers, accent styling, and emoji fallback.

Recommended future fields if needed:

- `previewBackgroundUrl`: only add if the mini monitor needs non-video placeholder art distinct from `heroImageUrl`.
- `logoDarkUrl` / `logoLightUrl`: only add if one logo cannot work on both dark and accent-heavy backgrounds.

## D. Required Asset Package Per Channel

Ideal future folder structure:

```text
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/logo-spin.webp
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/texture.png
```

Example channel data wiring:

```ts
{
  slug: "kobe-tv",
  logoUrl: "/channel-art/kobe-tv/logo.png",
  logoSpinUrl: "/channel-art/kobe-tv/logo-spin.webp",
  rowBackgroundUrl: "/channel-art/kobe-tv/row-bg.png",
  profileBackgroundUrl: "/channel-art/kobe-tv/profile-bg.png",
  textureUrl: "/channel-art/kobe-tv/texture.png",
  accentColor: "#552583",
  secondaryAccentColor: "#FDB927",
  rowTexture: "hardwood",
  displayStyle: "premium",
}
```

## E. Channel Guide Rectangle Format

The guide rectangle format stays consistent across channels:

- CH number block on the left.
- Logo/art slot next to the CH block.
- Large channel name.
- Category/type badge.
- Sport, era, and compact metadata line.
- Optional description line on wider viewports.
- Right-side graphic treatment using `graphicLabel`.
- TUNE IN affordance on the right.
- Accent border, glow, and hover/active treatment.

Customization changes the flavor, not the layout. A row can use a custom logo, custom background image, custom texture, and custom accent colors while preserving click target, hover behavior, and readable text.

## F. Profile Card Format

The profile card under the preview video stays consistent across channels:

- `ChannelLogo`.
- Channel name.
- CH number.
- Channel type/category.
- Sport.
- Era.
- Description/blurb.
- Badges such as `LIVE ARCHIVE`, `SIGNAL STRONG`, `CLASSIC FEED`, `PLAYER CHANNEL`, `ERA CHANNEL`, or `TEAM CHANNEL`.
- Featured clip title from the selected channel's first video.
- TUNE IN CTA linking to `/channel/[slug]`.

The card intentionally does not include a dedicated vibe section. The description/blurb is the main personality copy.

## G. Customization Rules

- Custom art should change the channel flavor, not the component structure.
- Every channel uses the same `ChannelRow`, `ChannelPreview`, `ChannelProfileCard`, and `ChannelLogo` structure.
- Assets must leave safe zones for text, CH number, badges, and the TUNE IN CTA.
- Text must remain readable over art. Use darker edges or low-detail areas behind text.
- `accentColor` should drive primary glow, borders, CH block, and buttons.
- `secondaryAccentColor` should support highlights, logo framing, and background glow.
- Channels without custom art must still look finished using generated gradients, generated textures, and emoji fallback.
- Do not hardcode channel-specific visuals inside components. Add data fields or resolver presets in `lib/channelArt.ts`.

Current gap to watch: status badge wording lives in `ChannelProfileCard`. That is acceptable while only the card uses it, but if row badges or other surfaces need the same labels, move that mapping into `lib/channelArt.ts` or a shared channel presentation helper.

## H. Suggested Art Dimensions

- Row background art: `2400 x 420` PNG/JPG/WebP. Keep important imagery in the right third or far background; left and center need text-safe contrast.
- Static logo/icon: `512 x 512` transparent PNG or SVG. It must read at `40-64px`.
- Rotating logo item: `512 x 512` or `1024 x 1024` transparent WebP preferred. Use `logo-spin.webp` for animated future assets, with `logo-spin.png` or `logo-spin.gif` acceptable during iteration.
- Profile background: `1200 x 1600` or `900 x 1200`. Keep the top-left identity area readable and avoid high-detail text behind the description and metadata rows.
- Texture: `512 x 512` seamless PNG/WebP, low contrast. It should support the generated texture layer rather than dominate it.
- Preview-safe art: `1280 x 720` if future non-video monitor placeholder art is added.
- Mobile-safe considerations: the right-side preview is hidden on current desktop breakpoint behavior, but assets should still be designed with central safe zones in case the preview becomes responsive later.

## I. Example Channel Art Directions

- Kobe TV: purple/gold, Lakers-era hardwood, premium legend treatment, subtle jersey/silhouette energy without crowding text.
- NBA 2000s: red/white/blue broadcast feel, chrome TV package, baggy-shorts era texture, all-star montage energy.
- NFL Big Hits: gritty turf, chalk marks, collision/impact energy, dark green and steel accents.
- Florida Gators TV: orange/blue, swamp texture, college broadcast package, stadium-night energy.
- Tiger Sundays: golf green, Sunday red, gold trim, calm premium Augusta-inspired tone.
- Mike Tyson TV: black/gold/red, fight poster energy, canvas texture, dramatic spotlighting.
- Inside the NBA Classics: studio desk mood, blue/orange late-night sports TV energy inspired by studio broadcasts but not copied.

## J. Implementation Checklist For Future Agents

When adding custom channel art:

1. Add files to `public/channel-art/{slug}/`.
2. Add or update art fields in `data/channels.ts` through the reviewed channel data workflow.
3. Confirm `lib/channelArt.ts` resolves those fields and preserves fallbacks.
4. Confirm `ChannelRow` renders correctly for the channel.
5. Confirm `ChannelProfileCard` renders correctly for the selected channel.
6. Run `npm run lint`.
7. Run `npm run build`.
8. Browser test homepage hover and the channel page.

## Verification Summary

The current architecture is ready for custom channel guide rectangles and profile cards:

- Rows are themeable through `getChannelArt`.
- Each channel can have unique accent colors without component changes.
- Each channel can later have custom logo art through `logoUrl`.
- Each channel can later have rotating collectible logo art through `logoSpinUrl`.
- Each channel can later have row background art through `rowBackgroundUrl`.
- Each channel can later have profile card art through `profileBackgroundUrl`.
- Each channel can later use custom texture art through `textureUrl`.
- Channels with no custom art still render with generated gradients, generated texture layers, and emoji fallback.
- The preview monitor, guide rows, and profile card share the same visual resolver.
- Full-screen player behavior is separate and unchanged by this system.
