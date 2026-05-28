# Product Brief — RetroSportTV.ge

## Tagline
*Channel-surf the greatest sports moments, old-school style.*

## What It Is
RetroSportTV.ge is a web app that lets sports fans relive great moments by surfing themed YouTube highlight channels through a nostalgic CRT TV interface. No searching, no playlists — just flip to a channel and let it play.

## Target User
Sports fans who grew up watching ESPN, TNT, or NFL Network in the late 90s/2000s and want a fun, frictionless way to watch curated highlights without the YouTube rabbit hole.

## Core Experience
1. **Home screen** — a grid of themed channels (e.g. "NBA 2000s", "Kobe TV", "NFL Big Hits", "Boston Classics").
2. **Player screen** — opens a channel; YouTube embed plays the first video. CRT scanline/glow overlay wraps the player.
3. **Controls** — Next video, Shuffle, and a Channel Dial to switch channels without going back to home.
4. **Shareable URLs** — every channel has a clean URL (`/channel/kobe-tv`) users can share.

## Example Channels (Seed Data)
| Channel | Theme |
|---|---|
| NBA 2000s | Best NBA plays from 2000–2009 |
| Kobe TV | Kobe Bryant highlights |
| NFL Big Hits | Biggest NFL hits and tackles |
| Boston Classics | Celtics, Patriots, Red Sox legends |
| MJ Moments | Michael Jordan highlights |
| Soccer Goals | Iconic international goals |

## What It Is NOT (MVP)
- Not a video host — YouTube embeds only
- Not a social app — no accounts or comments
- Not a search engine — curated channels, not user-generated
- Not monetized — no payments or ads in MVP

## Success Metric (MVP)
A friend can open the link, pick a channel, and watch 3+ videos in a row without touching anything. The retro vibe makes them smile.

## Design Direction
- Dark background (#0a0a0a or similar)
- Green/amber phosphor glow on text
- Scanline CSS overlay on the video player
- Chunky pixel or retro sans-serif font (e.g. VT323, Press Start 2P, or similar Google Font)
- Channel number display, like "CH 04"
- Slight screen curvature (border-radius + perspective CSS)
