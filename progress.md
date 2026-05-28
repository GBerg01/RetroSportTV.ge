# Progress — RetroSportTV.ge

## Status: Phase 1 Complete — Scaffold Running

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
  - [x] VT323 retro font (Google Fonts via next/font)
  - [x] Dark retro theme in globals.css (phosphor green + amber, scanline CSS)
  - [x] Retro landing page with 6 placeholder channel cards
  - [x] Folders: app/, components/, data/, lib/, styles/
  - [x] `npm run build` passes clean

## In Progress
- [ ] —

## Up Next
- [ ] Phase 2: Seed data (`data/channels.ts` with real YouTube video IDs)
- [ ] Phase 3: Home page with real channel cards + links
- [ ] Phase 4: Player page (`/channel/[slug]`) with YouTube embed
- [ ] Phase 5: CRT overlay component
- [ ] Phase 6: Next / Shuffle / Channel dial controls

## Decisions Log
| Date | Decision | Reason |
|---|---|---|
| 2026-05-27 | YouTube embeds only | Legal/ToS compliance; no downloading or ripping |
| 2026-05-27 | Local seed data first | Keep MVP simple; no DB until product is proven |
| 2026-05-27 | Next.js App Router | Modern, good for SSG channel pages, easy Vercel deploy |
| 2026-05-27 | CSS-only retro effects | Performance; no canvas needed for scanlines/glow |
| 2026-05-27 | Scaffolded to /tmp then copied | Repo dir name "RetroSportTV.ge" has capitals; npm rejects it as package name |
| 2026-05-27 | VT323 font (Google Fonts) | Readable retro monospace; loads via next/font, no external request at runtime |
| 2026-05-27 | Next.js 16 + Tailwind v4 | Latest stable; Tailwind v4 uses CSS @import config (no tailwind.config.ts) |

## Blockers
- None

---

*Last updated: 2026-05-27*
