# MVP Tasks — RetroSportTV.ge

Tasks are ordered by dependency. Complete top-to-bottom.

---

## Phase 1 — Scaffold
- [ ] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Clean out boilerplate (default page, globals)
- [ ] Install any needed fonts (VT323 or Press Start 2P via Google Fonts or next/font)
- [ ] Set up base layout with dark background

## Phase 2 — Seed Data
- [ ] Create `src/data/channels.ts`
- [ ] Define `Channel` type: `id`, `slug`, `name`, `description`, `emoji`, `channelNumber`, `videoIds[]`
- [ ] Add 6 seed channels with 5–10 real YouTube video IDs each:
  - NBA 2000s
  - Kobe TV
  - NFL Big Hits
  - Boston Classics
  - MJ Moments
  - Soccer Goals

## Phase 3 — Home Page
- [ ] `app/page.tsx` — channel grid
- [ ] `ChannelCard` component — shows emoji, channel number, name, description
- [ ] Links to `/channel/[slug]`
- [ ] Retro TV grid aesthetic (dark bg, glowing borders)

## Phase 4 — Player Page
- [ ] `app/channel/[slug]/page.tsx`
- [ ] Look up channel from seed data by slug
- [ ] State: `currentIndex` (which video is playing)
- [ ] Embed YouTube video via `<iframe>` with proper params (`autoplay=1`, `rel=0`)
- [ ] Show channel name, channel number, current video index

## Phase 5 — CRT Overlay
- [ ] `src/components/CRTOverlay.tsx` — pure CSS component
- [ ] Scanline effect (repeating-linear-gradient overlay)
- [ ] Subtle screen glow (box-shadow)
- [ ] Optional: slight border-radius for screen curvature
- [ ] Wrap the YouTube iframe with the overlay

## Phase 6 — Controls
- [ ] **Next** button — increments `currentIndex`, wraps around
- [ ] **Shuffle** button — picks a random video from the channel
- [ ] **Channel dial** — prev/next channel without going back to home
- [ ] Keyboard shortcuts: ArrowRight = next, `s` = shuffle (stretch)

## Phase 7 — Polish & Share
- [ ] Correct `<title>` and `<meta>` per channel page (for sharing)
- [ ] OG image or description tag
- [ ] 404 page for unknown channel slugs
- [ ] Responsive layout (works on mobile)
- [ ] Test all 6 channels play correctly

## Phase 8 — Deploy
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Confirm live URL works
- [ ] Update README with live link

---

## Out of Scope (MVP)
- User accounts / auth
- Supabase or any database
- Comments or social features
- Admin panel for managing channels
- Downloading or proxying video
