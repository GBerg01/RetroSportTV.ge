# Channel Art Prompts

This document is a production guide for generating custom channel art with OpenAI image generation as the primary production workflow. Midjourney can still be useful for high-vibe concept exploration, but final repeatable assets should be produced or refined with OpenAI when consistency, controlled edits, exact crops, and iteration matter.

Do not generate readable text in the artwork. React renders all real text: channel names, CH numbers, metadata, badges, and CTAs.

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
```

Recommended aspect ratios:

- `row-bg.png`: wide horizontal, 5:1 preferred, 4:1 acceptable.
- `profile-bg.png`: vertical side panel, 3:4.
- `logo.png`: square transparent or icon-ready, 1:1.

OpenAI production instructions:

- Row backgrounds: generate as wide channel-guide background layers; keep the left and center lower-detail and text-safe.
- Profile backgrounds: generate as vertical profile-card background layers; keep the upper-left and middle readable for overlaid UI.
- Logo/icons: generate as square icon-ready marks; prefer a clean centered emblem on transparent or easily removable background.

Global prompt rules:

- Avoid real logos.
- Avoid real athlete faces.
- Avoid readable text, letters, numbers, watermarks, and trademarks.
- Generate background/art layers only.
- Keep text-safe empty or low-detail areas in the left and center for guide rows.
- Keep profile card backgrounds readable behind overlaid React text.

Prompt catalog in code:

- `data/channelArtPrompts.ts` stores the same prompt set in a typed format.
- `recommendedProvider` is `openai`.
- `midjourneyParameters` is included only for optional concept exploration.

## Kobe TV

Direction: purple and gold premium basketball legend package with hardwood, arena light, and jersey fabric energy.

Row background:

```text
wide cinematic basketball channel banner, deep purple and gold palette, glossy hardwood floor texture, dramatic arena rim light, abstract jersey stitching, subtle snake-scale pattern, premium late-2000s sports broadcast package, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical premium basketball profile card background, purple and gold glow, hardwood floor reflection, abstract spotlight haze, subtle jersey mesh texture, cinematic sports trading card backing, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract black mamba inspired basketball emblem, purple and gold, coiled motion shape, premium metallic sports badge, transparent-background friendly composition, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## NBA 2000s

Direction: red, white, and blue early-2000s basketball broadcast energy with chrome, hardwood, and baggy-shorts era nostalgia.

Row background:

```text
wide early-2000s basketball broadcast banner, red white and blue light streaks, chrome TV graphics, hardwood court lines, grainy camcorder energy, abstract baggy uniform fabric shapes, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical retro basketball broadcast profile background, chrome accents, blue and red studio lighting, hardwood texture, old television highlight package atmosphere, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract 2000s basketball badge, chrome rim, red and blue energy arcs, orange basketball texture, clean silhouette shape, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## NFL Big Hits

Direction: gritty football impact package with turf, chalk, steel, and collision energy.

Row background:

```text
wide gritty football broadcast banner, dark green turf texture, white chalk yard marks, steel gray impact bursts, flying rubber pellets, dramatic stadium lights, aggressive sports package, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical football profile card background, dark turf and steel palette, chalk dust, impact shockwave graphics, helmet scuff texture without logos, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract football impact emblem, cracked turf, steel shield shape, motion collision lines, no team marks, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Florida Gators TV

Direction: orange and blue college football package with swamp atmosphere, stadium lights, and humid night-game energy.

Row background:

```text
wide college football channel banner, electric orange and royal blue, swamp mist texture, wet grass, stadium floodlights, energetic southern night game atmosphere, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical college football profile background, orange and blue glow, swamp reeds silhouette, stadium haze, wet turf texture, premium campus broadcast package, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract swamp football emblem, orange and blue, gator-scale texture without animal mascot likeness, bold shield shape, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Tiger Sundays

Direction: calm premium golf package with deep green, Sunday red, gold trim, fairway texture, and major championship atmosphere.

Row background:

```text
wide premium golf broadcast banner, deep green fairway texture, subtle Sunday red accent, gold trim, morning mist, manicured grass stripes, calm championship atmosphere, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical premium golf profile card background, deep green and gold, soft red accent glow, fairway grass pattern, quiet major championship mood, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract golf Sunday badge, green fairway curve, red accent slash, gold ring, premium minimal sports emblem, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Jordan TV

Direction: red, black, and white basketball icon package with championship atmosphere and premium hardwood treatment.

Row background:

```text
wide premium basketball legend banner, red black and white palette, glossy hardwood, championship spotlight beams, abstract wing-like motion graphics, vintage 1990s broadcast intensity, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical basketball trading card background, red and black glow, hardwood reflection, championship confetti abstraction, premium sports icon treatment, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract basketball crown emblem, red black and white, airborne motion arc without human likeness, premium badge, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Bulls MJ Era

Direction: 1990s Chicago championship dynasty feel with red, black, white, hardwood, banners, and old arena atmosphere.

Row background:

```text
wide 1990s basketball dynasty banner, red black and white palette, old arena rafters, abstract championship banners with no readable text, hardwood court texture, documentary broadcast mood, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical 1990s basketball dynasty profile background, red and black arena lighting, hanging banner silhouettes without text, hardwood grain, classic broadcast package, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract dynasty basketball badge, red black white, six-ring inspired geometric arcs, no team logo, clean sports emblem, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Mike Tyson TV

Direction: black, gold, and red fight-night package with canvas texture, poster lighting, and heavyweight energy.

Row background:

```text
wide heavyweight boxing channel banner, black gold and deep red palette, ring canvas texture, smoky arena lights, dramatic fight poster energy, abstract glove motion blur, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical boxing profile card background, black canvas and gold trim, red corner light, smoky spotlight, scuffed leather texture, premium fight-night atmosphere, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract boxing emblem, black gold red, glove silhouette shape without branding, championship belt geometry, clean badge, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## Inside the NBA Classics

Direction: late-night studio sports desk package with blue, orange, monitors, and classic cable TV control-room atmosphere.

Row background:

```text
wide retro sports studio broadcast banner, blue and orange accent lights, late-night studio desk atmosphere, wall of CRT monitors with abstract glow, cable TV control room energy, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical sports studio profile background, blue orange lighting, broadcast desk reflections, CRT monitor wall bokeh, premium late-night cable sports mood, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract studio sports badge, blue orange glow, microphone and monitor geometry, no network branding, clean emblem, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

## SportsCenter Classics

Direction: 1990s sports highlight desk package with red, charcoal, chrome, CRT scanline energy, and archive tape mood.

Row background:

```text
wide 1990s sports highlight show banner, red charcoal and chrome palette, CRT scanlines, newsroom desk lights, VHS archive tape texture, fast highlight montage energy, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Profile background:

```text
vertical retro sports highlight profile background, red and chrome studio graphics, CRT glow, archive tape shelves, newsroom lighting, premium cable sports package, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

Logo/icon:

```text
square icon-ready abstract sports highlight badge, red chrome charcoal, circular broadcast desk geometry, CRT scanline motif, no network branding, background art layer only, designed for text overlay, no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```
