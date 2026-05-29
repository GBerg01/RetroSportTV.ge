# Channel Asset Ideation Framework

This is the repeatable creative system for turning a channel name and metadata into a set of distinct visual concepts, then into production prompts for RetroSportTV.ge.

OpenAI image generation is the primary production path. Midjourney stays useful for high-vibe exploration, but the system is built to keep the output consistent, crop-safe, and easy to import into the app.

## 1. Purpose

Each channel should feel like its own sports broadcast package while still using the same app components and folder structure.

The job of the art system is not to redesign the page. It is to create:

- custom guide-row backgrounds
- custom profile-card backgrounds
- static logos or icons
- collectible badges
- future rotating collectible logo assets

React still renders the text, metadata, buttons, and labels.

## 2. How To Decode A Channel

Start with the channel metadata:

- channel type
- sport
- era
- emotional tone
- iconic objects
- iconic environment
- likely color palette
- texture or material language
- broadcast style
- collectible or logo metaphor

Turn that into a short creative brief before writing any prompts.

Example questions:

1. Is this a player, team, era, event, chaos feed, studio show, combat channel, golf feed, college channel, or compilation feed?
2. What object would represent this channel as a collectible?
3. What visual environment belongs behind the text?
4. What texture or broadcast language makes it feel real?
5. What should the prompt explicitly avoid?

## 3. Channel Type Taxonomy

Use the taxonomy below to keep ideas distinct while staying inside the RetroSportTV.ge world:

- `player`: one athlete, mythic or iconic, centered around a signature persona.
- `team`: dynasty, roster chemistry, local identity, banners, and franchise memory.
- `era`: a decade or style snapshot, usually packed with broadcast nostalgia.
- `event`: a tent-pole stage like a finals, bowl, or tournament brand.
- `chaos`: impact, rivalry, upset, collision, or bracket-break energy.
- `studio`: desk shows, monitor walls, graphics packages, and late-night TV rhythm.
- `combat`: boxing or fight-night tension, smoke, belts, gloves, and ring lighting.
- `golf`: calm premium Sunday energy, fairways, flags, and immaculate greens.
- `individual`: a golfer or single-sport star feed with a premium collectible focus.
- `college`: campus energy, rivalry pages, brackets, and SEC/ACC/NCAA broadcast texture.
- `compilation`: highlight-farm wildcard feed with collage, montage, and remote-shuffle energy.
- `ambient`: background-heavy, sports-bar, or archive feed where mood matters more than a single subject.

## 4. Visual Anchor Checklist

For each channel, collect 5 to 7 anchors:

- primary object
- environment
- palette
- material/texture
- lighting style
- broadcast era cue
- collectible metaphor

Examples:

- Tiger Sundays: bird's-eye golf hole, Sunday red, tiger-striped golf ball, green jacket mood, golden tee.
- Kobe TV: purple/gold hardwood, #24 jersey collectible, arena tunnel lights, championship ring glow.
- Mike Tyson TV: boxing gloves, ring ropes, black/gold/red fight-poster energy, belt metal, smoky arena.
- Inside the NBA Classics: studio desk, monitor wall, blue/orange lights, stat sheets, late-night desk chaos.
- Random Sports Compilations: mixed-sport collage, CRT scanlines, remote-shuffle labels, sports-bar-at-night energy.

## 5. Concept Route Generator

Every channel should have 3 to 5 concept routes before you pick a production direction.

Each route should include:

- concept name
- one-sentence creative idea
- row-bg idea
- profile-bg idea
- logo idea
- badge idea
- logo-spin idea
- color palette
- texture language
- why it fits
- what to avoid

Good routes usually split into three families:

1. Premium hero route.
2. Broadcast/archive route.
3. Collectible/object route.

That gives you variety without leaving the app's visual language.

## 6. Asset Type Definitions

### `row-bg`

Wide guide-row background art.

- Aspect ratio: `5:1` preferred, `4:1` acceptable.
- Must leave text-safe space on the left and center.
- Can carry the heaviest custom flavor.

### `profile-bg`

Vertical background for the channel profile card under the preview.

- Aspect ratio: `3:4`.
- Must stay readable behind title, metadata, badges, and CTA.
- Should echo the row art without copying it pixel-for-pixel.

### `logo`

Static logo or icon.

- Aspect ratio: `1:1`.
- Must read at small size.
- Can be an emblem, jersey, ball, helmet, trophy, glove, or broadcast mark.

### `badge`

Collectible-style badge or emblem.

- Aspect ratio: `1:1`.
- Should feel like a sports-card unlock, sticker, patch, or broadcast badge.
- This is a future asset surface; keep it centered and iconic.

### `logo-spin`

Future rotating collectible object.

- Aspect ratio: `1:1`.
- Should feel like a game pickup, trading-card item, or premium 3D collectible.
- Static frame should still look good before animation exists.

## 7. Prompt Formula

Use a consistent prompt skeleton so each channel still feels part of the same world:

```text
{asset opener} for {channel name}, {channel-specific visual direction}, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, {safe-zone note}, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots
```

For Midjourney, append the aspect ratio:

- `--ar 5:1` for row backgrounds
- `--ar 4:1` if a row composition needs more vertical room
- `--ar 3:4` for profile cards
- `--ar 1:1` for logo, badge, and logo-spin assets

## 8. Safe-Zone Rules

- Keep the left side of row art readable for the channel number and logo block.
- Keep the center of row art lower-detail so the channel title remains legible.
- Keep profile art lighter or calmer behind the title and metadata.
- Never rely on image text for channel names, numbers, or badges.
- Keep collectibles centered so they survive square cropping and small sizes.

## 9. Consistency Rules

- Every channel stays inside the same RetroSportTV.ge world.
- Use retro sports cable-box energy, not generic stock art.
- Make channels distinct through object choice, texture, palette, and era cues.
- Prefer a single strong metaphor over a pile of unrelated details.
- Keep background art and collectible art separate from React text.
- If a channel lacks custom art, the fallback should still look good with gradients and textures.

## 10. Quality Checklist

Before approving an asset, check:

1. Does it feel like the channel?
2. Does it read at small size?
3. Is the text-safe area still clear?
4. Does the row art differ from the profile card without feeling unrelated?
5. Does the logo or badge work as a collectible object?
6. Does the palette match the channel identity?
7. Would this still look good when viewed in a broadcast guide?

## 11. What To Avoid

- readable text baked into the image
- real logos or trademarks
- real athlete faces
- muddy compositions with no safe zone
- generic sports montage art that could belong to any channel
- overcomplicated objects that stop reading at small size
- UI mockups or screenshots inside the artwork

## 12. Example Walkthroughs

### Tiger Sundays

Decode:

- channel type: golf / individual
- sport: Golf
- era: 1997–2019
- tone: dominant
- object: tiger-striped golf ball or green-jacket badge
- environment: pristine fairway from above
- palette: Sunday red, deep green, gold

Anchor set:

- bird's-eye golf hole
- Sunday red
- tiger-striped golf ball
- green jacket mood
- golden tee

Recommended creative direction:

- use a bird's-eye pristine golf hole for the row background
- keep the profile card calmer and more premium
- make the badge feel like a green-jacket collectible
- make the logo-spin asset a tiger-striped golf ball with a tee or flag accent

### Kobe TV

Decode:

- channel type: player
- sport: Basketball
- era: 1996–2016
- tone: cold-blooded
- object: #24 jersey collectible
- environment: hardwood, tunnel lights, trophy room glow
- palette: purple, gold, black

Anchor set:

- purple/gold hardwood
- #24 jersey collectible
- arena tunnel lights
- championship ring glow
- Lakers-era prestige

Recommended creative direction:

- make the row background feel like a premium Lakers legend banner
- use a profile card with spotlight haze and trophy-room depth
- make the badge feel like a ring-seal or championship unlock
- make logo-spin a rotating #24 jersey collectible

### Mike Tyson TV

Decode:

- channel type: combat
- sport: Boxing
- era: 1985–2005
- tone: knockout storm
- object: boxing glove or belt plate
- environment: smoky ring, ropes, corner light
- palette: black, gold, red

Anchor set:

- boxing gloves
- ring ropes
- fight-poster energy
- championship belt
- smoky arena

Recommended creative direction:

- use the row background as a fight-night poster banner
- keep the profile panel darker and tighter
- make the badge feel like belt metal
- make logo-spin a rotating boxing glove collectible

### Inside the NBA Classics

Decode:

- channel type: studio
- sport: Basketball
- era: 2000s–present
- tone: late-night desk
- object: monitor-wall badge or microphone-monitor collectible
- environment: broadcast desk, CRT wall, studio lights
- palette: blue, orange, charcoal

Anchor set:

- studio desk
- monitor wall
- blue/orange lights
- stat sheets
- late-night desk chaos

Recommended creative direction:

- use a studio desk row background
- keep the profile card like a replay slate
- make the badge feel like a desk-show replay mark
- make logo-spin a microphone/monitor collectible

### Random Sports Compilations

Decode:

- channel type: compilation / ambient
- sport: Multi-sport
- era: 1980–present
- tone: remote shuffle
- object: tape label, cassette, or highlight badge
- environment: sports bar, CRT stack, mixed-sport collage
- palette: neon greens, warm reds, archive charcoal

Anchor set:

- mixed-sport collage
- CRT scanlines
- remote-shuffle labels
- sports-bar-at-night mood
- highlight-pile energy

Recommended creative direction:

- use a remote-shuffle collage for the row background
- keep the profile card archive-like but readable
- make the badge feel like an old highlight tape seal
- make logo-spin a mixed-sport collectible with archive textures

