# Channel Asset Prompt Bible

This is the production prompt reference for the first 15 priority channels.

Use this with the framework in `CHANNEL_ASSET_IDEATION_FRAMEWORK.md` and the structured data in `data/channelArtPrompts.ts`.

The actual prompt strings live in the data file. This document keeps the creative direction readable and channel-specific so the art pipeline can move fast.

For every asset below:

- OpenAI is the production prompt path.
- Midjourney can use the same direction plus the aspect ratio suffix.
- React still renders the real text, numbers, badges, and CTAs.

## 1. Kobe TV

Identity summary: Black-mamba legacy channel with ring-count prestige and ruthless scoring theater.

Visual anchors: purple and gold hardwood, #24 jersey collectible, arena tunnel lights, championship ring glow, late-2000s Lakers energy.

Concept routes:

1. Mamba Hardwood Legend - premium Lakers dynasty mood with hardwood and trophy-room glow.
2. Tunnel Light Pursuit - darker, more cinematic, focused on entry tunnel drama and spotlight energy.
3. Ring Room Archive - more collectible, more museum-like, with championship hardware and legacy textures.

Recommended route: Mamba Hardwood Legend.

Prompt pack:

- `row-bg` -> `public/channel-art/kobe-tv/row-bg.png`
  - OpenAI: purple-gold hardwood legend banner with arena tunnel lights, jersey mesh, and championship aura.
  - Midjourney: same direction + `--ar 5:1`
  - Safe zone: left and center text-safe; push detail right.
- `profile-bg` -> `public/channel-art/kobe-tv/profile-bg.png`
  - OpenAI: vertical purple-gold legend card with spotlight haze, hardwood sheen, and trophy glow.
  - Midjourney: same direction + `--ar 3:4`
  - Safe zone: keep title and metadata areas calm.
- `logo` -> `public/channel-art/kobe-tv/logo.png`
  - OpenAI: static collectible icon based on a #24 jersey silhouette, metallic purple and gold, premium basketball emblem.
  - Midjourney: same direction + `--ar 1:1`
  - Safe zone: centered silhouette, readable at small size.
- `badge` -> `public/channel-art/kobe-tv/badge.png`
  - OpenAI: collectible championship badge with black-mamba energy, ring-seal shape, and sports-card unlock feel.
  - Midjourney: same direction + `--ar 1:1`
  - Safe zone: centered sticker-like collectible.
- `logo-spin` -> `public/channel-art/kobe-tv/logo-spin.webp`
  - OpenAI: rotating #24 jersey collectible with premium game-item energy, folded fabric, and chrome hanger loop.
  - Midjourney: same direction + `--ar 1:1`
  - Safe zone: centered collectible that still reads as a jersey at small size.

## 2. NBA 2000s

Identity summary: The baggy-shorts, chrome-graphics, streetball-era NBA highlight capsule.

Visual anchors: chrome basketball graphics, red-white-blue broadcast bars, baggy-shorts era silhouettes, streetball textures, old sports broadcast graphics.

Concept routes:

1. Chrome 2000s Broadcast - most ESPN-like, glossy, and immediately readable.
2. Streetball Montage Grid - rougher, more urban, more mixtape energy.
3. Finals Countdown Package - cleaner, trophy-leaning, more championship-adjacent.

Recommended route: Chrome 2000s Broadcast.

Prompt pack:

- `row-bg` -> `public/channel-art/nba-2000s/row-bg.png`
  - OpenAI: chrome basketball graphics with red-white-blue broadcast bars, baggy-shorts era motion, and old highlight-show texture.
  - Midjourney: same direction + `--ar 5:1`
  - Safe zone: left and center text-safe; keep the center lower-detail.
- `profile-bg` -> `public/channel-art/nba-2000s/profile-bg.png`
  - OpenAI: retro basketball profile panel with chrome edges, CRT glow, and early-2000s arena nostalgia.
  - Midjourney: same direction + `--ar 3:4`
  - Safe zone: calm upper-left behind card copy.
- `logo` -> `public/channel-art/nba-2000s/logo.png`
  - OpenAI: static icon built from a chrome basketball badge, red and blue energy arcs, and a throwback broadcast feel.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/nba-2000s/badge.png`
  - OpenAI: collectible badge shaped like a chrome highlight emblem, old-school TV gloss, and early-2000s attitude.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/nba-2000s/logo-spin.webp`
  - OpenAI: rotating throwback basketball collectible with chrome shine, red and blue streaks, and era-authentic swagger.
  - Midjourney: same direction + `--ar 1:1`

## 3. NFL Big Hits

Identity summary: Football collision theater built around impact, turf, and thundering defensive energy.

Visual anchors: dark turf, white chalk marks, steel collision bursts, stadium lights, rugged broadcast graphics.

Concept routes:

1. Impact Field Package - most brutal and direct.
2. Sideline Shockwave - more motion-heavy, more sideline smoke and dust.
3. Steel Defensive Archive - colder, more highlight-reel, more history-channel in tone.

Recommended route: Impact Field Package.

Prompt pack:

- `row-bg` -> `public/channel-art/nfl-big-hits/row-bg.png`
  - OpenAI: dark turf broadcast banner with chalk marks, steel collision bursts, and violent highlight energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/nfl-big-hits/profile-bg.png`
  - OpenAI: football profile panel with scuffed turf, impact shockwaves, and hard-edged stadium lighting.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/nfl-big-hits/logo.png`
  - OpenAI: static icon built from a collision-ready football shield, rugged steel edges, and defensive energy.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/nfl-big-hits/badge.png`
  - OpenAI: collectible badge with hard-hit energy, gritty turf texture, and a steel-medal shape.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/nfl-big-hits/logo-spin.webp`
  - OpenAI: rotating scuffed football collectible with impact scars, arena-light glint, and collision swagger.
  - Midjourney: same direction + `--ar 1:1`

## 4. Florida Gators TV

Identity summary: SEC broadcast heat wrapped in swamp texture, stadium lights, and college title-game energy.

Visual anchors: orange and royal blue, swamp texture, stadium night lights, wet grass, SEC broadcast energy.

Concept routes:

1. Swamp SEC Night Game - most on-brand and easiest to read.
2. Gator Bowl Glow - more polished, more stadium-and-helmets than swamp.
3. Campus Heat Package - more local feed and college broadcast desk flavor.

Recommended route: Swamp SEC Night Game.

Prompt pack:

- `row-bg` -> `public/channel-art/florida-gators-tv/row-bg.png`
  - OpenAI: orange and royal blue swamp banner with wet grass, stadium lights, and humid SEC night-game energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/florida-gators-tv/profile-bg.png`
  - OpenAI: college football profile panel with swamp mist, orange-blue glow, and campus broadcast polish.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/florida-gators-tv/logo.png`
  - OpenAI: static icon inspired by a Gators helmet silhouette and swamp-football energy, bold and readable.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/florida-gators-tv/badge.png`
  - OpenAI: collectible badge with swamp heat, college-football swagger, and a helmet-shaped emblem feel.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/florida-gators-tv/logo-spin.webp`
  - OpenAI: rotating football collectible with orange-blue armor, swamp-energy accents, and college-title-game presence.
  - Midjourney: same direction + `--ar 1:1`

## 5. Tiger Sundays

Identity summary: Sunday-red golf authority with major-championship calm and final-round inevitability.

Visual anchors: bird's-eye golf hole, Sunday red, tiger-striped golf ball, green jacket mood, golden tee.

Concept routes:

1. Birdseye Sunday Red - the strongest and most specific read.
2. Green Jacket Finals - more premium and museum-like.
3. Precision Fairway Archive - more understated, more course-detail driven.

Recommended route: Birdseye Sunday Red.

Prompt pack:

- `row-bg` -> `public/channel-art/tiger-sundays/row-bg.png`
  - OpenAI: bird's-eye view of a pristine golf hole with Sunday red accents, green fairway stripes, and calm championship sunlight.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/tiger-sundays/profile-bg.png`
  - OpenAI: premium golf profile panel with fairway texture, soft red glow, and major-championship atmosphere.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/tiger-sundays/logo.png`
  - OpenAI: static icon built from a tiger-striped golf ball, golden tee, and red-polo golf energy.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/tiger-sundays/badge.png`
  - OpenAI: collectible badge inspired by a green-jacket emblem, golf flag silhouette, and tiger-energy detail.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/tiger-sundays/logo-spin.webp`
  - OpenAI: rotating tiger-striped golf ball collectible with a golden tee, red accent ribbon, and calm premium finish.
  - Midjourney: same direction + `--ar 1:1`

## 6. Jordan TV

Identity summary: Michael Jordan as a myth machine: Finals daggers, dunk flights, and icon-level pressure.

Visual anchors: red black white palette, championship spotlight, Bulls-era hardwood, dunk-contest flight, Finals dagger energy.

Concept routes:

1. Air Jordan Myth Package - strongest mythic read.
2. Finals Dagger Theater - more clutch and dramatic.
3. Flight Path Archive - more airborne and iconic in silhouette.

Recommended route: Air Jordan Myth Package.

Prompt pack:

- `row-bg` -> `public/channel-art/jordan-tv/row-bg.png`
  - OpenAI: red-black-white basketball legend banner with championship spotlight, hardwood sheen, and flight-path motion.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/jordan-tv/profile-bg.png`
  - OpenAI: mythic basketball profile panel with deep red glow, hardwood reflection, and trophy-room drama.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/jordan-tv/logo.png`
  - OpenAI: static icon inspired by a red-and-black #23 jersey relic, premium basketball emblem, and championship aura.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/jordan-tv/badge.png`
  - OpenAI: collectible badge with mythic Finals energy, crown-like shape, and classic dynasty polish.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/jordan-tv/logo-spin.webp`
  - OpenAI: rotating red-and-black #23 jersey collectible with airborne motion, premium fabric, and game-winning swagger.
  - Midjourney: same direction + `--ar 1:1`

## 7. Bulls MJ Era

Identity summary: The 1990s Bulls dynasty: banners, rivalries, six rings, and old-arena authority.

Visual anchors: 1990s championship banners, red black white hardwood, old arena rafters, Jordan-Pippen-Rodman energy, Finals rivalry drama.

Concept routes:

1. Dynasty Banner Room - the clearest franchise history package.
2. Last-Dance Control Room - more documentary, more archival.
3. Six-Ring Corridor - more trophy-room and banner-centric.

Recommended route: Dynasty Banner Room.

Prompt pack:

- `row-bg` -> `public/channel-art/bulls-mj-era/row-bg.png`
  - OpenAI: 1990s championship banner room with red-black-white hardwood, old-arena rafters, and dynasty tension.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/bulls-mj-era/profile-bg.png`
  - OpenAI: Bulls dynasty profile panel with hanging banners, spotlight haze, and old championship polish.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/bulls-mj-era/logo.png`
  - OpenAI: static icon inspired by a Bulls-dynasty crest, red and black authority, and six-ring legacy.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/bulls-mj-era/badge.png`
  - OpenAI: collectible badge with dynasty-banner geometry, old-arena polish, and championship seal energy.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/bulls-mj-era/logo-spin.webp`
  - OpenAI: rotating dynasty-ring collectible with Bulls red, black trim, and a trophy-room finish.
  - Midjourney: same direction + `--ar 1:1`

## 8. Mike Tyson TV

Identity summary: VHS heavyweight menace: knockout power, ring walks, smoke, and fight-night threat.

Visual anchors: boxing gloves, ring ropes, black/gold/red fight-poster energy, championship belt, smoky arena.

Concept routes:

1. Fight Night Menace - strongest and most immediate.
2. Knockout Poster Archive - more vintage and VHS-like.
3. Heavyweight Belt Room - more collectible and trophy-forward.

Recommended route: Fight Night Menace.

Prompt pack:

- `row-bg` -> `public/channel-art/mike-tyson-tv/row-bg.png`
  - OpenAI: black-gold-red fight-poster banner with ring ropes, smoky canvas, and heavyweight menace.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/mike-tyson-tv/profile-bg.png`
  - OpenAI: boxing profile panel with red-corner glow, canvas texture, and title-fight intensity.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/mike-tyson-tv/logo.png`
  - OpenAI: static icon built from a boxing glove silhouette, gold trim, and heavyweight fight-poster energy.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/mike-tyson-tv/badge.png`
  - OpenAI: collectible badge inspired by a championship belt plate, black-gold menace, and fight-night shine.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/mike-tyson-tv/logo-spin.webp`
  - OpenAI: rotating boxing glove collectible with belt-metal accents, smoky highlights, and knockout authority.
  - Midjourney: same direction + `--ar 1:1`

## 9. Inside the NBA Classics

Identity summary: A cozy late-night TNT desk feed built on jokes, arguments, monitor walls, and playoff comfort TV.

Visual anchors: studio desk, monitor wall, blue and orange broadcast lights, stat sheets, late-night desk chaos.

Concept routes:

1. Late-Night Desk Replay - the clearest studio identity.
2. Monitor Wall Roast Room - more chaotic and more graphic.
3. Postgame Comfort TV - softer, more replay-heavy, more desk-show warmth.

Recommended route: Late-Night Desk Replay.

Prompt pack:

- `row-bg` -> `public/channel-art/inside-the-nba-classics/row-bg.png`
  - OpenAI: studio desk banner with monitor wall, blue-orange broadcast lights, stat sheets, and late-night desk energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/inside-the-nba-classics/profile-bg.png`
  - OpenAI: studio profile panel with CRT monitor wall, desk reflections, and comfortable late-night glow.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/inside-the-nba-classics/logo.png`
  - OpenAI: static icon inspired by a studio monitor badge, blue-orange broadcast lights, and desk-show charm.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/inside-the-nba-classics/badge.png`
  - OpenAI: collectible badge shaped like a studio replay emblem, monitor-wall texture, and TNT-era comfort.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/inside-the-nba-classics/logo-spin.webp`
  - OpenAI: rotating microphone-and-monitor collectible with desk-show polish, studio chrome, and late-night energy.
  - Midjourney: same direction + `--ar 1:1`

## 10. SportsCenter Classics

Identity summary: ESPN highlight-news nostalgia: newsroom desk rhythm, CRT glow, and classic countdown energy.

Visual anchors: newsroom desk, CRT monitors, highlight wall, red and blue broadcast package, web-gem energy.

Concept routes:

1. Top Ten Newsroom - the most obvious SportsCenter read.
2. Archive Countdown Desk - more nostalgic and broadcast-heavy.
3. Web-Gem Wall - more playful and montage-driven.

Recommended route: Top Ten Newsroom.

Prompt pack:

- `row-bg` -> `public/channel-art/sportscenter-classics/row-bg.png`
  - OpenAI: newsroom desk banner with CRT monitors, highlight wall, red-blue broadcast package, and classic countdown energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/sportscenter-classics/profile-bg.png`
  - OpenAI: SportsCenter profile panel with newsroom gloss, monitor glow, and archive-highlight nostalgia.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/sportscenter-classics/logo.png`
  - OpenAI: static icon built from a red-blue highlight badge, newsroom energy, and classic ESPN rhythm.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/sportscenter-classics/badge.png`
  - OpenAI: collectible badge shaped like a top-ten replay seal, CRT glow, and SportsCenter nostalgia.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/sportscenter-classics/logo-spin.webp`
  - OpenAI: rotating highlight-reel collectible with newsroom chrome, red-blue energy, and archive broadcast swagger.
  - Midjourney: same direction + `--ar 1:1`

## 11. Super Bowl Channel

Identity summary: The NFL's biggest stage: comebacks, confetti, trophy gold, and championship chaos.

Visual anchors: stadium lights, confetti, aerial field geometry, trophy-gold atmosphere, big-game broadcast polish.

Concept routes:

1. Big Stage Trophy Glow - the most iconic and premium route.
2. Confetti Comeback Room - more celebratory and play-by-play heavy.
3. Championship Aerial View - more field geometry and broadcast scale.

Recommended route: Big Stage Trophy Glow.

Prompt pack:

- `row-bg` -> `public/channel-art/super-bowl-channel/row-bg.png`
  - OpenAI: stadium-light banner with confetti burst, aerial field geometry, and trophy-gold big-game atmosphere.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/super-bowl-channel/profile-bg.png`
  - OpenAI: Super Bowl profile panel with gold glow, field-diagram geometry, and championship scale.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/super-bowl-channel/logo.png`
  - OpenAI: static icon inspired by a trophy-gold stage emblem, championship energy, and big-game polish.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/super-bowl-channel/badge.png`
  - OpenAI: collectible badge with confetti edges, trophy-room shine, and championship-stage authority.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/super-bowl-channel/logo-spin.webp`
  - OpenAI: rotating football collectible with gold trophy treatment, stadium-light gleam, and title-game presence.
  - Midjourney: same direction + `--ar 1:1`

## 12. NBA Finals Channel

Identity summary: Championship basketball history: Game 7 pressure, gold banners, and legacy-defining moments.

Visual anchors: trophy-room glow, game-seven court lines, gold banners, championship broadcast polish, finals drama.

Concept routes:

1. Championship Trophy Room - the clearest Finals identity.
2. Game Seven Hallway - more pressure-driven and dramatic.
3. Gold Banner Archive - more legacy-heavy and museum-like.

Recommended route: Championship Trophy Room.

Prompt pack:

- `row-bg` -> `public/channel-art/nba-finals-channel/row-bg.png`
  - OpenAI: trophy-room banner with gold banners, game-seven court lines, and championship broadcast polish.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/nba-finals-channel/profile-bg.png`
  - OpenAI: Finals profile panel with gold glow, trophy-room depth, and legacy-board atmosphere.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/nba-finals-channel/logo.png`
  - OpenAI: static icon inspired by a championship seal, gold trim, and Finals-history prestige.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/nba-finals-channel/badge.png`
  - OpenAI: collectible badge with trophy-room geometry, championship shine, and legacy energy.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/nba-finals-channel/logo-spin.webp`
  - OpenAI: rotating championship trophy collectible with gold trim, court-line detailing, and legacy authority.
  - Midjourney: same direction + `--ar 1:1`

## 13. March Madness TV

Identity summary: Tournament chaos: buzzer beaters, Cinderellas, and the emotional whiplash of March.

Visual anchors: bracket graphics, hardwood chaos, buzzer-beater energy, NCAA tournament boards, Cinderella pressure.

Concept routes:

1. Bracket Chaos Court - the strongest tournament read.
2. Upset Machine - more underdog and upset-centric.
3. Buzzer-Beat Hall - more dramatic and game-ending focused.

Recommended route: Bracket Chaos Court.

Prompt pack:

- `row-bg` -> `public/channel-art/march-madness-tv/row-bg.png`
  - OpenAI: bracket-chaos banner with hardwood motion, tournament boards, and buzzer-beater energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/march-madness-tv/profile-bg.png`
  - OpenAI: March profile panel with bracket fragments, arena tension, and postseason pressure.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/march-madness-tv/logo.png`
  - OpenAI: static icon inspired by a tournament-bracket emblem, collegiate urgency, and hardwood energy.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/march-madness-tv/badge.png`
  - OpenAI: collectible badge shaped like a bracket seal, Cinderella drama, and tournament countdown energy.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/march-madness-tv/logo-spin.webp`
  - OpenAI: rotating college-basketball collectible with bracket geometry, buzzer-light streaks, and upset swagger.
  - Midjourney: same direction + `--ar 1:1`

## 14. Patriots Dynasty

Identity summary: Brady, Belichick, comeback drives, and the cold machinery of New England football.

Visual anchors: cold blue-gray Foxboro atmosphere, playbook grids, Super Bowl rings, comeback calm, methodical drive lines.

Concept routes:

1. Foxboro Blueprint - the clearest identity.
2. Ring Machine - more hardware-forward and disciplined.
3. Winter Comeback Room - colder, more dramatic, more drive-by-drive.

Recommended route: Foxboro Blueprint.

Prompt pack:

- `row-bg` -> `public/channel-art/patriots-dynasty/row-bg.png`
  - OpenAI: cold blue-gray banner with playbook grids, comeback drive lines, and Foxboro discipline.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/patriots-dynasty/profile-bg.png`
  - OpenAI: Patriots profile panel with stadium-cold atmosphere, ring-room glow, and methodical polish.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/patriots-dynasty/logo.png`
  - OpenAI: static icon inspired by a New England dynasty crest, cold blue authority, and disciplined football design.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/patriots-dynasty/badge.png`
  - OpenAI: collectible badge with ring-room precision, playbook geometry, and dynasty-blue shine.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/patriots-dynasty/logo-spin.webp`
  - OpenAI: rotating football collectible with cold-weather steel, ring-metal accents, and comeback discipline.
  - Midjourney: same direction + `--ar 1:1`

## 15. Random Sports Compilations

Identity summary: The wildcard sports-bar shuffle: catches, dunks, goals, hits, and impossible moments.

Visual anchors: mixed-sport collage, CRT scanlines, remote-shuffle tape labels, sports-bar-at-night mood, highlight-pile energy.

Concept routes:

1. Remote Shuffle Collage - the strongest wildcard read.
2. Highlight Tape Wall - more archive and tape-label driven.
3. Sports-Bar Static Storm - more ambient and chaotic.

Recommended route: Remote Shuffle Collage.

Prompt pack:

- `row-bg` -> `public/channel-art/random-sports-compilations/row-bg.png`
  - OpenAI: mixed-sport collage banner with CRT scanlines, remote-shuffle tape labels, and sports-bar-night energy.
  - Midjourney: same direction + `--ar 5:1`
- `profile-bg` -> `public/channel-art/random-sports-compilations/profile-bg.png`
  - OpenAI: compilation profile panel with archive tape texture, multi-sport collage fragments, and TV-static glow.
  - Midjourney: same direction + `--ar 3:4`
- `logo` -> `public/channel-art/random-sports-compilations/logo.png`
  - OpenAI: static icon inspired by a remote-shuffle highlight badge, mixed-sport collage, and tape-label nostalgia.
  - Midjourney: same direction + `--ar 1:1`
- `badge` -> `public/channel-art/random-sports-compilations/badge.png`
  - OpenAI: collectible badge with archive-tape edges, highlight-pile energy, and wildcard sports-bar flavor.
  - Midjourney: same direction + `--ar 1:1`
- `logo-spin` -> `public/channel-art/random-sports-compilations/logo-spin.webp`
  - OpenAI: rotating mixed-sport collectible with collage fragments, tape-label charm, and remote-shuffle chaos.
  - Midjourney: same direction + `--ar 1:1`

