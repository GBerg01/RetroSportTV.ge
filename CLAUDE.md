# CLAUDE.md — RetroSportTV.ge

## Project Overview
RetroSportTV.ge is a nostalgic sports highlight TV app. Users channel-surf curated YouTube videos through a retro CRT-style interface. Think old-school cable sports TV, but in a browser.

## Stack
- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + custom CSS for retro/CRT effects
- **Video:** Official YouTube IFrame embeds only
- **Data:** Local seed data (JSON/TS) — no database yet

## Hard Rules
- **YouTube embeds only.** Never download, rip, proxy, or rehost video content.
- **Retro effects are CSS only.** Use filters, overlays, animations, gradients — no canvas video manipulation.
- **No external services yet.** No Supabase, auth, payments, comments, or admin panel in the MVP.
- **Keep it simple.** A fun working product beats perfect architecture.

## Architecture Patterns
- Seed data lives in `src/data/channels.ts` — array of channel objects with curated YouTube video IDs.
- Each channel has: `id`, `name`, `description`, `emoji`, `videoIds[]`.
- The player page is `app/channel/[id]/page.tsx` — stateful, plays through the channel's video list.
- Retro CSS overlay lives in `src/components/CRTOverlay.tsx` — pure CSS, no JS.

## Feature Flags (MVP scope)
| Feature | Status |
|---|---|
| Channel list / home | MVP |
| CRT player with YouTube embed | MVP |
| Next / Shuffle / Channel controls | MVP |
| Shareable channel URLs | MVP |
| Supabase / DB | Post-MVP |
| Auth / User accounts | Post-MVP |
| Comments | Post-MVP |
| Admin panel | Post-MVP |

## Dev Commands
```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # lint
```
