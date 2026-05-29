# Megatron TV — Channel Plan

**Status:** Planning / Scaffolded — not yet live  
**Slug:** `megatron-tv`  
**Proposed Channel Number:** 76  
**Launch Priority:** next

---

## Identity

| Field | Value |
|---|---|
| Name | Megatron TV |
| Category | Player Channels |
| Sport | Football |
| Era | 2007–2015 |
| Vibe | Unstoppable receiver |
| Accent Color | `#0076B6` (Honolulu blue) |
| Secondary Accent | `#B0B7BC` (Detroit silver) |
| Emoji Fallback | 🤖 |

## Personality Line

> "Six-foot-five, 236 pounds, and you still couldn't cover him."

## Description

Calvin Johnson was a physical impossibility at wide receiver. The size of a tight end, the speed of a slot, the hands of a surgeon — and the jump-ball dominance that made defensive coordinators throw their clipboards. Megatron TV is the dedicated Calvin Johnson highlight channel: one-handed grabs, contested end-zone battles, the single-season record year of 2012, and every moment that made Ford Field erupt when nobody expected it to. The Lions may not have won, but Calvin Johnson was winning every single Sunday.

## Why It Resonates

- **Nickname recognition:** "Megatron" is instantly iconic — even non-football fans know it. It functions as a brand, not just a player reference.
- **No equivalent channel:** The 74 live channels have no dedicated NFL receiver channel. Megatron TV fills a clear gap.
- **Visually distinct:** The mech/cyber energy, Detroit blue/silver, end-zone silhouette at full extension — this is one of the most visualizable player channel skins in the NFL category.
- **Undersold legacy:** Johnson played for a losing team, which means his highlights feel even more impressive in isolation. Viewers root for the individual.
- **2012 season as a cultural moment:** The 1,964-yard season record is one of the most cited single-season achievements in NFL history.

## Target Audience

- Detroit Lions fans (deeply loyal, underserved by sports media attention)
- NFL wide receiver fans — anyone who watches highlights for elite catching
- Crossover audience from Madden / NFL video game culture (Megatron was a featured player)
- Fantasy football veterans who remember the Megatron value era

## Visual Anchors

- Ford Field arena grid lights and blue/silver color field
- Receiver silhouette at peak of contested catch — fully extended, one hand or two, above a defender
- Honolulu blue and Detroit silver palette — pure and saturated
- End-zone lines and back-of-end-zone geometry
- Cyber / mech energy — the nickname justifies a slightly futuristic metallic texture
- Single-season record counter motif in the right zone (no numbers readable, but the geometry of achievement)
- Stadium light beam grid from above

## Row-Bg Art Direction

Wide horizontal channel guide background. Honolulu blue fading to near-black across the panel — deepest color on the left (text-safe), more illuminated on the right where the visual detail lives. Calvin Johnson silhouette pushed hard to the right edge — arms fully extended above a defender silhouette at the back of the end zone. Ford Field arena light grid cast from above. Detroit silver geometric frame element on the right zone. Mech/cyber metallic texture energy in the right half — not photorealistic, arcade-style vector. No readable text, no numbers, no jersey numbers.

**Color palette:** `#0076B6` (Honolulu blue), `#B0B7BC` (silver), `#1A1A1A` (near-black)  
**Energy:** NFL Blitz-era receiver unlock screen. Mech-athlete arcade trading card.  
**Safe zone:** Hard dark left 40–45% for channel name, CH badge, metadata.

## Future Logo / Badge Ideas

- **Logo:** Chunky mech receiver helmet silhouette — Detroit blue with silver visor, arcade emblem energy
- **Badge:** Calvin Johnson single-season record seal — blue/silver collectible badge with end-zone geometry
- **Logo-spin:** Rotating mech football helmet collectible — Honolulu blue shell, silver chrome visor, spinning arcade pickup item

## Starter Video Themes

1. Calvin Johnson single-season record 2012 — full-season highlight reel
2. Calvin Johnson best contested catches / one-handed grabs compilation
3. Calvin Johnson vs 49ers / Saints — individual dominant game clips
4. Calvin Johnson end-zone jump ball collection
5. Calvin Johnson career highlights reel
6. Lions vs Packers — Calvin Johnson big games
7. Calvin Johnson Madden-era moment compilations (if official)
8. Top 10 Calvin Johnson catches / moments
9. Calvin Johnson vs elite cornerbacks
10. 2012 season box scores / individual game clips

## YouTube Search Phrases

**High priority:**
- `Calvin Johnson 2012 record season highlights`
- `Calvin Johnson best catches`
- `Calvin Johnson highlights Detroit Lions`
- `Megatron Calvin Johnson compilation`
- `Calvin Johnson contested catch highlights`
- `Calvin Johnson one hand catch`

**Secondary:**
- `Calvin Johnson career highlights`
- `Calvin Johnson NFL highlights`
- `Calvin Johnson vs 49ers highlights`
- `Megatron NFL highlights`

**Preferred source channels:** NFL official, NFL Throwback, NFL Films, Detroit Lions official, NFL Highlights on YouTube

## What to Avoid

- Lions losing/frustration narrative — the channel is about Calvin's brilliance, not team failures
- Debate shows about whether he's underrated — let the catches speak
- Low-quality fan reuploads when NFL official exists
- Post-retirement lifestyle content
- Injury retrospectives

## MVP Completion Checklist

- [ ] Candidate intake file fulfilled (`data/intake/megatron-tv-candidates.json`) — 8+ verified YouTube IDs
- [ ] Channel entry added to `data/channels.ts`
- [ ] `rowBackgroundUrl` wired to `/channel-art/megatron-tv/row-bg.png`
- [ ] `profileBackgroundUrl` wired to `/channel-art/megatron-tv/row-bg.png`
- [ ] Row-bg art generated via `npm run art:generate -- --channel megatron-tv --asset row-bg`
- [ ] Row-bg reviewed in browser against QA checklist
- [ ] Hover preview works in channel guide
- [ ] Channel player loads and plays first video
- [ ] Lint + build pass clean after adding

## Strong Channel Checklist

- [ ] 10+ verified, high-quality videos — no dead embeds
- [ ] Row-bg art clearly reads as Calvin Johnson / Detroit at a glance
- [ ] Text overlay is readable (left safe zone dark enough)
- [ ] Channel appears in PLAYERS filter
- [ ] Favorite star toggles correctly
- [ ] Preview monitor shows correct thumbnail for first video
