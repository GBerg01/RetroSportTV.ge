# Channel Asset Prompt Bible

This is the production prompt reference for the first 15 priority channels.

Use this with the framework in `CHANNEL_ASSET_IDEATION_FRAMEWORK.md` and the structured data in `data/channelArtPrompts.ts`.

The actual full prompt strings live in `CHANNEL_ART_MASTER_PRODUCTION_DOC.md` Section 7. This document keeps the creative direction readable and channel-specific so the art pipeline can move fast.

For every asset below:

- OpenAI is the production prompt path.
- Midjourney can use the same direction plus the aspect ratio and `--style raw` flags.
- React still renders the real text, numbers, badges, and CTAs.
- For the full Midjourney generation workflow including the 4-option grid warning, see `CHANNEL_ART_MASTER_PRODUCTION_DOC.md` Section 5.

**Core style for every channel:** retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel.

## 1. Kobe TV

Identity summary: Black-mamba legacy channel with ring-count prestige and ruthless scoring theater.

Visual anchors: purple and gold hardwood, jersey collectible, arena tunnel lights, championship ring glow, late-2000s Lakers energy.

Concept routes:

1. Mamba Hardwood Legend — bold purple-gold NBA Jam-style legend panel, arcade player-select energy.
2. Tunnel Light Pursuit — darker, more dramatic spotlight cone energy, boxing-out-of-the-tunnel.
3. Ring Room Archive — collectible-forward, championship-hardware-focused, trophy-room arcade.

Recommended route: Mamba Hardwood Legend.

Prompt pack:

- `row-bg` -> `public/channel-art/kobe-tv/row-bg.png`
  - OpenAI: bold purple and gold NBA Jam-style hardwood legend panel, arena spotlight cones, jersey mesh overlay, championship ring glow, arcade sports menu composition.
  - Midjourney: same direction + `--ar 5:1 --style raw`
  - Safe zone: left and center dark and minimal for text; push visual weight right.
- `profile-bg` -> `public/channel-art/kobe-tv/profile-bg.png`
  - OpenAI: bold purple and gold arcade player-select card, spotlight cone from above, hardwood floor reflection, trophy glow, NBA Jam character-select energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
  - Safe zone: upper area dark and calm for card copy.
- `logo` -> `public/channel-art/kobe-tv/logo.png`
  - OpenAI: chunky basketball jersey silhouette, bold purple and gold, arcade sports emblem, character icon energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`
  - Safe zone: centered, reads at small size.
- `badge` -> `public/channel-art/kobe-tv/badge.png`
  - OpenAI: bold championship seal badge, purple and gold metallic relief, ring-seal shape, arcade unlock collectible feel.
  - Midjourney: same direction + `--ar 1:1 --style raw`
  - Safe zone: centered sticker-like collectible.
- `logo-spin` -> `public/channel-art/kobe-tv/logo-spin.webp`
  - OpenAI: rotating basketball jersey collectible, bold purple body gold trim, fabric folds, chrome hanger loop, arcade game-pickup item.
  - Midjourney: same direction + `--ar 1:1 --style raw`
  - Safe zone: centered, reads clearly as a jersey at small size.

## 2. NBA 2000s

Identity summary: The baggy-shorts, chrome-graphics, streetball-era NBA highlight capsule.

Visual anchors: chrome basketball graphics, red-white-blue broadcast bars, baggy-shorts era silhouettes, streetball textures, old sports broadcast graphics.

Concept routes:

1. Chrome 2000s Broadcast — bold red-white-blue chrome arcade panel, 90s ESPN-style energy.
2. Streetball Montage Grid — rougher, more urban, more mixtape-arcade energy.
3. Finals Countdown Package — trophy-leaning, championship arcade color.

Recommended route: Chrome 2000s Broadcast.

Prompt pack:

- `row-bg` -> `public/channel-art/nba-2000s/row-bg.png`
  - OpenAI: bold red-white-blue chrome basketball arcade panel, 90s broadcast bar graphics, baggy-shorts era arcade energy, chunky NBA era motion graphics.
  - Midjourney: same direction + `--ar 5:1 --style raw`
  - Safe zone: left and center minimal for text.
- `profile-bg` -> `public/channel-art/nba-2000s/profile-bg.png`
  - OpenAI: bold red-blue 90s arcade basketball card, chrome edge graphics, early-2000s arcade highlight show energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
  - Safe zone: calm upper-left behind card copy.
- `logo` -> `public/channel-art/nba-2000s/logo.png`
  - OpenAI: chunky chrome basketball badge, bold red and blue arcade energy arcs, throwback 90s sports icon.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/nba-2000s/badge.png`
  - OpenAI: bold chrome highlight badge, arcade seal shape, 90s TV gloss, chunky 2000s sports emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/nba-2000s/logo-spin.webp`
  - OpenAI: rotating throwback basketball collectible, bold chrome shine, red and blue arcade streaks.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 3. NFL Big Hits

Identity summary: Football collision theater built around impact, turf, and thundering defensive energy.

Visual anchors: dark turf, white chalk marks, steel collision bursts, stadium lights, rugged broadcast graphics.

Concept routes:

1. Impact Field Package — NFL Blitz-style arcade impact panel, most direct and brutal.
2. Sideline Shockwave — more motion-heavy, more sideline smoke and arcade dust.
3. Steel Defensive Archive — colder, more highlight-reel, more arcade-history in tone.

Recommended route: Impact Field Package.

Prompt pack:

- `row-bg` -> `public/channel-art/nfl-big-hits/row-bg.png`
  - OpenAI: bold dark turf NFL Blitz-style arcade impact panel, white chalk marks, steel collision burst graphics, chunky stadium light beams.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/nfl-big-hits/profile-bg.png`
  - OpenAI: bold dark football arcade card, scuffed turf texture, steel shockwave graphics, NFL Blitz-style stadium energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/nfl-big-hits/logo.png`
  - OpenAI: chunky football shield icon, bold steel and dark green, defensive collision energy, arcade impact emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/nfl-big-hits/badge.png`
  - OpenAI: bold collision badge, hard-hit shield shape, gritty turf texture, steel-medal chunky arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/nfl-big-hits/logo-spin.webp`
  - OpenAI: rotating scuffed football collectible, bold impact scars, arena-light glint, arcade game-item feel.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 4. Florida Gators TV

Identity summary: SEC broadcast heat wrapped in swamp texture, stadium lights, and college title-game energy.

Visual anchors: orange and royal blue, swamp texture, stadium night lights, wet grass, SEC broadcast energy.

Concept routes:

1. Swamp SEC Night Game — bold orange-blue arcade college panel, most on-brand.
2. Gator Bowl Glow — more stadium and helmet-focused arcade energy.
3. Campus Heat Package — local college-feed arcade flavor.

Recommended route: Swamp SEC Night Game.

Prompt pack:

- `row-bg` -> `public/channel-art/florida-gators-tv/row-bg.png`
  - OpenAI: bold orange and royal blue arcade college football panel, swamp heat glow, humid SEC night energy, chunky campus broadcast graphics.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/florida-gators-tv/profile-bg.png`
  - OpenAI: bold orange-blue arcade college football card, swamp mist glow, campus arcade broadcast energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/florida-gators-tv/logo.png`
  - OpenAI: chunky Gators helmet silhouette, bold orange and blue, arcade college football icon.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/florida-gators-tv/badge.png`
  - OpenAI: bold swamp football badge, helmet-shaped arcade emblem, orange-blue chunky sticker.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/florida-gators-tv/logo-spin.webp`
  - OpenAI: rotating football collectible, bold orange-blue armor, swamp-energy arcade accents.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 5. Tiger Sundays

Identity summary: Sunday-red golf authority with major-championship calm and final-round inevitability.

Visual anchors: bird's-eye golf hole, Sunday red, tiger-striped golf ball, green jacket mood, golden tee.

Concept routes:

1. Birdseye Sunday Red — bird's-eye golf hole, bold red and green, 90s arcade golf game menu energy.
2. Green Jacket Finals — more premium arcade collectible feel.
3. Precision Fairway Archive — more understated, course-detail driven arcade panel.

Recommended route: Birdseye Sunday Red.

Prompt pack:

- `row-bg` -> `public/channel-art/tiger-sundays/row-bg.png`
  - OpenAI: bold Sunday red and deep green bird's-eye golf hole arcade panel, 90s arcade golf game menu energy, chunky fairway stripe graphics.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/tiger-sundays/profile-bg.png`
  - OpenAI: bold red and green golf arcade card, fairway texture, red glow accent, 90s arcade golf energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/tiger-sundays/logo.png`
  - OpenAI: chunky tiger-striped golf ball icon, bold red and green, golden tee, arcade sports collectible.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/tiger-sundays/badge.png`
  - OpenAI: bold golf championship badge, green-jacket-style seal, golf flag silhouette, chunky arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/tiger-sundays/logo-spin.webp`
  - OpenAI: rotating tiger-striped golf ball collectible, bold golden tee, red accent, arcade game-pickup feel.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 6. Jordan TV

Identity summary: Michael Jordan as a myth machine: Finals daggers, dunk flights, and icon-level pressure.

Visual anchors: red-black-white palette, championship spotlight, Bulls-era hardwood, dunk-contest flight, Finals dagger energy.

Concept routes:

1. Air Jordan Myth Package — bold red-black-white NBA Jam-style legend panel, strongest mythic arcade read.
2. Finals Dagger Theater — more clutch and dramatic arcade energy.
3. Flight Path Archive — more airborne silhouette, iconic arcade icon feel.

Recommended route: Air Jordan Myth Package.

Prompt pack:

- `row-bg` -> `public/channel-art/jordan-tv/row-bg.png`
  - OpenAI: bold red-black-white NBA Jam-style basketball legend panel, championship spotlight, Bulls-era hardwood floor, flight-path motion graphics, arcade character energy.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/jordan-tv/profile-bg.png`
  - OpenAI: bold red-black arcade player-select card, deep red glow, hardwood reflection, NBA Jam legend energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/jordan-tv/logo.png`
  - OpenAI: chunky basketball jersey silhouette, bold red and black, arcade character icon, championship emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/jordan-tv/badge.png`
  - OpenAI: bold championship badge, red and black arcade seal, crown-like shape, collectible sports unlock.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/jordan-tv/logo-spin.webp`
  - OpenAI: rotating basketball jersey collectible, bold red and black, airborne arcade energy, game-item feel.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 7. Bulls MJ Era

Identity summary: The 1990s Bulls dynasty: banners, rivalries, six rings, and old-arena authority.

Visual anchors: 1990s championship banners, red-black-white hardwood, old arena rafters, Jordan-Pippen-Rodman energy, Finals rivalry drama.

Concept routes:

1. Dynasty Banner Room — bold red-black arcade dynasty panel, the clearest franchise history package.
2. Last-Dance Control Room — more documentary, more archival arcade energy.
3. Six-Ring Corridor — more trophy-room and banner-centric arcade feel.

Recommended route: Dynasty Banner Room.

Prompt pack:

- `row-bg` -> `public/channel-art/bulls-mj-era/row-bg.png`
  - OpenAI: bold red-black-white dynasty arcade panel, 90s championship banner silhouettes, old arena rafters, NBA Jam-style dynasty energy, chunky banner graphics.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/bulls-mj-era/profile-bg.png`
  - OpenAI: bold red-black arcade dynasty card, hanging banner silhouettes, spotlight haze, old arena championship arcade energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/bulls-mj-era/logo.png`
  - OpenAI: chunky Bulls dynasty crest icon, bold red and black, six-ring arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/bulls-mj-era/badge.png`
  - OpenAI: bold dynasty badge, banner geometry, old arena arcade polish, championship seal chunky emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/bulls-mj-era/logo-spin.webp`
  - OpenAI: rotating championship ring collectible, bold Bulls red, black trim, trophy arcade energy, game-item feel.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 8. Mike Tyson TV

Identity summary: VHS heavyweight menace: knockout power, ring walks, smoke, and fight-night threat.

Visual anchors: boxing gloves, ring ropes, black/gold/red palette, championship belt, smoky arena.

Concept routes:

1. Fight Night Menace — Punch-Out-style arcade fight panel, strongest and most immediate.
2. Knockout Poster Archive — more vintage and VHS-arcade-like.
3. Heavyweight Belt Room — more collectible and trophy-forward arcade energy.

Recommended route: Fight Night Menace.

Prompt pack:

- `row-bg` -> `public/channel-art/mike-tyson-tv/row-bg.png`
  - OpenAI: bold black-gold-red Punch-Out-style arcade fight panel, ring ropes, smoky canvas texture, heavyweight arcade energy, boxing cabinet feel.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/mike-tyson-tv/profile-bg.png`
  - OpenAI: bold black-gold arcade boxing card, red corner glow, canvas texture, title-fight arcade intensity.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/mike-tyson-tv/logo.png`
  - OpenAI: chunky boxing glove silhouette, bold black and gold, arcade combat icon, heavyweight emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/mike-tyson-tv/badge.png`
  - OpenAI: bold championship belt badge, belt-plate shape, black-gold arcade relief, fight-night collectible emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/mike-tyson-tv/logo-spin.webp`
  - OpenAI: rotating boxing glove collectible, bold belt-metal accents, smoky highlights, knockout arcade energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 9. Inside the NBA Classics

Identity summary: A cozy late-night TNT desk feed built on jokes, arguments, monitor walls, and playoff comfort TV.

Visual anchors: studio desk, monitor wall, blue and orange broadcast lights, stat sheets, late-night desk energy.

Concept routes:

1. Late-Night Desk Replay — bold blue-orange arcade studio panel, clearest studio arcade identity.
2. Monitor Wall Roast Room — more chaotic and graphic arcade energy.
3. Postgame Comfort TV — softer, more replay-heavy, warmer arcade desk feel.

Recommended route: Late-Night Desk Replay.

Prompt pack:

- `row-bg` -> `public/channel-art/inside-the-nba-classics/row-bg.png`
  - OpenAI: bold blue-orange arcade studio desk panel, CRT monitor wall glow, stat sheet graphics, late-night desk arcade energy, 90s cable sports TV menu feel.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/inside-the-nba-classics/profile-bg.png`
  - OpenAI: bold blue-orange arcade studio card, CRT monitor wall glow, desk reflections, late-night TV arcade energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/inside-the-nba-classics/logo.png`
  - OpenAI: chunky studio monitor badge icon, bold blue and orange, desk-show arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/inside-the-nba-classics/badge.png`
  - OpenAI: bold studio replay badge, monitor-wall shape, blue and orange chunky arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/inside-the-nba-classics/logo-spin.webp`
  - OpenAI: rotating microphone-and-monitor collectible, bold studio chrome, blue-orange arcade desk energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 10. SportsCenter Classics

Identity summary: ESPN highlight-news nostalgia: newsroom desk rhythm, CRT glow, and classic countdown energy.

Visual anchors: newsroom desk, CRT monitors, highlight wall, red and blue broadcast package, web-gem energy.

Concept routes:

1. Top Ten Newsroom — bold red-blue arcade newsroom panel, most obvious SportsCenter read.
2. Archive Countdown Desk — more nostalgic and broadcast-heavy arcade energy.
3. Web-Gem Wall — more playful, more montage-driven arcade feel.

Recommended route: Top Ten Newsroom.

Prompt pack:

- `row-bg` -> `public/channel-art/sportscenter-classics/row-bg.png`
  - OpenAI: bold red-blue arcade newsroom panel, CRT monitor wall, highlight wall graphics, 90s ESPN countdown arcade energy, classic broadcast menu feel.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/sportscenter-classics/profile-bg.png`
  - OpenAI: bold red-blue arcade newsroom card, CRT monitor glow, archive-highlight arcade broadcast energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/sportscenter-classics/logo.png`
  - OpenAI: chunky red-blue highlight badge icon, bold newsroom arcade emblem, classic sports broadcast icon.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/sportscenter-classics/badge.png`
  - OpenAI: bold top-ten replay badge, CRT glow seal, red and blue chunky arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/sportscenter-classics/logo-spin.webp`
  - OpenAI: rotating highlight-reel collectible, bold newsroom chrome, red-blue arcade streaks.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 11. Super Bowl Channel

Identity summary: The NFL's biggest stage: comebacks, confetti, trophy gold, and championship chaos.

Visual anchors: stadium lights, confetti, aerial field geometry, trophy-gold atmosphere, big-game broadcast energy.

Concept routes:

1. Big Stage Trophy Glow — bold gold arcade championship panel, most iconic and premium route.
2. Confetti Comeback Room — more celebratory and play-by-play arcade heavy.
3. Championship Aerial View — more field geometry and broadcast scale arcade feel.

Recommended route: Big Stage Trophy Glow.

Prompt pack:

- `row-bg` -> `public/channel-art/super-bowl-channel/row-bg.png`
  - OpenAI: bold gold championship arcade panel, stadium light beams, confetti burst, aerial field geometry, big-game arcade broadcast energy.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/super-bowl-channel/profile-bg.png`
  - OpenAI: bold gold arcade championship card, field-diagram geometry, trophy glow, big-game arcade broadcast energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/super-bowl-channel/logo.png`
  - OpenAI: chunky trophy-gold stage emblem, bold championship arcade icon, big-game energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/super-bowl-channel/badge.png`
  - OpenAI: bold championship badge, confetti-edge seal, gold arcade relief, trophy chunky emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/super-bowl-channel/logo-spin.webp`
  - OpenAI: rotating football collectible, bold gold trophy treatment, stadium-light gleam, arcade game-item energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 12. NBA Finals Channel

Identity summary: Championship basketball history: Game 7 pressure, gold banners, and legacy-defining moments.

Visual anchors: trophy-room glow, game-seven court lines, gold banners, championship broadcast energy, finals drama.

Concept routes:

1. Championship Trophy Room — bold gold arcade trophy panel, clearest Finals arcade identity.
2. Game Seven Hallway — more pressure-driven and dramatic arcade energy.
3. Gold Banner Archive — more legacy-heavy, museum-like arcade feel.

Recommended route: Championship Trophy Room.

Prompt pack:

- `row-bg` -> `public/channel-art/nba-finals-channel/row-bg.png`
  - OpenAI: bold gold championship trophy-room arcade panel, banner silhouettes, game-seven court line graphics, bold gold broadcast energy.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/nba-finals-channel/profile-bg.png`
  - OpenAI: bold gold arcade Finals card, trophy-room glow, legacy-board arcade energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/nba-finals-channel/logo.png`
  - OpenAI: chunky championship seal icon, bold gold arcade relief, Finals-history prestige emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/nba-finals-channel/badge.png`
  - OpenAI: bold championship badge, trophy-room geometry, gold arcade shine, legacy seal chunky emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/nba-finals-channel/logo-spin.webp`
  - OpenAI: rotating championship trophy collectible, bold gold trim, court-line arcade detailing.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 13. March Madness TV

Identity summary: Tournament chaos: buzzer beaters, Cinderellas, and the emotional whiplash of March.

Visual anchors: bracket graphics, hardwood chaos, buzzer-beater energy, NCAA tournament boards, Cinderella pressure.

Concept routes:

1. Bracket Chaos Court — bold bracket-chaos arcade panel, strongest tournament arcade read.
2. Upset Machine — more underdog and upset-centric arcade energy.
3. Buzzer-Beat Hall — more dramatic, game-ending arcade focus.

Recommended route: Bracket Chaos Court.

Prompt pack:

- `row-bg` -> `public/channel-art/march-madness-tv/row-bg.png`
  - OpenAI: bold bracket-chaos arcade panel, hardwood motion graphics, tournament board line art, buzzer-beater arcade energy, 90s NCAA game menu feel.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/march-madness-tv/profile-bg.png`
  - OpenAI: bold bracket arcade card, bracket fragment graphics, arena tension, postseason arcade pressure.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/march-madness-tv/logo.png`
  - OpenAI: chunky tournament-bracket emblem icon, bold collegiate arcade colors, hardwood energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/march-madness-tv/badge.png`
  - OpenAI: bold bracket seal badge, Cinderella drama, chunky arcade tournament emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/march-madness-tv/logo-spin.webp`
  - OpenAI: rotating college basketball collectible, bold bracket geometry, buzzer-light arcade streaks.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 14. Patriots Dynasty

Identity summary: Brady, Belichick, comeback drives, and the cold machinery of New England football.

Visual anchors: cold blue-gray Foxboro atmosphere, playbook grids, Super Bowl rings, comeback calm, methodical drive lines.

Concept routes:

1. Foxboro Blueprint — bold cold blue-gray arcade dynasty panel, clearest identity.
2. Ring Machine — more hardware-forward and disciplined arcade energy.
3. Winter Comeback Room — colder, more drive-by-drive arcade drama.

Recommended route: Foxboro Blueprint.

Prompt pack:

- `row-bg` -> `public/channel-art/patriots-dynasty/row-bg.png`
  - OpenAI: bold cold blue-gray Foxboro arcade panel, playbook grid line art, comeback drive graphics, dynasty arcade energy.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/patriots-dynasty/profile-bg.png`
  - OpenAI: bold blue-gray arcade dynasty card, stadium-cold atmosphere, ring-room glow, methodical arcade energy.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/patriots-dynasty/logo.png`
  - OpenAI: chunky New England dynasty crest icon, bold cold blue, disciplined football arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/patriots-dynasty/badge.png`
  - OpenAI: bold dynasty badge, ring-room geometry, blue and silver arcade shine, playbook grid emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/patriots-dynasty/logo-spin.webp`
  - OpenAI: rotating football collectible, bold cold-weather steel, ring-metal accents, comeback arcade energy.
  - Midjourney: same direction + `--ar 1:1 --style raw`

## 15. Random Sports Compilations

Identity summary: The wildcard sports-bar shuffle: catches, dunks, goals, hits, and impossible moments.

Visual anchors: mixed-sport collage, CRT scanlines, remote-shuffle tape labels, sports-bar-at-night mood, highlight-pile energy.

Concept routes:

1. Remote Shuffle Collage — bold mixed-sport arcade collage panel, strongest wildcard read.
2. Highlight Tape Wall — more archive and tape-label driven arcade energy.
3. Sports-Bar Static Storm — more ambient and chaotic arcade feel.

Recommended route: Remote Shuffle Collage.

Prompt pack:

- `row-bg` -> `public/channel-art/random-sports-compilations/row-bg.png`
  - OpenAI: bold mixed-sport arcade collage panel, CRT scanlines, remote-shuffle tape label graphics, wildcard multi-sport arcade energy.
  - Midjourney: same direction + `--ar 5:1 --style raw`
- `profile-bg` -> `public/channel-art/random-sports-compilations/profile-bg.png`
  - OpenAI: bold mixed-sport arcade card, archive tape texture, collage fragment graphics, TV-static arcade glow.
  - Midjourney: same direction + `--ar 3:4 --style raw`
- `logo` -> `public/channel-art/random-sports-compilations/logo.png`
  - OpenAI: chunky remote-shuffle highlight badge icon, bold mixed-sport arcade collage.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `badge` -> `public/channel-art/random-sports-compilations/badge.png`
  - OpenAI: bold wildcard badge, archive-tape edges, highlight-pile energy, chunky sports-bar arcade emblem.
  - Midjourney: same direction + `--ar 1:1 --style raw`
- `logo-spin` -> `public/channel-art/random-sports-compilations/logo-spin.webp`
  - OpenAI: rotating mixed-sport collectible, bold collage fragments, tape-label arcade charm.
  - Midjourney: same direction + `--ar 1:1 --style raw`
