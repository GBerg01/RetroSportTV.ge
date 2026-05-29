# D-Rose TV — Channel Plan

**Status:** Planning / Scaffolded — not yet live  
**Slug:** `d-rose-tv`  
**Proposed Channel Number:** 75  
**Launch Priority:** next

---

## Identity

| Field | Value |
|---|---|
| Name | D-Rose TV |
| Category | Player Channels |
| Sport | Basketball |
| Era | 2008–2012 |
| Vibe | Explosive |
| Accent Color | `#CC0000` (Chicago red) |
| Secondary Accent | `#000000` (Chicago black) |
| Emoji Fallback | 🌹 |

## Personality Line

> "The fastest player in the league, the youngest MVP, the Chicago dream that almost was."

## Description

Derrick Rose's entire basketball identity lives in that 2008–2012 window: the fastest first step in the league, an acrobatic lefty who made United Center crowds rise every night, and the 2011 MVP trophy at age 22 that made Chicago believe. This channel is that window — not the injuries, not the comeback struggles — the pure burst, the impossible angles, and the playoff magic of a Bulls team that came within reach of something legendary.

## Why It Resonates

- **Name recognition:** "D-Rose" is a cultural shorthand. Even casual fans who couldn't name five other players from that era know the name and the story.
- **Emotional weight:** The youngest MVP narrative carries nostalgia and wistfulness — the "what if" quality makes the peak highlights hit harder.
- **Chicago identity:** Chicago sports fans are an enormous, passionate base. A dedicated Rose channel is a direct signal to them.
- **Visually distinct:** The explosive first step, the United Center hardwood, the Bulls red/black palette, and the rose petal motif are immediately recognizable as a channel skin that's different from any existing channel.
- **Age-range bridge:** Fans who were 15–25 in 2011 are now the core streaming demo. This channel hits them directly.

## Target Audience

- Bulls fans and Chicago sports loyalists
- NBA fans who grew up watching the 2008–2012 era
- Fans of explosive PG highlights (crossover with Iverson TV, T-Mac Time audience)
- "What if" nostalgia viewers — the tragic arc adds emotional replay value

## Visual Anchors

- United Center hardwood, deep late-night red court light
- Chicago Bulls red and black palette — no compromises
- Rose petal motif as a secondary design element (subtle, not literal)
- Lightning-fast sneaker silhouette mid-first-step
- 2011 MVP trophy geometry in the right zone
- Tunnel / arena entrance energy
- Acrobatic layup silhouette — the lefty scoop, the hanging moment
- CRT-warm Chicago winter basketball atmosphere

## Row-Bg Art Direction

Wide horizontal channel guide background. Chicago Bulls red fading to black across the panel — red zone on the right, near-black safe zone on the left and center for React text overlays. Silhouette of explosive first-step drive mid-burst pushed to the right edge, sneakers at hardwood level. United Center arena spotlights sweeping from upper right toward center. MVP trophy glow or rose petal scatter as a secondary right-zone element. Dark hardwood floor reflection at the bottom edge. Gold MVP/2011 geometry detail. No readable text, no numbers, no UI chrome.

**Color palette:** `#CC0000` (Bulls red), `#000000` (black), `#FFD700` (MVP gold accent)  
**Energy:** NBA Jam 2K-era player-select unlock screen. Cold-blooded Chicago winter basketball.  
**Safe zone:** Hard dark left 40% for channel name, CH badge, metadata.

## Future Logo / Badge Ideas

- **Logo:** Chunky rose bloom icon with basketball texture — arcade collectible feel, red petals on black
- **Badge:** 2011 MVP seal in Bulls red/black/gold — championship badge geometry with rose petal border
- **Logo-spin:** Rotating basketball with rose petal wrap — collectible unlock item energy

## Starter Video Themes

1. Derrick Rose 2011 MVP season highlight reel
2. Rose vs Miami Heat 2011 playoffs — acrobatic scoring
3. Rose vs Celtics 2009 playoffs — coming-out moment
4. Rose game-winning shots compilation — Bulls daggers
5. Rose explosive dunks and first-step drives compilation
6. Bulls 2011 playoff run highlights (Rose-POV)
7. Rose 2012 All-Star moments
8. Rose career-high games — 39-point nights
9. Rose rookie year flashes (2008–09 season)
10. United Center crowd energy compilation — Rose reaction moments

## YouTube Search Phrases

**High priority (check these first):**
- `Derrick Rose 2011 MVP highlights`
- `Derrick Rose Bulls playoff highlights`
- `Derrick Rose 2011 playoffs Miami Heat`
- `Derrick Rose game winner`
- `Derrick Rose explosive plays`
- `Derrick Rose best dunks drives`
- `Chicago Bulls 2011 playoff run highlights`

**Secondary (compilation/reel sources):**
- `Derrick Rose career highlights`
- `Derrick Rose acrobatic layups`
- `D-Rose mixtape`
- `Bulls 2011 playoffs highlights`

**Preferred source channels:** NBA Highlights, NBA official, House of Highlights archive, Bulls official

## What to Avoid

- Injury footage or tear compilations — this is a highlight channel, not a tragedy documentary
- Motivational edit videos with voiceover over gameplay (unless the gameplay is dominant and the narration is minimal)
- Talking-head debate shows about his legacy without game footage
- Low-quality reuploads when better official sources exist
- Return/comeback narratives — the 2008–2012 peak is the channel identity

## MVP Completion Checklist

- [ ] Candidate intake file fulfilled (`data/intake/d-rose-tv-candidates.json`) — 8+ verified YouTube IDs
- [ ] Channel entry added to `data/channels.ts`
- [ ] `rowBackgroundUrl` wired to `/channel-art/d-rose-tv/row-bg.png`
- [ ] `profileBackgroundUrl` wired to `/channel-art/d-rose-tv/row-bg.png`
- [ ] Row-bg art generated via `npm run art:generate -- --channel d-rose-tv --asset row-bg`
- [ ] Row-bg reviewed in browser against QA checklist
- [ ] Hover preview works in channel guide
- [ ] Channel player loads and plays first video
- [ ] Lint + build pass clean after adding

## Strong Channel Checklist

- [ ] 10+ verified, high-quality videos with no dead embeds
- [ ] Row-bg art clearly reads as D-Rose / Chicago Bulls at a glance
- [ ] Text overlay is readable (left safe zone dark enough)
- [ ] Channel appears in PLAYERS and ERAS category filters
- [ ] Favorite star toggles correctly
- [ ] Preview monitor shows correct thumbnail for first video
