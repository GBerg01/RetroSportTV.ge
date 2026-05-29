# Lamar Jackson TV — Channel Plan

**Status:** Planning / Scaffolded — not yet live  
**Slug:** `lamar-jackson-tv`  
**Proposed Channel Number:** 77  
**Launch Priority:** next

---

## Identity

| Field | Value |
|---|---|
| Name | Lamar Jackson TV |
| Category | Player Channels |
| Sport | Football |
| Era | 2018–present |
| Vibe | Joystick juke |
| Accent Color | `#241773` (Ravens purple) |
| Secondary Accent | `#9E7C0C` (Ravens gold) |
| Emoji Fallback | ⚡ |

## Personality Line

> "He doesn't just beat defenses — he makes them look like they're playing the wrong sport."

## Description

Lamar Jackson is the most video-game quarterback in NFL history — a genuine cheat code whose open-field jukes, burst, and arm talent combine into something that genuinely looks unreal on a TV screen. The 2019 unanimous MVP season is one of the greatest individual QB performances in NFL history. His Ravens offensive records, the Ravens vs Chiefs AFC rivalry, and the sheer number of moments that make crowds gasp collectively make this channel a visual feast. Active, ongoing, and only getting better.

## Why It Resonates

- **Active player energy:** Unlike most channels on the guide, Lamar is still playing and generating new highlight content constantly. This gives the channel a live, fresh quality.
- **Joystick / video game identity:** "Playing Madden on expert" is a real thing people say about Lamar. The video-game quarterback concept is fully built-in — no metaphor needed.
- **2019 unanimous MVP:** One of the most dominant QB seasons in NFL history — a moment every football fan remembers. It anchors the channel immediately.
- **Younger viewer magnet:** Lamar's era is the current generation. Adding him draws viewers who might not have the 1990s/2000s nostalgia connection but still want a "their era" channel.
- **Distinct from existing channels:** No existing channel covers an active player with this visual energy. Brady, Vick, and Lamar are three very different QB archetypes — none overlap.

## Target Audience

- Ravens fans and Baltimore sports base
- NFL fans who grew up watching Lamar's 2019 season
- Video game / Madden culture crossover — he's a cover athlete archetype
- Younger viewers (18–30) who identify Lamar as "their generation's QB"
- Anyone who watches football for raw open-field highlights

## Visual Anchors

- Ravens deep purple fading to black
- Ravens gold as accent (not dominant — accent stripe, glow detail)
- Open-field juke run silhouette — mid-stride, cut direction, lightning trail behind
- M&T Bank Stadium atmosphere — outdoor stadium lights, late afternoon/evening sky
- Lightning bolt / electric energy motif in the trail
- Motion blur speed lines through the mid-field
- Joystick or controller Easter egg possible as a subtle right-zone element
- Cold-to-electric contrast: dark left → lit-up right

## Row-Bg Art Direction

Wide horizontal channel guide background. Ravens deep purple fading to near-black — the left 40–45% is very dark for text overlays. Right side carries the visual energy: Lamar juke silhouette at full stride mid-cut, lightning trail streaming behind him through the right zone. Stadium lights from above angling into the mid-field area. Ravens gold accent line or burst detail on the right. Electric arc / trail energy feeling — this is not a realistic photo treatment, it's an arcade speed-frame. No readable text, no jersey number, no UI chrome.

**Color palette:** `#241773` (Ravens purple), `#9E7C0C` (gold), `#000000` (black), `#4FC3F7` (electric blue accent for lightning)  
**Energy:** NFL Blitz joystick QB cheat code unlock screen. Arcade speed-run energy. Video game quarterback select.  
**Safe zone:** Hard dark purple-to-black left 40% for channel name, CH badge, metadata.

## Future Logo / Badge Ideas

- **Logo:** Chunky lightning bolt through a Ravens shield — deep purple and gold, arcade icon energy
- **Badge:** Ravens electric MVP seal — gold/purple with lightning arc border, 2019 MVP collectible badge
- **Logo-spin:** Rotating Ravens helmet collectible — deep purple shell, gold stripe, lightning bolt detail, spinning arcade pickup item

## Starter Video Themes

1. Lamar Jackson 2019 MVP season — full season highlight reel
2. Lamar Jackson scramble and juke compilation — open-field runs
3. Ravens vs Chiefs — Lamar Jackson AFC classics (2019/2020/2023)
4. Lamar Jackson deep ball and arm talent compilation
5. Lamar Jackson rushing TD compilation
6. Lamar Jackson 2020 playoff run highlights
7. Lamar Jackson 2023 MVP season highlights
8. Ravens offensive records — Lamar Jackson career milestones
9. Lamar Jackson impossible angles / tight window throws
10. Top 10 / best Lamar Jackson plays compilation

## YouTube Search Phrases

**High priority:**
- `Lamar Jackson 2019 MVP highlights`
- `Lamar Jackson best runs`
- `Lamar Jackson Ravens highlights`
- `Lamar Jackson juke highlights`
- `Lamar Jackson scrambles compilation`
- `Ravens vs Chiefs Lamar Jackson`

**Secondary:**
- `Lamar Jackson career highlights`
- `Lamar Jackson deep ball highlights`
- `Lamar Jackson best plays`
- `Lamar Jackson rushing records`
- `Lamar Jackson 2023 MVP`

**Preferred source channels:** NFL official, NFL Films, Baltimore Ravens official, NFL Highlights, House of Highlights (NFL clips)

**Note on active player content:** Lamar is still playing (2025–present). New highlight content is continuously produced. Prefer official NFL / Ravens uploads. Verify embeddability before adding — active-era NFL content is more likely to have restricted embedding than archive content.

## What to Avoid

- Injury concern clips or shoulder/knee narrative
- Criticism-only panels without game footage
- Debate clips about whether he's a "real quarterback" — this channel is the answer, not the argument
- Off-field or personal life content
- Low-quality fan edits when official NFL content exists

## MVP Completion Checklist

- [ ] Candidate intake file fulfilled (`data/intake/lamar-jackson-tv-candidates.json`) — 8+ verified YouTube IDs
- [ ] Channel entry added to `data/channels.ts`
- [ ] `rowBackgroundUrl` wired to `/channel-art/lamar-jackson-tv/row-bg.png`
- [ ] `profileBackgroundUrl` wired to `/channel-art/lamar-jackson-tv/row-bg.png`
- [ ] Row-bg art generated via `npm run art:generate -- --channel lamar-jackson-tv --asset row-bg`
- [ ] Row-bg reviewed in browser against QA checklist
- [ ] Hover preview works in channel guide
- [ ] Channel player loads and plays first video
- [ ] Lint + build pass clean after adding

## Strong Channel Checklist

- [ ] 10+ verified, high-quality videos — no dead embeds
- [ ] Row-bg art clearly reads as Lamar Jackson / Ravens at a glance
- [ ] Text overlay readable (left safe zone dark enough)
- [ ] Channel appears in PLAYERS filter
- [ ] Favorite star toggles correctly
- [ ] Preview monitor shows correct thumbnail for first video
- [ ] Embeddability verified for all videos (active-era NFL content needs extra checks)
