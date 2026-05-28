# Channel Art Prompts

This document is the human-facing prompt library for custom channel art. OpenAI image generation is the primary production workflow because it is better for repeatable assets, controlled edits, exact crops, and iteration. Midjourney remains supported for high-vibe concept exploration.

Do not generate readable text in the artwork. React renders all real text: channel names, CH numbers, metadata, badges, and CTAs.

The structured source of truth is `data/channelArtPrompts.ts`. It generates prompt sets for every current live channel in `data/channels.ts` and every supported asset type:

- `row-bg`
- `profile-bg`
- `logo-spin`

## Production Workflow

1. Copy one prompt into OpenAI image generation.
2. Use the asset-specific instruction for the target format: row background, profile background, or logo/icon.
3. Export or crop to the recommended aspect ratio.
4. Download the result.
5. Place the file in `public/channel-art/{slug}/`.
6. Add paths to `data/channels.ts` through the reviewed channel data workflow.
7. Run `npm run build`.

Optional Midjourney concept workflow:

1. Use the same prompt for vibe exploration.
2. Add the matching aspect parameter, such as `--ar 5:1`, `--ar 3:4`, or `--ar 1:1`.
3. Use the result as reference only, or refine/redraw it with OpenAI for production consistency.

Required paths:

```text
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
public/channel-art/{slug}/logo-spin.webp
```

Recommended aspect ratios:

- `row-bg.png`: wide horizontal, 5:1 preferred, 4:1 acceptable.
- `profile-bg.png`: vertical side panel, 3:4.
- `logo.png`: square static fallback, 1:1.
- `logo-spin.webp`: square rotating collectible animation, 1:1.

OpenAI production instructions:

- Row backgrounds: generate as wide channel-guide background layers; keep the left and center lower-detail and text-safe.
- Profile backgrounds: generate as vertical profile-card background layers; keep the upper-left and middle readable for overlaid UI.
- Logo-spin assets: generate as square collectible objects; prefer a clean centered item on transparent or easily removable background. If animation is not available yet, make a strong static frame that can become an animated WebP later.

Global prompt rules:

- Avoid real logos.
- Avoid real athlete faces.
- Avoid readable text, letters, numbers, watermarks, and trademarks.
- Generate background/art layers only.
- Keep text-safe empty or low-detail areas in the left and center for guide rows.
- Keep profile card backgrounds readable behind overlaid React text.

Prompt catalog in code:

- `data/channelArtPrompts.ts` stores prompt sets for all live channels in a typed format.
- `recommendedProvider` is `openai`.
- `midjourneyPrompt` includes aspect parameters for optional concept exploration.

## Standard Prompt Pattern

Every live channel gets these three prompt types in `data/channelArtPrompts.ts`:

Row background:

```text
wide horizontal channel guide rectangle background for {channelName}, {visualDirection}, {category} channel identity, background art layer only, low-detail text-safe left and center zones, richer custom art on the right side, retro sports cable guide aesthetic, premium but gritty, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile / TV card background:

```text
vertical TV profile card background for {channelName}, {visualDirection}, {category} channel identity, background art layer only, readable upper-left and center zones for overlaid UI, subtle depth, retro sports trading card meets cable box preview panel, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
rotating 3D collectible item icon for {channelName}, {visualDirection}, channel-specific video-game pickup object, glossy collectible material, transparent background preferred, centered object, readable at small size, no text on the object, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Live Channel Coverage

`data/channelArtPrompts.ts` maps over `CHANNELS`, so the prompt catalog covers every current live channel automatically. This prevents the prompt library from going stale when channels are added or removed.

Pilot channels with specific art direction:

- `kobe-tv`
- `nba-2000s`
- `nfl-big-hits`
- `florida-gators-tv`
- `tiger-sundays`
- `jordan-tv`
- `bulls-mj-era`
- `mike-tyson-tv`
- `inside-the-nba-classics`
- `sportscenter-classics`

All other live channels get prompt direction from their channel name, sport, era, vibe, and category, plus sport-specific visual defaults.

Current live channel slugs covered by the structured catalog:

```text
kobe-tv
nba-2000s
nfl-big-hits
boston-classics
florida-gators-tv
tiger-sundays
jordan-tv
bulls-mj-era
super-bowl-channel
nba-finals-channel
inside-the-nba-classics
random-sports-compilations
mike-tyson-tv
march-madness-tv
sportscenter-classics
college-football-chaos
patriots-dynasty
tiger-sundays-expansion
lebron-archive
shaq-diesel-tv
t-mac-time
nba-90s-hardwood
pistons-bad-boys
cowboys-americas-team
world-series-classics
yankees-dynasty-tv
iverson-tv
vince-carter-airwaves
d-wade-county
lakers-classics
heat-culture-tv
warriors-dynasty
steelers-classics
red-sox-classics
steph-range-tv
magic-showtime
larry-legend-tv
big-ticket-tv
celtics-vault
stanley-cup-nights
world-cup-classics
nfl-2000s-primetime
dirk-forever
nash-suns-tv
nfl-90s-smashmouth
college-football-bcs-era
espn-anchor-classics
spurs-system-tv
niners-gold-rush
hakeem-dreams
barkley-suns-tv
reggie-miller-time
stockton-malone-jazz
penny-shaq-magic
elway-broncos-tv
peyton-manning-theater
gary-payton-era
nfl-classics-vault
brett-favre-packers
sweetness-tv
dan-marino-tv
randy-moss-channel
patrick-ewing-knicks
gretzky-tv
bo-jackson-tv
slam-dunk-classics
dominique-wilkins-tv
jim-brown-legacy
lt-giants-defense
dream-team-92
clyde-drexler-tv
ali-tv
miracle-on-ice-tv
cwebb-kings-tv
```

## Rotating Collectible Direction

The `logo-spin` asset is for a future rotating 3D-feeling item, not ordinary flat logo art. Think collectible video-game pickup, trophy object, jersey object, helmet object, ball object, glove object, or broadcast desk item. It should read clearly at small size and work on a transparent background.

Examples:

- Kobe TV: rotating purple/gold #24 jersey collectible.
- Jordan TV: rotating red/black #23 jersey or trophy-like basketball object.
- Florida Gators TV: rotating orange/blue helmet or football collectible without real logos.
- Mike Tyson TV: rotating glove or championship-belt-inspired object.
- Tiger Sundays: rotating golf ball or Sunday red collectible.
- Inside the NBA Classics: rotating microphone/monitor studio collectible.

## Kobe TV

Direction: purple and gold premium basketball legend package with hardwood, arena light, and jersey fabric energy.

Row background:

```text
wide cinematic basketball channel banner, deep purple and gold palette, glossy hardwood floor texture, dramatic arena rim light, abstract jersey stitching, subtle snake-scale pattern, premium late-2000s sports broadcast package, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical premium basketball profile card background, purple and gold glow, hardwood floor reflection, abstract spotlight haze, subtle jersey mesh texture, cinematic sports trading card backing, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract black mamba inspired basketball emblem, purple and gold, coiled motion shape, premium metallic sports badge, transparent-background friendly composition, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## NBA 2000s

Direction: red, white, and blue early-2000s basketball broadcast energy with chrome, hardwood, and baggy-shorts era nostalgia.

Row background:

```text
wide early-2000s basketball broadcast banner, red white and blue light streaks, chrome TV graphics, hardwood court lines, grainy camcorder energy, abstract baggy uniform fabric shapes, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical retro basketball broadcast profile background, chrome accents, blue and red studio lighting, hardwood texture, old television highlight package atmosphere, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract 2000s basketball badge, chrome rim, red and blue energy arcs, orange basketball texture, clean silhouette shape, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## NFL Big Hits

Direction: gritty football impact package with turf, chalk, steel, and collision energy.

Row background:

```text
wide gritty football broadcast banner, dark green turf texture, white chalk yard marks, steel gray impact bursts, flying rubber pellets, dramatic stadium lights, aggressive sports package, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical football profile card background, dark turf and steel palette, chalk dust, impact shockwave graphics, helmet scuff texture without logos, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract football impact emblem, cracked turf, steel shield shape, motion collision lines, no team marks, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Florida Gators TV

Direction: orange and blue college football package with swamp atmosphere, stadium lights, and humid night-game energy.

Row background:

```text
wide college football channel banner, electric orange and royal blue, swamp mist texture, wet grass, stadium floodlights, energetic southern night game atmosphere, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical college football profile background, orange and blue glow, swamp reeds silhouette, stadium haze, wet turf texture, premium campus broadcast package, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract swamp football emblem, orange and blue, gator-scale texture without animal mascot likeness, bold shield shape, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Tiger Sundays

Direction: calm premium golf package with deep green, Sunday red, gold trim, fairway texture, and major championship atmosphere.

Row background:

```text
wide premium golf broadcast banner, deep green fairway texture, subtle Sunday red accent, gold trim, morning mist, manicured grass stripes, calm championship atmosphere, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical premium golf profile card background, deep green and gold, soft red accent glow, fairway grass pattern, quiet major championship mood, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract golf Sunday badge, green fairway curve, red accent slash, gold ring, premium minimal sports emblem, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Jordan TV

Direction: red, black, and white basketball icon package with championship atmosphere and premium hardwood treatment.

Row background:

```text
wide premium basketball legend banner, red black and white palette, glossy hardwood, championship spotlight beams, abstract wing-like motion graphics, vintage 1990s broadcast intensity, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical basketball trading card background, red and black glow, hardwood reflection, championship confetti abstraction, premium sports icon treatment, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract basketball crown emblem, red black and white, airborne motion arc without human likeness, premium badge, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Bulls MJ Era

Direction: 1990s Chicago championship dynasty feel with red, black, white, hardwood, banners, and old arena atmosphere.

Row background:

```text
wide 1990s basketball dynasty banner, red black and white palette, old arena rafters, abstract championship banners with no readable text, hardwood court texture, documentary broadcast mood, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical 1990s basketball dynasty profile background, red and black arena lighting, hanging banner silhouettes without text, hardwood grain, classic broadcast package, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract dynasty basketball badge, red black white, six-ring inspired geometric arcs, no team logo, clean sports emblem, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Mike Tyson TV

Direction: black, gold, and red fight-night package with canvas texture, poster lighting, and heavyweight energy.

Row background:

```text
wide heavyweight boxing channel banner, black gold and deep red palette, ring canvas texture, smoky arena lights, dramatic fight poster energy, abstract glove motion blur, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical boxing profile card background, black canvas and gold trim, red corner light, smoky spotlight, scuffed leather texture, premium fight-night atmosphere, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract boxing emblem, black gold red, glove silhouette shape without branding, championship belt geometry, clean badge, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Inside the NBA Classics

Direction: late-night studio sports desk package with blue, orange, monitors, and classic cable TV control-room atmosphere.

Row background:

```text
wide retro sports studio broadcast banner, blue and orange accent lights, late-night studio desk atmosphere, wall of CRT monitors with abstract glow, cable TV control room energy, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical sports studio profile background, blue orange lighting, broadcast desk reflections, CRT monitor wall bokeh, premium late-night cable sports mood, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract studio sports badge, blue orange glow, microphone and monitor geometry, no network branding, clean emblem, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## SportsCenter Classics

Direction: 1990s sports highlight desk package with red, charcoal, chrome, CRT scanline energy, and archive tape mood.

Row background:

```text
wide 1990s sports highlight show banner, red charcoal and chrome palette, CRT scanlines, newsroom desk lights, VHS archive tape texture, fast highlight montage energy, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical retro sports highlight profile background, red and chrome studio graphics, CRT glow, archive tape shelves, newsroom lighting, premium cable sports package, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Rotating logo / 3D item:

```text
square rotating collectible, icon-ready abstract sports highlight badge, red chrome charcoal, circular broadcast desk geometry, CRT scanline motif, no network branding, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```
