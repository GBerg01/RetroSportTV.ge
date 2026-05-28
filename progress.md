# Progress — RetroSportTV.ge

## Status: Phase 6 Complete — Immersive Player + Design North Star

---

## Done
- [x] Project concept defined
- [x] README.md written
- [x] CLAUDE.md created (dev guidelines)
- [x] PRODUCT_BRIEF.md created (product vision)
- [x] MVP_TASKS.md created (ordered task list)
- [x] **Phase 1: Next.js scaffold**
  - [x] Next.js 16 + React 19 + TypeScript + Tailwind v4 + ESLint
  - [x] App Router, no src/ directory, `@/*` import alias
  - [x] VT323 retro font, dark theme, scanline + glow CSS utilities
  - [x] Folders: app/, components/, data/, lib/, styles/
  - [x] `npm run build` passes clean
- [x] **Phase 2: Seed data + homepage wiring**
  - [x] `Channel` type (9 fields) in `data/channels.ts`
  - [x] 6 seeded channels with placeholder YouTube IDs (marked TODO)
  - [x] `lib/channels.ts` — 5 helpers incl. getNextChannel / getPreviousChannel
  - [x] `app/page.tsx` — real channel data, no hardcoded placeholder array
  - [x] `npm run build` passes clean
- [x] **Phase 3: Channel player page**
  - [x] `app/channel/[slug]/page.tsx` — server component, generateStaticParams, generateMetadata, notFound() on bad slug
  - [x] `components/ChannelPlayer.tsx` — client component with useState for currentIndex
  - [x] YouTube iframe embed: `youtube.com/embed/{id}?autoplay=1&rel=0&modestbranding=1`
  - [x] `key` prop on iframe forces remount on video change (reliable src swap)
  - [x] Next video button (wraps around), Shuffle button (always changes)
  - [x] Prev channel / Next channel links via getNextChannel / getPreviousChannel
  - [x] CRT scanline overlay + phosphor glow on player
  - [x] Channel metadata: name, number, sport, era, vibe, video counter
  - [x] All 6 channel pages statically generated (SSG)
  - [x] `npm run build` passes clean

- [x] **Phase 4: Homepage UI rebuilt**
  - [x] `components/HomeHero.tsx` — status bar, wordmark, boot status line with blinking cursor
  - [x] `components/ChannelCard.tsx` — cable-guide style card: CH strip, logo, metadata, ▶ TUNE IN footer
  - [x] `components/ChannelGrid.tsx` — CHANNEL GUIDE divider header + responsive grid
  - [x] `app/page.tsx` — simplified to compose the three new components
  - [x] `globals.css` — added `.cursor` blink and `.power-on` CRT boot animation
  - [x] `ChannelLogo` still the only icon swap point; player pages unchanged
  - [x] `npm run build` passes clean

- [x] **Phase 5: Video data upgraded**
  - [x] `Video` type added: `{ id: string; title: string }`
  - [x] `videoIds: string[]` → `videos: Video[]` across all 6 channels
  - [x] All TODO/placeholder comments removed; best-effort IDs with accurate titles
  - [x] `lib/channels.ts` exports `Video` type
  - [x] `ChannelPlayer` uses `video.id` for iframe, `video.title` for NOW PLAYING display
  - [x] `npm run build` passes clean
  - [x] All 30 video IDs replaced with confirmed real YouTube IDs (Phase 5.1)

- [x] **Phase 6: Immersive full-screen channel player**
  - [x] YouTube IFrame API replaces plain iframe — videos auto-advance on end
  - [x] Player fills entire viewport (`fixed inset-0`), no stacked page below video
  - [x] Top/bottom gradient overlays (channel identity + NOW PLAYING + controls)
  - [x] Overlays auto-hide after 3 s, reappear on mouse movement
  - [x] Transparent z-layer prevents iframe click-to-pause
  - [x] Videos start 2 s in, YouTube native controls hidden
  - [x] `.tv-cut` CSS animation (white→black→transparent, 500 ms) on every video change
  - [x] `body overflow: hidden` while on channel page
  - [x] `npm run build` passes clean

- [x] **Design North Star**
  - [x] `DESIGN.md` created — product philosophy, visual language, 3 homepage concepts
  - [x] Cable Guide Mode recommended as next homepage direction

## In Progress
- [ ] —

## Up Next
- [ ] Homepage redesign: Cable Guide Mode (rows, not cards; TUNE IN; channel ticker)
- [ ] Verify all video IDs in `npm run dev`
- [ ] Deploy to Vercel

## Decisions Log
| Date | Decision | Reason |
|---|---|---|
| 2026-05-27 | YouTube embeds only | Legal/ToS compliance; no downloading or ripping |
| 2026-05-27 | Local seed data first | Keep MVP simple; no DB until product is proven |
| 2026-05-27 | Next.js App Router | Modern, good for SSG channel pages, easy Vercel deploy |
| 2026-05-27 | CSS-only retro effects | Performance; no canvas needed for scanlines/glow |
| 2026-05-27 | Scaffolded to /tmp then copied | Repo dir name "RetroSportTV.ge" has capitals; npm rejects it as package name |
| 2026-05-27 | VT323 font (Google Fonts) | Readable retro monospace; loads via next/font |
| 2026-05-27 | Next.js 16 + Tailwind v4 | Latest stable; Tailwind v4 uses CSS @import config |
| 2026-05-27 | Placeholder YouTube IDs | Cannot safely verify without a live player; marked TODO |
| 2026-05-27 | Server page + client ChannelPlayer component | Page needs generateStaticParams (server); controls need useState (client) |
| 2026-05-27 | key prop on iframe = `{slug}-{index}` | Forces React to fully remount iframe on video change; reliable autoplay |
| 2026-05-27 | Python for [slug] dir creation | Bash mkdir rejects [slug] as a glob even when quoted; Python pathlib works cleanly |

## Blockers
- None currently.

---

| 2026-05-27 | YT IFrame API for player | Enables auto-advance on video end and programmatic loadVideoById; plain iframe couldn't do this |
| 2026-05-27 | Overlay UI for channel player | Full-screen TV feel; stacked page layout broke immersion |
| 2026-05-27 | DESIGN.md created | Prevent future UI drift; establish cable TV / ESPN Classic as the design north star |
| 2026-05-27 | Cable Guide Mode as next homepage | Rows > cards; truest expression of "choosing a channel"; works well with current data model |

*Last updated: 2026-05-27*
