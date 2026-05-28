# Progress — RetroSportTV.ge

## Status: Phase 8 Complete — Two-Column Cable Guide + CRT Frame Masking

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

- [x] **Phase 7: Cable Guide homepage redesign**
  - [x] `Channel` type gains `categories?: string[]`; all 6 channels tagged
  - [x] `ChannelRow.tsx` — horizontal guide row: CH column, logo, name+meta+desc, TUNE IN; hover highlights left border green
  - [x] `ChannelGuide.tsx` — client component; 8 category tabs (ALL/PLAYERS/ERAS/TEAMS/CHAOS/CLASSICS/COLLEGE/GOLF); instant filter; tabs scrollable on mobile
  - [x] `SportsTicker.tsx` — full-width CSS scrolling ticker; channel names, vibes, broadcast phrases; 90 s loop
  - [x] `HomeHero.tsx` — denser broadcast status bar (PKG / CH / SIG fields)
  - [x] `app/page.tsx` — full-width ticker outside centered column; SportsTicker + ChannelGuide wired up
  - [x] `globals.css` — `.ticker-track` animation + `.no-scrollbar` utility
  - [x] `ChannelCard.tsx` and `ChannelGrid.tsx` preserved (unused but not deleted)
  - [x] `npm run build` passes clean; all 10 pages statically generated

- [x] **Phase 8: Two-column cable guide + CRT frame masking**
  - [x] `HomeHero` redesigned as compact broadcast header bar (branding + PKG/CH/SIG fields + boot line)
  - [x] `ChannelBrowser.tsx` (new client component) — two-column layout: guide list left ~420px, preview panel right; owns `activeChannel` state; tabs reset preview on filter change
  - [x] `ChannelPreview.tsx` (new) — YouTube thumbnail bg (22% opacity) + dark gradient + scanlines + `.crt-frame` edge masking; channel identity, description, NOW AIRING, TUNE IN CTA
  - [x] `ChannelRow.tsx` updated — `isActive` highlight (green left border + bg tint + full vibe brightness), `onMouseEnter` callback, channel type label (PLAYER CH / ERA CH / etc.)
  - [x] `ChannelPlayer.tsx` — separate scanlines + vignette divs replaced by single `.scanlines.crt-frame` div; edge-masking gradients (4% L/R, 5% top, 8% bottom) visually integrate iframe into TV environment
  - [x] `globals.css` — `.crt-frame` class: 4-direction edge-masking gradients + inset box-shadow vignette
  - [x] `app/page.tsx` — full-width header → centered ChannelBrowser → full-width ticker → footer
  - [x] `npm run build` passes clean; all 10 pages generated

## In Progress
- [ ] —

## Up Next
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
| 2026-05-27 | categories[] added to Channel type | Enables tab filter without routing; maps naturally to guide concept; easy to extend |
| 2026-05-27 | SportsTicker full-width, outside centered column | Real TV tickers span the screen; constraining it to max-w-4xl kills the broadcast feel |
| 2026-05-27 | ChannelGuide is client component, ChannelRow is server-compatible | Tab state lives in ChannelGuide; rows have no interactivity so they stay server-renderable |

*Last updated: 2026-05-27*
