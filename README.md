# RetroSportTV.ge

> *Channel-surf the greatest sports moments, old-school style.*

RetroSportTV.ge is a nostalgic sports highlight TV app where fans channel-surf curated YouTube videos through a retro CRT-style interface. Pick a themed channel — NBA 2000s, Kobe TV, NFL Big Hits, Boston Classics — and let the highlights play continuously, like old-school cable sports TV.

## Features
- Themed channels with curated YouTube highlight playlists
- Retro CRT interface with scanline overlays and phosphor glow
- Next / Shuffle / Channel-dial controls
- Shareable channel URLs

## Stack
- [Next.js](https://nextjs.org/) 16 + React 19 + TypeScript
- Tailwind CSS v4 + custom CSS retro effects
- Official YouTube IFrame embeds (no ripping or proxying)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/          # Next.js App Router pages and layouts
components/   # Shared React components
data/         # Seed data — channels and video IDs
lib/          # Utility functions
styles/       # Additional CSS
```

## Rules
- YouTube embeds only — no downloading, ripping, or rehosting video
- Retro effects are CSS overlays only (no canvas video manipulation)
- MVP scope: no auth, no database, no payments

## Status
**Phase 1 complete** — scaffold running. See [MVP_TASKS.md](./MVP_TASKS.md) and [progress.md](./progress.md) for current status.
