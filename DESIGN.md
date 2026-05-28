# DESIGN.md — RetroSportTV.ge Creative Direction

> The north star for product design, visual language, and UX philosophy.
> Read this before touching the homepage, player, or any UI component.

---

## 1. Product Philosophy

### What RetroSportTV.ge Is

RetroSportTV.ge is a **retro sports TV operating system**. It is a cable sports guide. A broadcast environment. You open it like you're turning on a TV — and a sports channel is already playing.

The mental model is:
- You are **channel surfing**, not browsing a website.
- The content is **already on** — you're tuning in, not selecting a video.
- The experience is **passive and ambient**, not click-driven.
- The vibe is **ESPN Classic at 1am**, not a video gallery.

Think: opening a secret retro sports cable box. Choosing from curated channels. Entering a full-screen sports broadcast. Leaving highlights on in the background while you do something else.

### What RetroSportTV.ge Is NOT

| Not this | Why it matters |
|---|---|
| YouTube with CSS | YouTube is a search engine. We're a channel. |
| Netflix | Netflix is on-demand browsing. We're ambient. |
| TikTok | TikTok is algorithmic scrolling. We're channel surfing. |
| A dashboard | Dashboards are for managing things. We're for watching. |
| A blog | No articles. No feeds. No timestamps. |
| A generic video gallery | Grid thumbnails feel cold. We feel warm. |
| A sports betting app | No scores, no odds, no urgency. Pure nostalgia. |
| Modern SaaS | No rounded-corner card grids, no flat illustrations, no "Get Started" CTAs. |
| Social media | No likes, comments, shares, or follower counts. |

### The Core Feeling

You should feel like:
- It's midnight in a dorm room in 2003
- SportsCenter is on in the background
- You're flipping through sports channels on cable
- VHS tapes of greatest moments are stacked next to the TV
- ESPN Classic is showing a Kobe game from 2001
- The bar has 8 TVs on and you're watching all of them at once

---

## 2. Experience Pillars

### Lean-Back Viewing
The user should be able to sit back and watch. Navigation is optional. The default state is: **something is playing, it's good, leave it on.**

### Continuous Playback
Clips auto-advance. No "video ended" dead screens. No YouTube end-card grid. The channel keeps playing like a real TV channel.

### Channel Surfing
Moving between channels should feel like pressing CH+/CH– on a remote. Fast. Decisive. A little chaotic. A slight static flash between channels is the right texture.

### Sports Nostalgia
Every design choice should evoke the feeling of watching sports in a prior decade. The typography, the colors, the overlays — all of it should feel like you're watching a broadcast from 1998–2010.

### Passive Viewing
Users should be able to watch without touching anything. Auto-advance handles progression. Overlays hide themselves. The video fills the screen and does its job.

### Broadcast Overlays
The UI should feel like broadcast graphics, not website chrome. Lower thirds. Channel bugs. Score bugs. Ticker bars. REC indicators. These are the right design vocabulary.

### Ambient Sports-Bar Energy
RetroSportTV.ge should feel like background energy. The kind of thing you put on at a party. The kind of thing you leave running. It should have warmth.

### Full-Screen-First Design
Every layout decision starts with: **what does this look like at full screen?** Not: "how do we fit this in a card?"

---

## 3. Visual Language

### Primary Influences
- **ESPN Classic** — dark backgrounds, bold channel branding, oversized score graphics
- **SportsCenter (2000–2010)** — lower thirds, anchor desk energy, the ESPN "SC" bug
- **Fox Sports / NBC Sports broadcast graphics** — scorebug-style overlays, metallic textures, neon accents
- **Late-night cable sports packages** — low production value, genuine, slightly grainy
- **VHS camcorder aesthetic** — tracking artifacts, scan noise, warm overexposure

### Color System
```
--phosphor-green: #39ff14   → Primary UI accent. Active states, channel names, NOW PLAYING.
--phosphor-amber: #ffb000   → Secondary accent. Vibe labels, channel surf arrows, warm highlights.
--background:     #0a0a0a   → Near-black. CRT off-state depth.
--foreground:     #e8e8e8   → Body text. Slightly off-white, not pure white.
```

Avoid: bright whites, saturated primary colors, pastel gradients, "modern dark mode" blue-grays.

### Typography
- **VT323** — The only font. Monospace. Retro. Broadcast terminal energy.
- All tracking: `widest` or `wide`. Letters should breathe like a score ticker.
- No serif. No sans-serif. One font, used with variation in size and brightness.

### Texture Effects
- **Scanlines** (`.scanlines`) — Always present on the player. Subtle but non-negotiable. Evokes CRT phosphor.
- **Phosphor glow** (`.phosphor-glow`) — Green text shadow on channel names and key identifiers.
- **Amber glow** (`.amber-glow`) — Warm shadow on vibe labels and secondary accents.
- **CRT vignette** — Inset box-shadow darkness at screen edges. Subtly curves the "screen."
- **TV cut** (`.tv-cut`) — White flash → black → transparent on video transitions. Real channel-change texture.
- **Power-on** (`.power-on`) — Boot flash on the homepage wordmark.

### Broadcast UI Components (vocabulary to use)
These elements should feel native to this product:

| Component | Broadcast analog |
|---|---|
| Channel number (CH 01) | Cable channel identifier |
| NOW PLAYING lower third | Broadcast lower-third graphic |
| ● REC / ● LIVE indicator | Broadcast recording bug |
| Vibe label (amber) | Broadcast genre/mood tag |
| CH ◄◄ / CH►► controls | Remote control CH+/CH– |
| ▓▒░ footer | Signal bars / broadcast noise |
| Boot status line | Broadcast hardware initialization |
| CHANNEL GUIDE divider | Cable guide section header |

### Things to Avoid Visually
- Drop shadows that feel like CSS box-shadows
- Rounded corners on anything that should feel like a broadcast
- White backgrounds or light mode
- Emoji used casually (only channel logos via ChannelLogo)
- Gradients that look like modern product design
- Any design trend from after 2015

---

## 4. Homepage / Menu Vision

### What It Should Feel Like
The homepage is a **cable guide** — a broadcast control room — a TV programming interface. It is not a SaaS landing page. It is not a grid of cards with hover animations.

The user should feel like they're:
- Browsing a late-night cable guide
- Scanning a sports package channel list
- Sitting in front of a broadcast control board

### Content Architecture Vision

**Themed Category Navigation**
Replace or augment the channel grid with category tabs styled like cable guide sections:

```
[ PLAYERS ]  [ ERAS ]  [ TEAMS ]  [ CHAOS ]  [ CLASSICS ]  [ GOLF ]  [ COLLEGE ]
```

Each tab filters the channel grid to relevant channels. No routing — instant filter.

**TV Guide Rows**
Channels presented as horizontal rows instead of a grid. Each row shows:
- Channel number on the left (like a cable guide column)
- Channel name + active video title
- Sport / era / vibe metadata
- TUNE IN indicator on hover

This mirrors the actual cable TV guide experience.

**Sports Ticker**
A scrolling ticker bar — bottom or top of the homepage — cycling through:
- Channel names and current video playing
- Retro sports facts
- "NOW ON CH 03: NFL Big Hits"

This adds ambient energy and reinforces the TV feel.

**Signal Acquired State**
On homepage load: brief boot sequence before channels appear. Status lines like:
```
SIGNAL ACQUIRED
LOADING CHANNEL GUIDE...
6 CHANNELS AVAILABLE
```
Then the channel grid fades in.

**Active Channel Highlight**
If the user was watching a channel before navigating back, that channel is highlighted in the guide. "CURRENTLY TUNED" indicator.

**TUNE IN Interaction**
Instead of "click to navigate," feel like "TUNE IN" — pressing a channel number on a remote. The transition from homepage to player should feel like a TV turning on.

---

## 5. Channel Viewing Vision

### Current Direction (Preserve This)

The channel player as rebuilt in Phase 6 is correct. Document it here so it doesn't regress:

**Full-Screen Immersive Playback**
The video fills the entire viewport. No content below the video. No visible page chrome. The browser UI is the only thing above the experience.

**Overlays Instead of Stacked Layouts**
All UI lives in overlays:
- Top gradient: channel identity (CH number, name, vibe)
- Bottom gradient: NOW PLAYING lower third + controls

Neither overlay is visible at rest. They fade in on mouse movement and fade out after 3 seconds of inactivity.

**Hidden UI Until Interaction**
The ideal state is: video playing, screen clear. Nothing between the viewer and the content. The viewer can watch for minutes without touching anything.

**NOW PLAYING Lower Third**
The bottom overlay should always evoke a broadcast lower third:
```
NOW PLAYING  Kobe Bryant 81 Point Game — Full Highlights (Jan 22, 2006)   1 / 6
```
This is not a web UI label. It is a broadcast graphic.

**Remote-Style Controls**
Controls are single-line, text-based, lowercase, symbolic:
```
◄ MENU  |  ◄◄ CH 05  ► NEXT  ⟳ SHUFFLE  CH 02 ►►
```
Not buttons. Not cards. Not a row of icons. Text on a broadcast overlay.

**Static / Tuning Transitions**
Every video change triggers a TV cut effect: white flash → black → new video. Fast. Decisive. Real.

**Continuous Playback**
Videos auto-advance. The channel keeps playing. The viewer never hits a dead state.

### Future Player Features (post-MVP)
- "TUNING..." static screen when loading
- Fake signal acquisition delay (100–300 ms) before video appears
- Volume visualization in the corner (like a broadcast)
- LIVE / TAPE DELAY indicator

---

## 6. Motion + Transition Philosophy

### The Rule: Quick Cuts, Not Animations

Broadcast TV cuts fast. It does not animate. A channel change is not a slide transition or a fade. It is a **cut** — white flash, black, new content.

### Approved Motion
| Motion | Where | Duration |
|---|---|---|
| TV cut (`.tv-cut`) | Video transitions | 500 ms |
| Overlay fade (opacity) | UI show/hide | 500 ms |
| Power-on (`.power-on`) | Homepage wordmark | 600 ms |
| Cursor blink (`.cursor`) | Boot status line | 1 s loop |
| Hover color transitions | Controls | 150–200 ms |

### Motion Restraint Rules
- **Never animate layout.** No sliding panels, no expanding cards, no collapsing sections.
- **Never loop.** Only the cursor blink is allowed to loop. Everything else plays once.
- **No parallax.** No scroll-triggered animation. No mouse-follow effects.
- **No bouncing.** No spring physics. No easing that overshoots.
- **Static > Motion.** When in doubt, don't animate. A sharp cut is more authentic than a smooth transition.

### The Exception: Signal Noise
Randomness is allowed when it evokes analog signal behavior:
- TV cut white flash
- Scanline flicker (CSS only)
- Grain overlays (static images)

---

## 7. Audio Philosophy

### The Reality of Browser Autoplay
Browsers mute autoplay unless the user has previously interacted with the domain or the video is muted. YouTube embeds handle this internally — they will mute to autoplay if needed, then the user can unmute.

### The Design Response
- Do not fight browser autoplay restrictions.
- Design the experience to feel complete even when muted.
- The visual experience (scanlines, overlays, transitions, lower thirds) should carry the product.
- A muted ESPN Classic highlight reel is still immersive.

### Future Audio Ideas (post-MVP)
- Optional soft TV static sound on channel change (Web Audio API, very quiet)
- Fake crowd noise as ambient background option
- "Tuning" frequency sweep on channel switch
- Retro broadcast bumper sounds ("You're watching RetroSportTV")
- All of these are opt-in, never autoplay

### What Not to Do
- No background music on the homepage (fighting the YouTube audio)
- No notification sounds
- No forced audio that would surprise users

---

## 8. Anti-Goals

These are specific things RetroSportTV.ge should **never feel like**, even as it grows:

| Anti-goal | What to avoid |
|---|---|
| Modern SaaS | No "hero section" with a headline and CTA button |
| Social media | No likes, comments, follows, shares, or engagement metrics |
| Infinite scroll | No endless feed of clips; channels have a curated list |
| Sports betting | No scores, live data, odds, or urgency design patterns |
| Dashboard | No data visualization, no usage stats, no admin-style layouts |
| Normal video website | No thumbnail hover previews, no view counts, no upload dates |
| Netflix browsing | No "because you watched" recommendations, no autoplay preview hover |
| Mobile-first app | Desktop lean-back is the primary experience |
| Accessibility theater | Don't add ARIA labels that describe broadcast elements as "buttons" — but do make the product actually navigable |

---

## 9. Three Homepage Concepts

### Concept A: Cable Guide Mode

**Layout**
Vertical list of channels. Each channel is a row:
```
┌──────────────────────────────────────────────────────┐
│ CH 01  🐍 KOBE TV           Basketball · Cold-blooded │ ▶ TUNE IN
│ CH 02  🏀 NBA 2000s         Basketball · Nostalgic    │ ▶ TUNE IN
│ CH 03  🏈 NFL BIG HITS      Football · Ferocious      │ ▶ TUNE IN
│ CH 04  🍀 BOSTON CLASSICS   Multi-sport · Blue-collar │ ▶ TUNE IN
└──────────────────────────────────────────────────────┘
```
Optional: right column shows "NOW ON:" with the current/first video title.

**Interaction Model**
Single click on any row tunes to that channel. Hover highlights the row with amber glow. Category tabs at top filter the list.

**Strengths**
- Closest to actual cable TV guide experience
- Scales cleanly to many channels
- Very readable at a glance
- Feels intentional, not like a generic web grid
- Easy to add a ticker bar below the header

**Weaknesses**
- Might feel flat without visual variety (no artwork/thumbnails)
- Less visually spectacular than option B or C
- Requires good empty-state design when the channel list is short (6 channels)

**Implementation Difficulty**
Low. Replace the current `ChannelGrid` card grid with a list layout. Category tabs are a simple `useState` filter. The current data model (channelNumber, sport, era, vibe) maps directly.

---

### Concept B: SportsCenter Control Room Mode

**Layout**
Full-width header with a featured/active channel playing or previewing. Below: a channel picker that looks like a broadcast switcher — small labeled screens or channel slots. Something like:
```
┌──────────────────────────────────────┐
│         FEATURED CHANNEL             │
│         [preview / static]           │
│         CH 01 · KOBE TV              │
└──────────────────────────────────────┘
   [CH01]  [CH02]  [CH03]  [CH04]  [CH05]  [CH06]
```

**Interaction Model**
The featured slot shows a live preview or a static "signal acquired" state. Clicking a channel slot in the bottom row previews it in the featured slot. Pressing TUNE IN commits to full-screen.

**Strengths**
- High visual impact
- Feels like a broadcast production environment
- The "preview before commit" model matches real channel surfing
- Dramatic and memorable

**Weaknesses**
- Harder to implement: requires either a small YouTube preview embed (iframe per channel = many embeds) or a static screenshot/thumbnail
- YouTube embeds muted in small iframes may still trigger rate limits or performance issues
- Doesn't scale well past ~8 channels
- Risk of feeling like a generic media player UI if not executed precisely

**Implementation Difficulty**
Medium-high. The preview embed approach is technically feasible but requires careful handling of multiple simultaneous YouTube iframes. A simpler version uses static images or animated CSS instead of live previews.

---

### Concept C: Sports Bar TV Wall Mode

**Layout**
A grid of "TVs" — stylized rectangles that look like mounted screens. Each shows the channel's emoji/logo, name, and sport. The grid is intentionally dense. Many screens, all on at once.
```
┌──────┐  ┌──────┐  ┌──────┐
│  🐍  │  │  🏀  │  │  🏈  │
│CH 01 │  │CH 02 │  │CH 03 │
└──────┘  └──────┘  └──────┘
┌──────┐  ┌──────┐  ┌──────┐
│  🍀  │  │  🐊  │  │  🐯  │
│CH 04 │  │CH 05 │  │CH 06 │
└──────┘  └──────┘  └──────┘
```
Each "TV" has a glow, a subtle scanline, and a CRT bezel feel. The current `ChannelCard` grid is close to this already.

**Interaction Model**
Clicking any TV tunes to that channel. Dense, spatial, and tactile. The "sports bar" metaphor is immediate.

**Strengths**
- Visually distinctive and on-brand
- Spatial/ambient — feels like a room full of TVs
- The current ChannelCard grid is ~50% of the way here already
- Scales interestingly with more channels (more TVs = better atmosphere)

**Weaknesses**
- At 6 channels, the grid feels sparse and the metaphor doesn't fully land
- Without live previews, the TVs feel like thumbnails
- Risks feeling like a generic "card grid" without careful visual execution
- Managing scanlines and glow on 6+ individual cards has performance implications

**Implementation Difficulty**
Low-medium. The current `ChannelCard` + `ChannelGrid` is already close. Evolving it toward the TV wall look requires styling refinement, not architecture changes.

---

### Recommendation

**Start with Concept A (Cable Guide Mode), styled like SportsCenter Classic.**

Reasons:
1. The channel player is already immersive and full-screen. The homepage just needs to deliver users to that experience confidently. It doesn't need to compete with the player.
2. A real cable guide is the truest expression of the product identity. It reinforces "you're choosing a channel" not "you're picking a video."
3. The current data model (channelNumber, sport, era, vibe) maps perfectly to cable guide rows.
4. It's the easiest to implement cleanly in the current Next.js architecture without touching the player.
5. Adding a sports ticker below the HomeHero and switching from cards to guide rows is a contained, low-risk redesign.
6. Concept B and C are available as future evolutions once there are more channels (10+).

---

## 10. Future Ideas (Not MVP)

These are deliberately out of scope but worth capturing so they don't get forgotten:

| Idea | Description |
|---|---|
| **Keyboard channel surfing** | Arrow keys / number keys to change channels. Complete remote control feel. |
| **Couch mode** | Auto-starts a random channel on load. Ideal for ambient/background viewing. |
| **Idle autoplay** | After 30 s of inactivity on homepage, fade into the last-watched or featured channel. |
| **Fake commercials** | Between clips: 15–30 s of intentionally cheesy "retro ad" interstitials. |
| **Programmable channel schedules** | Define a sequence of videos per channel that changes by day/time. |
| **Time-of-day programming** | "Late Night Sports" mode with different channel ordering after midnight. |
| **"Tonight on CH 03" blocks** | Programmable broadcast-style promos for upcoming clips. |
| **Fake broadcast interruptions** | "We interrupt this program..." moments. Breaking news style, fake/funny. |
| **Channel guide animation** | CRT boot sequence when first opening the site. Full "TV turning on" effect. |
| **Picture-in-picture mode** | Continue watching while browsing the channel guide. |
| **Sports ticker data** | Real-time scores or sports news headlines in a scrolling ticker. |
| **"What's on" preview** | Cable-guide-style 24-hour programming block view. All fake, all funny. |
| **Remote control mode** | Mobile phone as a remote for desktop viewing via local sync. |
| **Signal strength indicator** | Fake signal bars in the corner; fluctuate occasionally for atmosphere. |
| **VHS tracking effect** | Brief horizontal tear artifacts at the top of the player on channel change. |

---

*Last updated: 2026-05-27*
*Do not let this document drift. Update it when product direction changes.*
