# Channel Art QA Checklist

Visual review guide for all 74 generated row backgrounds.

**How to use:** Open the app at `http://localhost:3000`. Scroll through the channel guide. For each channel, check the row background against the criteria below. Record your verdict in the review table.

---

## Visual Checklist

For each channel row, check:

- [ ] **Row art visible** — background image loads, no broken image or fallback color only
- [ ] **Text readable** — channel name, CH number, and metadata are legible over the left/center of the art
- [ ] **Channel identity clear** — art reads as the right sport, era, and color palette at a glance
- [ ] **Consistent arcade sports style** — feels like the same visual system as other channels (bold, saturated, CRT energy)
- [ ] **No weird AI artifacts** — no garbled geometry, melted text-like shapes, or uncanny distortions that break the feel
- [ ] **Profile card background works** — click into the channel; the profile card background (same image) reads behind the title and metadata text

---

## Regeneration vs Overlay Tweak

**Regenerate** when:
- The image is off-brand (wrong colors, wrong sport energy, feels like a different style system)
- Severe AI artifacts that distort the composition
- The left/center safe zone is too busy and text is unreadable regardless of overlay
- The art communicates the wrong identity entirely

**Overlay tweak (UI, not art)** when:
- Text contrast is a bit low but the art itself is good — adjust the gradient overlay in `ChannelRow`
- The composition is right but the image is slightly dark or bright — CSS fix, not a regeneration
- Minor readability issue that a semi-transparent overlay could solve

**Regeneration command:**
```bash
npm run art:generate -- --channel <slug> --asset row-bg --force
```

After regenerating, re-run:
```bash
npm run build
```

No wiring changes needed — `--force` overwrites the existing file at the same path.

---

## Batch 1 — Channels 01–10

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| Kobe TV | `kobe-tv` | | | |
| NBA 2000s | `nba-2000s` | | | |
| NFL Big Hits | `nfl-big-hits` | | | |
| Boston Classics | `boston-classics` | | | |
| Florida Gators TV | `florida-gators-tv` | | | |
| Tiger Sundays | `tiger-sundays` | | | |
| Jordan TV | `jordan-tv` | | | |
| Bulls MJ Era | `bulls-mj-era` | | | |
| Super Bowl Channel | `super-bowl-channel` | | | |
| NBA Finals Channel | `nba-finals-channel` | | | |

**Status options:** `keep` / `regenerate` / `overlay tweak`

---

## Batch 2 — Channels 11–20

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| Inside the NBA Classics | `inside-the-nba-classics` | | | |
| Random Sports Compilations | `random-sports-compilations` | | | |
| Mike Tyson TV | `mike-tyson-tv` | | | |
| March Madness TV | `march-madness-tv` | | | |
| SportsCenter Classics | `sportscenter-classics` | | | |
| College Football Chaos | `college-football-chaos` | | | |
| Patriots Dynasty | `patriots-dynasty` | | | |
| Tiger Sundays Expansion | `tiger-sundays-expansion` | | | |
| LeBron Archive | `lebron-archive` | | | |
| Shaq Diesel TV | `shaq-diesel-tv` | | | |

---

## Batch 3 — Channels 21–30

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| T-Mac Time | `t-mac-time` | | | |
| NBA 90s Hardwood | `nba-90s-hardwood` | | | |
| Pistons Bad Boys | `pistons-bad-boys` | | | |
| Cowboys America's Team | `cowboys-americas-team` | | | |
| World Series Classics | `world-series-classics` | | | |
| Yankees Dynasty TV | `yankees-dynasty-tv` | | | |
| Iverson TV | `iverson-tv` | | | |
| Vince Carter Airwaves | `vince-carter-airwaves` | | | |
| D-Wade County | `d-wade-county` | | | |
| Lakers Classics | `lakers-classics` | | | |

---

## Batch 4 — Channels 31–40

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| Heat Culture TV | `heat-culture-tv` | | | |
| Warriors Dynasty | `warriors-dynasty` | | | |
| Steelers Classics | `steelers-classics` | | | |
| Red Sox Classics | `red-sox-classics` | | | |
| Steph Range TV | `steph-range-tv` | | | |
| Magic Showtime | `magic-showtime` | | | |
| Larry Legend TV | `larry-legend-tv` | | | |
| Big Ticket TV | `big-ticket-tv` | | | |
| Celtics Vault | `celtics-vault` | | | |
| Stanley Cup Nights | `stanley-cup-nights` | | | |

---

## Batch 5 — Channels 41–50

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| World Cup Classics | `world-cup-classics` | | | |
| NFL 2000s Primetime | `nfl-2000s-primetime` | | | |
| Dirk Forever | `dirk-forever` | | | |
| Nash Suns TV | `nash-suns-tv` | | | |
| NFL 90s Smashmouth | `nfl-90s-smashmouth` | | | |
| BCS Era CFB | `college-football-bcs-era` | | | |
| ESPN Anchor Era | `espn-anchor-classics` | | | |
| Spurs System TV | `spurs-system-tv` | | | |
| 49ers Gold Rush | `niners-gold-rush` | | | |
| Hakeem Dreams | `hakeem-dreams` | | | |

---

## Batch 6 — Channels 51–60

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| Barkley's Suns | `barkley-suns-tv` | | | |
| Reggie Miller Time | `reggie-miller-time` | | | |
| Stockton & Malone | `stockton-malone-jazz` | | | |
| Penny & Shaq Magic | `penny-shaq-magic` | | | |
| Elway's Broncos | `elway-broncos-tv` | | | |
| Manning Theater | `peyton-manning-theater` | | | |
| The Glove Era | `gary-payton-era` | | | |
| NFL Classics Vault | `nfl-classics-vault` | | | |
| The Gunslinger | `brett-favre-packers` | | | |
| Sweetness TV | `sweetness-tv` | | | |

---

## Batch 7 — Channels 61–74

| Channel | Slug | Status | Issue | Notes |
|---|---|---|---|---|
| Dan Marino TV | `dan-marino-tv` | | | |
| Straight Cash Homie | `randy-moss-channel` | | | |
| Ewing's Knicks | `patrick-ewing-knicks` | | | |
| The Great One | `gretzky-tv` | | | |
| Bo Knows | `bo-jackson-tv` | | | |
| Slam Dunk Classics | `slam-dunk-classics` | | | |
| Dominique Wilkins TV | `dominique-wilkins-tv` | | | |
| Jim Brown Legacy | `jim-brown-legacy` | | | |
| LT Giants Defense | `lt-giants-defense` | | | |
| Dream Team '92 | `dream-team-92` | | | |
| Clyde Drexler TV | `clyde-drexler-tv` | | | |
| Ali TV | `ali-tv` | | | |
| Miracle on Ice TV | `miracle-on-ice-tv` | | | |
| CWebb Kings TV | `cwebb-kings-tv` | | | |

---

## Regeneration Reference

Copy-paste template for any channel that needs a new image:

```bash
npm run art:generate -- --channel <slug> --asset row-bg --force
```

Examples:
```bash
npm run art:generate -- --channel kobe-tv --asset row-bg --force
npm run art:generate -- --channel ali-tv --asset row-bg --force
npm run art:generate -- --channel dream-team-92 --asset row-bg --force
```

Then rebuild:
```bash
npm run build
```

No changes to `data/channels.ts` needed — the path stays the same.

---

## Batch Commit Pattern (after QA fixes)

After regenerating a group of channels, stage only the affected images:

```bash
git add public/channel-art/<slug>/row-bg.png
git commit -m "Regenerate row-bg for <channel name>"
git push origin main
```

Or batch multiple regenerations into one commit:

```bash
git add public/channel-art/kobe-tv/row-bg.png public/channel-art/ali-tv/row-bg.png
git commit -m "Regenerate row backgrounds after QA review"
git push origin main
```
