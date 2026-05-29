# Spotify Soundtrack Mode — Design Document
### RetroSportTV.ge

> Status: Design only. No code, UI, or player changes have been made.

---

## 1. What Is Soundtrack Mode?

An optional mode that lets users mute the channel video audio and listen to sport-matched music while sports clips continue to play on screen. The experience is: lean back, sports on the TV, music in the ears, vibe locked in.

Think ESPN Classic on your TV while a curated playlist plays in the background. The music is ambient — it does not need to be synchronized with the video. It just sets the mood.

---

## 2. Approach Comparison

### Option A — Managed Sport/Category Playlists

We curate Spotify playlists organized by sport or vibe. Each channel inherits a soundtrack based on its sport and category. Users get a default soundtrack that just works, no configuration needed.

| Dimension | Assessment |
|---|---|
| Build effort | Low — just Spotify embeds + data mapping |
| UX | Seamless; user never has to think about it |
| Legal | Standard Spotify embed terms; no special licensing |
| Auth required | No |
| Control | Full — we pick every track |
| Maintenance | We own the playlists; must update over time |
| Fit with product vibe | Excellent — matches the curated cable-channel feel |
| Limitations | User cannot bring their own music; Spotify required |

**Assessment:** Best fit for MVP. Low build complexity, high product coherence, zero auth friction.

---

### Option B — User-Provided Spotify Playlist URLs

Users paste a Spotify playlist URL into a field. We extract the playlist ID and embed it. The user's playlist plays while they watch. Can be stored in `localStorage` to persist.

| Dimension | Assessment |
|---|---|
| Build effort | Low-medium — URL parsing + embed + localStorage |
| UX | Requires user action; power-user feature |
| Legal | User-provided content; no licensing concerns for us |
| Auth required | No (embed-only approach) |
| Control | None — user owns the experience |
| Maintenance | None on our side |
| Fit with product vibe | Good as an override; wrong as the default |
| Limitations | User must have Spotify, must know how to get a playlist URL |

**Assessment:** Good as a Phase 2 enhancement layered on top of Option A. Wrong as a standalone MVP approach because most users will not configure anything.

---

### Option C — Full Spotify Login / Web Playback SDK

Users log in via Spotify OAuth. We use the Web Playback SDK to control playback from within the app — play, pause, seek, show now-playing metadata.

| Dimension | Assessment |
|---|---|
| Build effort | High — OAuth flow, token management, SDK integration, premium gating |
| UX | Most powerful; full playback control |
| Legal | Requires Spotify Developer Agreement compliance; commercial use review |
| Auth required | Yes — Spotify account + Premium required for SDK playback |
| Control | Full programmatic control |
| Maintenance | High — token refresh, SDK updates, policy changes |
| Fit with product vibe | Possibly over-engineered for background ambient use |
| Limitations | Locks out non-Premium users; significant complexity; policy risk |

**Assessment:** Avoid for MVP. Worth revisiting after the core product is validated and if users explicitly request deeper Spotify integration.

---

### Option D — Hybrid: Managed Defaults + User Override

Default to managed sport/category playlists (Option A). Allow power users to paste their own Spotify playlist URL as a channel-specific or global override (Option B). Store override in `localStorage`.

| Dimension | Assessment |
|---|---|
| Build effort | Medium — managed embeds + URL field + localStorage |
| UX | Best of both: zero-config default + optional customization |
| Legal | Same as A + B |
| Auth required | No |
| Control | Managed for most users, user-driven for power users |
| Maintenance | We maintain managed playlists; user overrides maintain themselves |

**Assessment:** This is the right long-term architecture. The path there is: build Option A first, then add Option B on top.

---

## 3. Recommended MVP

**Build Option A: Managed playlists via Spotify iframe embed.**

Reasons:
- Zero auth friction — any visitor gets a soundtrack without logging in.
- Fits the retro cable-channel product identity: we curate everything.
- Simple implementation: one `<iframe>` per active soundtrack, hidden/shown by a toggle.
- No Spotify SDK complexity, no token management, no Premium gating.
- Delivers genuine user value immediately.

The one UX limitation to accept: the user must press Play inside the Spotify embed. Browser autoplay policies block audio without user gesture. This is expected and should be clearly communicated in the UI ("Press play in the music panel").

---

## 4. Managed Playlist Model

### Sport/Category Soundtrack Map

Each `SoundtrackKey` maps to a curated Spotify playlist. Channels inherit based on their `sport` and `category` fields. The resolver (see Section 7) handles edge cases and fallbacks.

| Soundtrack Key | Label | Vibe | Channel Examples |
|---|---|---|---|
| `basketball` | Basketball Mix | Hype trap, 90s hip-hop, arena energy | Kobe TV, Jordan TV, D-Rose TV, NBA 2000s |
| `football` | Football Mix | Stadium anthems, hard rap, cinematic | Brady Channel, Megatron TV, Randy Moss TV, Beast Mode TV, Prime Time TV |
| `wrestling` | Wrestling/Attitude Era Mix | Nu-metal, hard rock, pyro-era WWF/WWE | WWE Attitude Era, Stone Cold TV, The Rock Channel, Undertaker Streak TV |
| `combat` | Combat Mix | Dark trap, fight-night intensity | UFC Knockout Channel, Mike Tyson TV |
| `golf` | Golf Chill Mix | Lo-fi, ambient, Sunday afternoon calm | Tiger Sundays, Tiger Sundays Expansion |
| `baseball` | Baseball Summer Mix | Classic rock, warm nostalgia | Boston Classics (future baseball channels) |
| `college` | College Gameday Mix | Fight songs energy, crowd anthems | College Football Chaos, BCS Era CFB, March Madness TV |
| `general` | Retro Sports Mix | 80s/90s greatest hits, SportsCenter energy | SportsCenter Classics, Random Sports Compilations, NBA Finals Channel |

### Channel-to-Soundtrack Inheritance Examples

```
Kobe TV           → basketball
Jordan TV         → basketball
D-Rose TV         → basketball
NBA 2000s         → basketball
Inside the NBA    → basketball

Brady Channel     → football
Megatron TV       → football
Randy Moss TV     → football
Beast Mode TV     → football
Prime Time TV     → football
Vick Experience   → football
Lamar Jackson TV  → football
Patriots Dynasty  → football
NFL Big Hits      → football
NFL 90s Smashmouth → football
NFL Classics Vault → football

WWE Attitude Era  → wrestling
Stone Cold TV     → wrestling
The Rock Channel  → wrestling
Undertaker Streak TV → wrestling

UFC Knockout Channel → combat
Mike Tyson TV     → combat

Tiger Sundays     → golf
Tiger Sundays Expansion → golf

College Football Chaos → college
BCS Era CFB       → college
March Madness TV  → college

Florida Gators TV → college
NBA Finals Channel → basketball
Super Bowl Channel → football
SportsCenter Classics → general
```

---

## 5. User-Provided Playlist Model (Phase 2)

### Embed-Only Approach — No Auth Required

Spotify provides an embed URL for any public playlist. A user who pastes `https://open.spotify.com/playlist/37i9dQZF1DX...` can have that playlist rendered in an iframe.

```
Input:  https://open.spotify.com/playlist/{playlistId}
Embed:  https://open.spotify.com/embed/playlist/{playlistId}
```

We never hit the Spotify API for this. We simply extract the ID from the pasted URL and construct the embed URL. No auth, no tokens, no backend.

### localStorage Persistence

Store the user's custom playlist URL per channel slug, or as a global override:

```ts
// Global override
localStorage.setItem("retrotv:soundtrack:userPlaylist", playlistUrl)

// Per-channel override (future)
localStorage.setItem(`retrotv:soundtrack:${channelSlug}`, playlistUrl)
```

On load, check for a saved override and prefer it over the managed default.

### UX Pattern

A small "Use my playlist" link appears in the soundtrack panel. Clicking it opens a text field for the user to paste a Spotify playlist URL. On submit, we validate the URL format (must be `open.spotify.com/playlist/...`), construct the embed URL, and save to `localStorage`. The panel updates immediately.

A "Reset to default" option clears the override and restores the managed soundtrack.

### Limitations

- Requires the user to have a Spotify account.
- The pasted playlist must be public (private playlists do not embed).
- The user must know how to find and copy a Spotify playlist URL.
- Still cannot autoplay — user must press Play in the embed panel.
- Cannot read back what the user pasted on other devices (localStorage is device-local).

---

## 6. Full Spotify SDK Model — Why to Avoid for MVP

The Spotify Web Playback SDK enables full in-app playback control: play, pause, seek, now-playing metadata, volume control. It is significantly more powerful than an iframe embed.

### Why not for MVP

- **Premium required.** The Web Playback SDK only works for Spotify Premium subscribers. This immediately gates the feature from free-tier users.
- **OAuth required.** Users must log in with Spotify, which adds friction and a redirect flow.
- **Token management.** Access tokens expire and must be refreshed. This requires either a backend route or edge function.
- **Complexity.** SDK initialization, device registration, state management, and error handling are non-trivial.
- **Policy risk.** Spotify's commercial use policies are strict. If RetroSportTV.ge becomes commercial, Spotify partnership or licensing may be required.
- **Overkill for ambient use.** Users do not need to seek or see now-playing for background music while watching sports. The embed is sufficient.

**Recommendation:** Do not build the Web Playback SDK path. If Spotify integration matures into a core product feature — not just ambient mode — revisit. That decision belongs in Phase 7 at the earliest.

---

## 7. Data Model Proposal

### `data/soundtracks.ts`

```ts
export type SoundtrackKey =
  | "basketball"
  | "football"
  | "wrestling"
  | "combat"
  | "golf"
  | "baseball"
  | "college"
  | "general";

export type SoundtrackPreset = {
  key: SoundtrackKey;
  label: string;
  description: string;
  spotifyPlaylistUrl: string;   // e.g. https://open.spotify.com/playlist/{id}
  spotifyEmbedUrl: string;      // e.g. https://open.spotify.com/embed/playlist/{id}
};

export const SOUNDTRACK_PRESETS: Record<SoundtrackKey, SoundtrackPreset> = {
  basketball: {
    key: "basketball",
    label: "Basketball Mix",
    description: "90s hip-hop, trap, arena hype. Built for hardwood legends.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  football: {
    key: "football",
    label: "Football Mix",
    description: "Stadium anthems and hard rap for the gridiron.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  wrestling: {
    key: "wrestling",
    label: "Attitude Era Mix",
    description: "Nu-metal, hard rock, pyro era. Glass shatters optional.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  combat: {
    key: "combat",
    label: "Combat Mix",
    description: "Dark trap, fight-night energy. Walk-out intensity.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  golf: {
    key: "golf",
    label: "Golf Chill Mix",
    description: "Lo-fi and ambient calm for Sunday afternoon majors.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  baseball: {
    key: "baseball",
    label: "Baseball Summer Mix",
    description: "Classic rock and warm nostalgia for America's game.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  college: {
    key: "college",
    label: "College Gameday Mix",
    description: "Fight songs, crowd anthems, College GameDay energy.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
  general: {
    key: "general",
    label: "Retro Sports Mix",
    description: "SportsCenter classics and 80s/90s greatest hits.",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/PLACEHOLDER",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/PLACEHOLDER",
  },
};
```

### Optional Future Fields on `Channel` type

```ts
// In lib/types.ts — add when Phase 4 is ready
soundtrackKey?: SoundtrackKey;        // explicit override; resolver falls back to inference
allowCustomPlaylist?: boolean;         // default true; set false to lock a channel to managed mix
```

### Optional `localStorage` Keys (Phase 5)

```
retrotv:soundtrack:userPlaylist         — global user override playlist URL
retrotv:soundtrack:{channelSlug}        — per-channel user override (future)
retrotv:soundtrack:enabled              — whether soundtrack mode is on or off (persisted)
```

---

## 8. Resolver Logic

```ts
// lib/soundtrack.ts

function getSoundtrackForChannel(
  channel: SportsChannel,
  userOverrideUrl?: string
): SoundtrackPreset | null {

  // 1. User override (Phase 5+)
  if (userOverrideUrl) {
    return buildCustomPreset(userOverrideUrl);
  }

  // 2. Explicit soundtrackKey on the channel (optional field, Phase 4+)
  if (channel.soundtrackKey) {
    return SOUNDTRACK_PRESETS[channel.soundtrackKey] ?? null;
  }

  // 3. Infer from sport field
  const sportKey = inferSoundtrackFromSport(channel.sport);
  if (sportKey) {
    return SOUNDTRACK_PRESETS[sportKey];
  }

  // 4. Infer from category
  const categoryKey = inferSoundtrackFromCategory(channel.categories);
  if (categoryKey) {
    return SOUNDTRACK_PRESETS[categoryKey];
  }

  // 5. Fallback
  return SOUNDTRACK_PRESETS["general"];
}

function inferSoundtrackFromSport(sport?: string): SoundtrackKey | null {
  const map: Record<string, SoundtrackKey> = {
    basketball: "basketball",
    football: "football",
    wrestling: "wrestling",
    mma: "combat",
    boxing: "combat",
    golf: "golf",
    baseball: "baseball",
    "college football": "college",
    "college basketball": "college",
  };
  return sport ? (map[sport.toLowerCase()] ?? null) : null;
}

function inferSoundtrackFromCategory(
  categories?: string[]
): SoundtrackKey | null {
  if (!categories?.length) return null;
  if (categories.includes("CHAOS")) return "general";
  if (categories.includes("COLLEGE")) return "college";
  if (categories.includes("CLASSICS")) return "general";
  return null;
}
```

---

## 9. Player UI Concept

### Audio Toggle

A two-state toggle in the player control overlay:

```
[ CHANNEL AUDIO ]  [ SOUNDTRACK ]
```

- Default state: **CHANNEL AUDIO** (existing behavior, no change)
- When user switches to **SOUNDTRACK**:
  - YouTube player volume muted (programmatically via YT IFrame API `player.mute()`)
  - Spotify embed panel slides in (bottom of screen or side panel)
  - Panel shows: soundtrack name, description, and the Spotify embed iframe
  - User presses Play inside the Spotify embed
- When user switches back to **CHANNEL AUDIO**:
  - YouTube player unmuted (`player.unMute()`)
  - Spotify panel hidden
  - Spotify embed iframe removed from DOM (stops playback)

### Spotify Embed Panel Placement

Options:
- **Bottom bar** — a ~200px panel slides up from the bottom of the screen, beneath the video controls. Compact. Works on mobile. Always visible while active.
- **Side drawer** — a panel slides in from the right. More space for the Spotify player UI. Better on desktop. May cover content on mobile.

Recommendation: **Bottom bar** for MVP. Simpler layout, works everywhere.

### Autoplay Note in UI

Because browsers block audio autoplay without a user gesture, the panel should include a brief, in-brand note:

```
🎵 SOUNDTRACK SIGNAL LOCKED — PRESS PLAY TO TUNE IN
```

This sets expectations and fits the retro broadcast tone.

### Channel Switching Behavior

When the user switches channels:
- Soundtrack mode state persists (if it was on, stays on).
- A new `getSoundtrackForChannel()` call runs for the new channel.
- If the new channel's soundtrack key is different, the Spotify embed updates.
- If it is the same key, the embed stays mounted (Spotify continues playing).
- If the new channel has no soundtrack, mode is disabled and toggle is hidden.

---

## 10. Homepage UI Concept (Optional Badges)

Channel rows in the guide could show small broadcast-style badges:

| Badge | Meaning |
|---|---|
| `🎵 SOUNDTRACK` | Channel has a managed soundtrack available |
| `🎵 MIX AVAILABLE` | Alternative label; subtler |
| `🎵 USER MIX` | User has set a personal playlist for this channel |

Implementation: `ChannelRow` reads whether a soundtrack resolves for the channel. If yes, renders a small pill badge.

Do not implement until Phase 6. The core player toggle matters far more than the discovery badge.

---

## 11. Key Limitations to Accept

| Limitation | Impact | Mitigation |
|---|---|---|
| Spotify iframe has its own UI | We cannot customize how the Spotify player looks | Accept it; frame it as a feature not a bug |
| Cannot programmatically start playback | User must press Play in the embed | Add clear in-brand prompt copy |
| Browser autoplay restrictions on audio | Play will never autostart | Expected behavior; document in UI |
| Spotify required for any soundtrack | Non-Spotify users get no music | Core app must work without soundtrack mode; it is optional |
| Spotify Free tier may have ads | Interrupts the vibe | Acknowledge in docs; cannot fix |
| Private playlists cannot embed | User-provided playlists must be public | Validate and prompt on input |
| localStorage is device-local | User override does not sync across devices | Acceptable at this stage |
| SDK Premium gate | Full control requires SDK which requires Premium | Avoid SDK path for MVP |

---

## 12. Recommendation

### MVP — Phase 4: Managed Playlists + Iframe Embed

Build `data/soundtracks.ts` with 8 curated Spotify playlists, wire the resolver, add the audio toggle to the player, and mount/unmute/hide the Spotify embed panel. No auth. No user settings. No localStorage. Just the toggle and the embed.

This gives users the full soundtrack vibe in one clean feature.

Your leaning (managed playlists first, user override second, SDK never) is correct. No reason to challenge it.

### Phase 2 — User Playlist Override

Add a "Use my playlist" field to the soundtrack panel. Parse the URL, embed it, save to `localStorage`. Clear it with a reset button. No auth.

### Phase 3 — Consider Full Spotify SDK

Only if: soundtrack mode has become a defining feature, users are requesting Spotify account integration, and you have a backend for token refresh. At that point, evaluate the policy implications and Premium gating. Do not build this speculatively.

---

## 13. Implementation Phases

| Phase | Milestone | What Changes |
|---|---|---|
| **Phase 1** | Design doc | `SPOTIFY_SOUNDTRACK_MODE.md` (this file) |
| **Phase 2** | Data layer | `data/soundtracks.ts` with 8 `SoundtrackPreset` entries using real Spotify playlist IDs |
| **Phase 3** | Resolver | `lib/soundtrack.ts` — `getSoundtrackForChannel()` with sport/category inference and fallback |
| **Phase 4** | Player toggle + embed | `ChannelPlayer.tsx` — audio toggle button, `player.mute()`/`player.unMute()`, Spotify iframe panel |
| **Phase 5** | User custom playlist | Soundtrack panel — "Use my playlist" field, URL validation, `localStorage` persistence, reset button |
| **Phase 6** | Homepage badges | `ChannelRow.tsx` — optional `SOUNDTRACK` badge when resolver finds a match |
| **Phase 7** | (Optional) Spotify SDK | Only if Phase 4–5 validates strong user demand; evaluate auth/Premium/policy risks first |

---

## 14. QA Checklist

When Phase 4 is built, test:

- [ ] Toggle switches from CHANNEL AUDIO to SOUNDTRACK — YouTube player mutes
- [ ] YouTube mute is confirmed (no audio leaks through)
- [ ] Spotify embed panel appears on SOUNDTRACK mode
- [ ] Spotify embed panel is hidden on CHANNEL AUDIO mode
- [ ] Spotify embed is removed from DOM when panel hides (stops background audio drain)
- [ ] User can press Play in Spotify embed and hear music
- [ ] Switching channels in SOUNDTRACK mode — embed updates if soundtrack key changes
- [ ] Switching channels in SOUNDTRACK mode — embed stays mounted if key is the same
- [ ] Channel with no soundtrack — toggle not shown, no embed rendered
- [ ] SOUNDTRACK mode persists across channel switches if same key
- [ ] Mobile layout — embed panel does not obscure player controls
- [ ] Overlay auto-hide behavior — soundtrack panel not affected by overlay hide timer
- [ ] No console errors or layout breaks on channels without soundtrackKey
- [ ] Browser refresh — soundtrack mode does not persist (unless explicitly stored in localStorage)
- [ ] Two channels with different soundtrackKeys in sequence — correct embed for each

---

## 15. Open Questions

Decisions still to be made before Phase 2 begins:

1. **Do we curate the Spotify playlists ourselves?** Someone needs to build and maintain 8 playlists. This is editorial work, not engineering work.

2. **Do we create a RetroSportTV Spotify account?** If yes, playlists can be public and branded. Recommended. Otherwise playlists would live on a personal account.

3. **How do we handle Spotify Free tier ads?** We cannot suppress them. Do we warn users, or just accept it? Consider adding a note: "Works best with Spotify Premium."

4. **Should soundtrack mode persist between sessions?** Store `retrotv:soundtrack:enabled` in `localStorage` so it remembers the user's preference?

5. **Where exactly does the panel live?** Bottom bar vs side drawer. Needs a design decision before Phase 4.

6. **Does the toggle appear for all channels, or only channels with a resolved soundtrack?** If a channel has no soundtrack, should the toggle be hidden or grayed out?

7. **Should users be able to switch soundtracks manually?** E.g., show a soundtrack selector so a user watching Kobe TV can swap from Basketball Mix to Golf Chill Mix if they want.

8. **Do we allow user playlist URLs in MVP (Phase 4), or only in Phase 5?** Keeping Phase 4 purely managed keeps scope smaller.

9. **What happens if the Spotify embed fails to load?** Rate limit, network error, deleted playlist — need a graceful fallback state in the panel.

10. **Do we advertise this feature on the homepage, in the hero, or only in the player?** Discovery path matters for adoption.

---

*Last updated: 2026-05-29*
