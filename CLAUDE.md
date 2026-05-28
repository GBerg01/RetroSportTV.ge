# CLAUDE.md — RetroSportTV.ge

## Project Overview
RetroSportTV.ge is a nostalgic sports highlight TV app. Users channel-surf curated YouTube videos through a retro CRT-style interface. Think old-school cable sports TV, but in a browser.

## Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + custom CSS for retro/CRT effects
- **Font:** VT323 via `next/font/google`
- **Video:** Official YouTube IFrame embeds only
- **Data:** Local seed data in `data/channels.ts` — no database yet

## Hard Rules
- **YouTube embeds only.** Never download, rip, proxy, or rehost video content.
- **Retro effects are CSS only.** Use filters, overlays, animations, gradients — no canvas video manipulation.
- **No external services yet.** No Supabase, auth, payments, comments, or admin panel in the MVP.
- **Keep it simple.** A fun working product beats perfect architecture.

## Architecture — Separation of Concerns

These boundaries must be maintained to keep UI iteration fast:

| Layer | File | Rule |
|---|---|---|
| Channel data | `data/channels.ts` | All channel content lives here. Never hardcode channel data into components. |
| Data helpers | `lib/channels.ts` | All data access goes through these helpers. |
| Homepage | `app/page.tsx` | Homepage layout only. Redesign here without touching playback. |
| Player logic | `components/ChannelPlayer.tsx` | All playback state and controls. Touch only for player changes. |
| Channel icon | `components/ChannelLogo.tsx` | Single swap point for emoji → image/SVG/badge. Never render `channel.emoji` directly. |

## Channel Icon Swapping (Rule 6)
To replace an emoji with a logo/SVG/image badge:
1. Set `logoUrl: "/images/kobe-logo.svg"` (or any URL) on the channel in `data/channels.ts`.
2. `ChannelLogo` automatically renders the image instead of the emoji. No other files change.

## Key Files
```
data/channels.ts          — Channel type + all seeded channel data + video IDs
lib/channels.ts           — getAllChannels, getChannelBySlug, getNextChannel, getPreviousChannel, getFeaturedChannels
app/page.tsx              — Homepage: channel grid
app/channel/[slug]/       — Dynamic player route
  page.tsx                — Server component: lookup, notFound(), generateStaticParams
components/
  ChannelPlayer.tsx       — Client component: iframe embed, Next/Shuffle/channel controls
  ChannelLogo.tsx         — Renders logoUrl image or emoji fallback
  ChannelCard.tsx         — (future) if ChannelCard is extracted from page.tsx
app/globals.css           — Tailwind import + retro CSS vars + .scanlines + .phosphor-glow
```

## Retro CSS Classes (globals.css)
- `.scanlines` — adds CSS scanline overlay via `::after` pseudo-element
- `.phosphor-glow` — green text glow (`text-shadow`)
- `.amber-glow` — amber text glow (`text-shadow`)
- CSS vars: `--phosphor-green: #39ff14`, `--phosphor-amber: #ffb000`

## Feature Flags (MVP scope)
| Feature | Status |
|---|---|
| Channel list / home | ✅ Done |
| CRT player with YouTube embed | ✅ Done |
| Next / Shuffle / Channel controls | ✅ Done |
| Shareable channel URLs | ✅ Done |
| Verified YouTube video IDs | 🔄 In progress |
| Keyboard shortcuts | Post-MVP |
| Supabase / DB | Post-MVP |
| Auth / User accounts | Post-MVP |
| Comments | Post-MVP |
| Admin panel | Post-MVP |

## Dev Commands
```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # lint
```

## Known Workarounds
- **Package name:** Directory is `RetroSportTV.ge` (capitals), npm rejects it. Package name is `"retrosport-tv"` in package.json.
- **[slug] directories:** Bash `mkdir` rejects `[slug]` as a glob. Use Python: `python3 -c "from pathlib import Path; Path('app/channel/[slug]').mkdir(parents=True, exist_ok=True)"`.
- **git add [slug]:** Use single quotes: `git add 'app/channel/[slug]/page.tsx'`.
