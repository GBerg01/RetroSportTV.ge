# Progress — RetroSportTV.ge

## Status: Phase 32 Complete — NFL Embed Fix + Spotify Soundtrack Mode Designed

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

- [x] **Phase 9: Bold broadcast redesign + per-channel accent colors**
  - [x] `data/channels.ts` — `accentColor?: string` added to Channel type; all 6 channels assigned unique accent colors (purple/orange/blue/green/gator-orange/red)
  - [x] `app/globals.css` — `.accent-btn` class: CSS variable `--btn-accent` drives border+color, opacity hover transition
  - [x] `ChannelRow.tsx` — full rewrite: 54×54px CH badge, accent-colored left border + bg tint on active, `text-[22px]` channel names, `py-4` taller rows, category badge, `isActive` prop with `onMouseEnter` callback
  - [x] `ChannelPreview.tsx` — bold redesign: 3px accent top bar, 35% thumbnail opacity, `text-4xl xl:text-5xl` channel name with per-channel accent glow, accent-colored TUNE IN button (`.accent-btn` + `--btn-accent`), more visible metadata
  - [x] `ChannelBrowser.tsx` — wider left column (`lg:w-[480px] xl:w-[520px]`), `text-sm` tabs, active tab with `bg-[#0a1a0a]` highlight
  - [x] `HomeHero.tsx` — larger wordmark (`text-3xl sm:text-4xl`), more visible status fields
  - [x] `npm run build` passes clean; all 10 pages statically generated

- [x] **Phase 10: Muted homepage preview monitor**
  - [x] `ChannelPreview.tsx` now renders the active channel's first video as a muted autoplaying YouTube iframe
  - [x] Preview iframe uses official embed params: autoplay, mute, hidden controls, rel=0, modest branding, playsinline, start=2
  - [x] Iframe remounts per hovered channel via stable channel/video key
  - [x] Thumbnail remains as a fallback/loading visual; no-video state renders a CRT-style signal background
  - [x] Existing dark overlay, scanlines, CRT frame masking, ChannelLogo, and tune-in route behavior preserved

- [x] **Phase 11: Stage 1 content pipeline framework**
  - [x] `lib/types.ts` added shared `SportsChannel`, `SportsVideo`, `ChannelCategory`, `PlaylistRule`, `VideoSource`, and `VideoValidationStatus` types
  - [x] `data/channels.ts` refactored to use shared content types while preserving all existing channels and videos
  - [x] `lib/content/playlist.ts` added pure helpers for approved video filtering, quality sorting, playlist building, preview selection, next video, and random video selection
  - [x] `lib/content/validation.ts` added pure YouTube ID, watch URL, embed URL, normalization, and extraction helpers
  - [x] `data/researchQueue.ts` added expansion targets and search guidance for deeper future channels
  - [x] `CONTENT_PIPELINE.md` documents local content workflow, validation, quality scoring, playlist composition, YouTube embed boundary, and future API/database path
  - [x] Existing homepage/player UI behavior preserved; category components updated only for stricter shared types

- [x] **Phase 12: Local add-video content script**
  - [x] `scripts/add-video.ts` added a safe CLI for appending one approved YouTube video to an existing channel
  - [x] `content:add-video` npm script compiles and runs the TypeScript CLI without adding new dependencies
  - [x] Script uses `extractYouTubeId()` and `isValidYouTubeId()` from the Stage 1 validation helpers
  - [x] Invalid IDs, missing channels, malformed channel data, and duplicate IDs in the same channel are rejected
  - [x] `CONTENT_PIPELINE.md` now documents add-video usage and follow-up verification

- [x] **Phase 13: Bulk video intake workflow**
  - [x] `data/intake/example-videos.json` added as a local JSON intake template
  - [x] `scripts/import-videos.ts` added bulk import from a channelSlug + videos array
  - [x] `content:import-videos` npm script compiles and runs the TypeScript importer without new dependencies
  - [x] Importer validates each YouTube ID with the existing content validation helpers
  - [x] Duplicate videos already in the target channel are skipped; invalid videos are rejected; valid videos are appended as approved and embeddable
  - [x] Importer prints added, skipped duplicate, and rejected invalid counts
  - [x] `CONTENT_PIPELINE.md` documents the bulk JSON intake workflow

- [x] **Phase 14: Video research candidate workflow**
  - [x] Candidate intake templates added for Kobe TV, NBA 2000s, and NFL Big Hits
  - [x] `CONTENT_RESEARCH_GUIDE.md` added with research workflow, source guidance, candidate rules, quality scoring, channel briefs, and browser QA steps
  - [x] `scripts/create-intake-template.ts` added to generate empty `<channel-slug>-candidates.json` files safely
  - [x] `content:create-intake` npm script added for candidate template generation
  - [x] `CONTENT_PIPELINE.md` updated with research queue → candidate file → import → local QA → commit/push workflow
  - [x] Research candidate workflow does not import candidates or modify live channel data

- [x] **Phase 15: 100-channel expansion plan**
  - [x] `CHANNEL_EXPANSION_PLAN.md` added as a planning-only channel/content strategy map
  - [x] 100 future themed sports channels grouped across 10 categories
  - [x] Each planned channel includes CH number, name, category, sport, era, vibe, example moments/search themes, why it belongs, ideal sources, and avoid notes
  - [x] No channels added to `data/channels.ts`; no UI/player/database/auth/admin changes

- [x] **Phase 16: Long-term 100-channel expansion roadmap**
  - [x] `CHANNEL_EXPANSION_PLAN.md` rebuilt as the long-term roadmap for turning the 6-channel MVP into a 100-channel retro sports cable-box product
  - [x] `data/channelRoadmap.ts` added with typed `ChannelRoadmapItem`, `ChannelRoadmapCategory`, `LaunchPriority`, and all 100 roadmap channels
  - [x] First 12 expansion targets marked `launchPriority: "next"`
  - [x] `CONTENT_PIPELINE.md` updated to connect roadmap planning to research candidate files and import workflow
  - [x] No live channel data, UI, player, database, auth, or admin changes

- [x] **Phase 17: First priority channel batch**
  - [x] Added the first 12 priority roadmap channels to live `data/channels.ts`
  - [x] New live channels assigned sequential channel numbers 07-18
  - [x] Each new channel includes channel metadata, category tags, accent color, emoji fallback, playlist rules, and 3 starter videos
  - [x] Starter video IDs were checked through YouTube oEmbed before adding
  - [x] Existing 6 MVP channels preserved; no UI/player/database/auth/admin changes

- [x] **Phase 18: Candidate file fulfillment — Batch A (Jordan TV + Bulls MJ Era)**
  - [x] `data/intake/jordan-tv-candidates.json` — 7 verified YouTube candidates (Q83–Q92)
    - 1988 Dunk Contest vs Wilkins (NBA Highlights), 63 pts @ Boston 1986, Double Nickel 55 pts 1995, 1993 Finals MVP vs Suns, 1987-88 MVP season, 1988 All-Star MVP, 59 pts vs Bad Boys 1988
  - [x] `data/intake/bulls-mj-era-candidates.json` — 7 verified YouTube candidates (Q84–Q92)
    - 1991 Finals MVP vs Lakers, 1991 Finals Game 1, Bulls sweep Bad Boys 1991, Pippen/MJ dominate '91 Pistons, Unstop-A-Bulls 1996 documentary, 1996 Finals Game 6, Jordan 44/Pippen 40/Rodman 23 vs Pacers
  - [x] JSON validated, no duplicates vs live channels.ts
  - [x] No live channel data modified

- [x] **Phase 19: Candidate file fulfillment — Batch B (Mike Tyson TV + SportsCenter Classics)**
  - [x] `data/intake/mike-tyson-tv-candidates.json` — 7 verified YouTube candidates (Q82–Q91)
    - Tyson vs Berbick (youngest champ), Tyson vs Spinks (91 sec), Tyson vs Douglas (upset), Tyson vs Holyfield I, Tyson vs Holyfield II (ear bite), Tyson vs Holmes, Tyson vs Biggs
  - [x] `data/intake/sportscenter-classics-candidates.json` — 7 verified YouTube candidates (Q83–Q88)
    - Early 90s NBA rare footage, NBA Finals Top 10, ESPN Throwback Top 10, Jan 1990 Plays of Week, This Is SportsCenter 90s NBA commercials, April 22 1990 broadcast, Best 90s commercials
  - [x] JSON validated, no duplicates vs live channels.ts

- [x] **Phase 20: Candidate file fulfillment — Batch C (Super Bowl Channel + NBA Finals Channel)**
  - [x] `data/intake/super-bowl-channel-candidates.json` — 7 verified YouTube candidates (Q84–Q92)
    - Super Bowl XXIII Montana/Rice full game, Top Plays in SB history, SB XXXIV Rams/Titans (The Tackle), SB XXIV 49ers/Broncos, Montana XXIV highlights, Top 10 SB moments, Best plays in SB history HD
  - [x] `data/intake/nba-finals-channel-candidates.json` — 7 verified YouTube candidates (Q82–Q90)
    - 2010 Finals G7 Celtics/Lakers extended, 2000 Finals G4 Kobe takes over, Lakers/Celtics Top 10 rivalry, 2000 Finals G1 Shaq 43, 2001 Finals G2 Shaq/Kobe, 1987 Finals CBS broadcast, 1985 Finals classic intro
  - [x] JSON validated, no duplicates vs live channels.ts

- [x] **Phase 21: Candidate file fulfillment — Batch D (Inside the NBA Classics + March Madness TV)**
  - [x] `data/intake/inside-the-nba-classics-candidates.json` — 7 verified YouTube candidates (Q82–Q90)
    - 30 min classic Inside the NBA compilation, Shaq/Chuck 8 min argument, Best heated moments, Funniest moments, Barkley roasts Lakers, Coaching debate, Studio J debate
  - [x] `data/intake/march-madness-tv-candidates.json` — 7 verified YouTube candidates (Q85–Q90)
    - 1985 Villanova/Georgetown full game, 1992 Duke/Kentucky Laettner full game, Greatest upsets ever, 1983 NC State/Houston championship, Christian Laettner The Shot, Lorenzo Charles dunk 1983, Best clutch shots 2021-2024
  - [x] JSON validated, no duplicates vs live channels.ts

- [x] **Phase 22: Candidate file fulfillment — Batch E (Patriots Dynasty + College Football Chaos)**
  - [x] `data/intake/patriots-dynasty-candidates.json` — 7 verified YouTube candidates (Q83–Q92)
    - SB XXXVI Dynasty Begins (NFL Films), SB XLIX Brady/Belichick, SB LI Comeback (NFL Turning Point), Brady's Final Drive 2002, Greatest Comeback doc recap, 6th Super Bowl doc recap, Randy Moss era doc recap
  - [x] `data/intake/college-football-chaos-candidates.json` — 6 verified YouTube candidates (Q85–Q92)
    - The Play (Cal vs Stanford 1982), Kick Six (Auburn vs Alabama 2013), Doug Flutie Hail Mary (BC vs Miami 1984), App State vs Michigan 2007 (FOX CFB Classics), Greatest Hail Mary TDs CFB history, Greatest Hail Marys compilation
  - [x] JSON validated, no duplicates vs live channels.ts

- [x] **Phase 23: Candidate file fulfillment — Batch F (Tiger Sundays Expansion + Random Sports Compilations)**
  - [x] `data/intake/tiger-sundays-expansion-candidates.json` — 7 verified YouTube candidates (Q86–Q93)
    - 2000 US Open Pebble Beach (USGA), 2000 British Open St Andrews (The Open official film), 2000 US Open full broadcast, 2019 Masters Sunday doc, 2019 Masters final round highlights, 2019 Masters final hole, 2000 St Andrews retrospective (Golf Channel)
  - [x] `data/intake/random-sports-compilations-candidates.json` — 7 verified YouTube candidates (Q83–Q88)
    - Top 30 Iconic Moments, Most ICONIC Sporting Moments Ever (multi-sport), 10 Moments That Will Never Happen Again, Top 20 Iconic Moments, Greatest Olympic Moments Ever, 30 Iconic Winter Olympic Moments, Greatest Sports Moments All Time
  - [x] JSON validated, no duplicates vs live channels.ts or cross-channel

- [x] **Phase 24: Import all candidate files into live data/channels.ts**
  - [x] Ran `content:import-videos` for all 12 candidate files
  - [x] 83 videos added, 0 skipped, 0 rejected invalid
  - [x] All 12 priority channels now have 9–10 videos each (up from 3 each)
  - [x] Original 6 MVP channels untouched
  - [x] `npm run build` passes clean — 22 static pages generated

- [x] **Phase 25: MVP channel fulfillment — all 6 original channels stocked**
  - [x] `data/intake/kobe-tv-candidates.json` — 4 verified candidates: GREATEST Kobe highlight reel, TOP 40 plays, RARE highlights, King of Isolation
  - [x] `data/intake/nba-2000s-candidates.json` — 5 verified candidates: 10 min nostalgic 2000s, Early 2000s All-Star peaks, 2000s hits different, Allen Iverson GREATEST reel, AI 44pts Game 7 classic
  - [x] `data/intake/nfl-big-hits-candidates.json` — 6 verified candidates: 6 fan-uploaded hits compilations (NFL official blocks embedding)
  - [x] `data/intake/boston-classics-candidates.json` — 8 verified candidates: 2004 World Series Games 1–4 highlights + champion celebration
  - [x] `data/intake/tiger-sundays-candidates.json` — 5 verified candidates: 1997 Masters record win, Masters iconic shot, chip-in 16 (two versions), 2000 season full story
  - [x] `data/intake/florida-gators-tv-candidates.json` — 6 verified candidates: Definitive Tebow reel, 2008 national championship game-winner, ultimate highlight, full championship run, general highlights, championship rewind
  - [x] Imported all 6 batches (32 net new videos; 2 duplicates skipped)
  - [x] All 18 channels now have 10–15 videos; total = 213 verified videos
  - [x] `npm run build` passes clean — 22 static pages generated
  - [x] Harvest scripts wired to `package.json`: `content:harvest-playlist`, `content:harvest-reddit`

- [x] **Phase 26: Channel art architecture documented**
  - [x] Verified `lib/types.ts`, `lib/channelArt.ts`, homepage guide rows, preview monitor, profile card, logo swap point, and channel data flow
  - [x] Added `CHANNEL_ART_SYSTEM.md` with supported fields, fallback behavior, asset package conventions, row/card formats, customization rules, art dimensions, and future-agent checklist
  - [x] Added typed pass-through support for future `profileBackgroundUrl` and `textureUrl` channel art fields

- [x] **Phase 27: Channel art production workflow**
  - [x] Added `CHANNEL_ART_PRODUCTION_WORKFLOW.md` for prompt, generation, import, wiring, test, and iteration workflow
  - [x] Expanded structured prompt data so every live channel gets `row-bg`, `profile-bg`, and `logo-spin` prompts
  - [x] Added quick import/list scripts for Desktop/Downloads channel art assets
  - [x] Documented rotating collectible logo strategy and added future `logoSpinUrl` support

- [x] **Phase 28: Channel asset ideation and prompt bible**
  - [x] Added `CHANNEL_ASSET_IDEATION_FRAMEWORK.md` to decode channel identity into repeatable concept routes
  - [x] Added `CHANNEL_ASSET_PROMPT_BIBLE.md` for the first 15 priority channels and all five asset types
  - [x] Expanded `data/channelArtPrompts.ts` to structured prompt data for `row-bg`, `profile-bg`, `logo`, `badge`, and `logo-spin`
  - [x] Updated asset folder docs to include `badge.png` and the rotating collectible logo strategy

- [x] **Phase 29: OpenAI channel art generation script**
  - [x] `scripts/generate-channel-art.ts` added — reads prompts from `data/channelArtPrompts.ts`, calls `gpt-image-1`, writes asset directly to `public/channel-art/{slug}/`
  - [x] `art:generate` npm script added with `NODE_PATH` fix for module resolution from `/tmp` output dir
  - [x] Supports `--dry-run` (no API call), `--force` (overwrite), `--provider` (default openai)
  - [x] Auto-loads `OPENAI_API_KEY` from `.env.local` if present; fails with clear error if missing
  - [x] Uses `gpt-image-1` with nearest supported size per asset type (documented aspect ratio delta)
  - [x] `logo-spin` assets use `output_format: "webp"` automatically
  - [x] Updated `CHANNEL_ART_MASTER_PRODUCTION_DOC.md`, `CHANNEL_ART_PRODUCTION_WORKFLOW.md`, `public/channel-art/_README.md` with script documentation
  - [x] `npm run lint` and `npm run build` pass clean

- [x] **Phase 30: High-resonance expansion queue + superstar channel build plans**
  - [x] `CHANNEL_EXPANSION_PLAN.md` expanded with High-Resonance Expansion Queue section (CH 101–112)
  - [x] Status table added — identifies which user-requested channels are already live vs in-roadmap vs new
  - [x] 12 new channel entries added to `data/channelRoadmap.ts` (CH 101–112): Megatron TV, Lamar Jackson TV, Brady Channel, Prime Time TV, Vick Experience, Beast Mode TV, Ray Lewis Channel, Stone Cold TV, The Rock Channel, DX/Monday Night Wars, Undertaker Streak TV, WCW Nitro Channel
  - [x] D-Rose TV priority bumped from "later" to "next" in `data/channelRoadmap.ts`
  - [x] Top 10 recommended next-build order documented in `CHANNEL_EXPANSION_PLAN.md`
  - [x] `data/channel-plans/d-rose-tv.md` — full channel plan: identity, visual anchors, row-bg art direction, starter video themes, search phrases, avoid list, MVP and strong-channel checklists
  - [x] `data/channel-plans/megatron-tv.md` — full channel plan (same format)
  - [x] `data/channel-plans/lamar-jackson-tv.md` — full channel plan with active-player embeddability note
  - [x] `data/intake/d-rose-tv-candidates.json` — scaffolded, `videos: []`, search themes included, awaiting research
  - [x] `data/intake/megatron-tv-candidates.json` — scaffolded, `videos: []`, search themes included, awaiting research
  - [x] `data/intake/lamar-jackson-tv-candidates.json` — scaffolded, `videos: []`, active-player embedding warning included
  - [x] `data/channelArtPrompts.ts` — row-bg-focused blueprints added for d-rose-tv (CH 75), megatron-tv (CH 76), lamar-jackson-tv (CH 77) with full locked art direction prompts
  - [x] No live channel data changed, no images generated, no UI changes

- [x] **Phase 31: Replace blocked NFL channel videos**
  - [x] Audited all NFL-themed channels for videos from NFL official and team official YouTube channels (which block external iframe embedding)
  - [x] Verified 38 blocked IDs across 18 channels using oEmbed author_name checks
  - [x] Replaced all 38 with verified fan channels and NFL Throwback content that allows iframe embedding
  - [x] Channels fixed: nfl-big-hits, super-bowl-channel, patriots-dynasty, steelers-classics, nfl-90s-smashmouth, peyton-manning-theater, nfl-classics-vault, brett-favre-packers, dan-marino-tv, randy-moss-channel, jim-brown-legacy, lt-giants-defense, lamar-jackson-tv, brady-channel, randy-moss-tv, vick-experience, beast-mode-tv, prime-time-tv
  - [x] Added NFL embed warning section to `CONTENT_RESEARCH_GUIDE.md`
  - [x] `npm run build` passes clean

- [x] **Phase 32: Spotify soundtrack mode design**
  - [x] `SPOTIFY_SOUNDTRACK_MODE.md` created — full product + technical design doc
  - [x] Compared all four approaches: managed playlists, user-provided URLs, Spotify SDK, hybrid
  - [x] Recommended MVP: managed sport/category playlists via Spotify iframe embed (no auth)
  - [x] Designed 8 soundtrack categories with channel inheritance examples
  - [x] Proposed `data/soundtracks.ts` types and `SoundtrackPreset` shape
  - [x] Designed `getSoundtrackForChannel()` resolver with sport/category inference and fallback chain
  - [x] Designed player UI (audio toggle, embed panel, autoplay note, channel-switch behavior)
  - [x] Designed optional homepage badges
  - [x] Documented key limitations (autoplay, Spotify Free ads, private playlist restriction)
  - [x] 7-phase implementation plan from data layer through optional SDK
  - [x] QA checklist and 10 open questions documented
  - [x] No code, UI, or player changes made

## In Progress
- [ ] —

## Up Next
- [ ] Decide open questions from `SPOTIFY_SOUNDTRACK_MODE.md` (playlists, panel placement, persistence)
- [ ] Research and fulfill candidate intake files for D-Rose TV, Megatron TV, Lamar Jackson TV
- [ ] Manual browser QA of video playback (especially new MVP channels)
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
| 2026-05-27 | Homepage preview uses muted YouTube iframe | Makes hover preview feel like a live TV monitor while staying within official YouTube embeds |
| 2026-05-27 | Stage 1 content pipeline remains local and pure | Enables deeper channel curation without adding database, auth, admin, or API dependencies yet |
| 2026-05-28 | Add-video CLI writes to local channel data | Gives curation a safer path than hand-editing `data/channels.ts` while keeping the MVP database-free |
| 2026-05-28 | Bulk intake uses local JSON files | Makes larger channel curation reviewable and repeatable before introducing API/database workflows |
| 2026-05-28 | Candidate files are research staging only | Keeps future discovery work reviewable before any video is promoted into live channel data |
| 2026-05-28 | 100-channel plan stays documentation-only | Gives future channel expansion a content map without changing MVP runtime data or UI |
| 2026-05-28 | Channel roadmap is typed but not live data | Future agents can plan and research from `data/channelRoadmap.ts` without changing the homepage channel list |
| 2026-05-28 | First live expansion batch starts at CH 07 | Preserves the original 6-channel MVP while proving roadmap channels can be promoted gradually |
| 2026-05-28 | Channel art resolves through `lib/channelArt.ts` | Keeps custom guide rectangles and profile cards data-driven without one-off component designs |
| 2026-05-28 | OpenAI image generation is primary for production art | Better for repeatable custom assets, controlled edits, exact crops, and fast iteration; Midjourney remains useful for concepts |
| 2026-05-28 | Asset ideation is split from prompt output | The framework doc teaches route generation, while the prompt bible and structured data hold the production prompts |
| 2026-05-29 | NFL official and team channels block iframe embeds | oEmbed 200 does not guarantee playback; all NFL/team-official starters replaced with fan channels and NFL Throwback |
| 2026-05-29 | Soundtrack MVP = managed playlists + Spotify iframe | No auth, no SDK, zero friction; curated playlists match the cable-channel product identity |
| 2026-05-29 | Spotify Web Playback SDK deferred indefinitely | Premium-only, requires OAuth/backend, overkill for ambient background music use case |

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

## Status: Phase 32 Complete — NFL Embed Fix + Spotify Soundtrack Mode Designed

*Last updated: 2026-05-29*
