# Content Research Guide — RetroSportTV.ge

This guide defines how future agents should research YouTube videos for deeper channels before importing anything into live channel data.

Research work should produce candidate files in `data/intake/`. It should not directly edit `data/channels.ts` unless the user explicitly asks to import approved candidates.

## Workflow

1. Read `data/researchQueue.ts` for the target channel.
2. Search YouTube manually, or use a future YouTube Data API script.
3. Save promising candidates into `data/intake/<channel-slug>-candidates.json`.
4. Review candidates for relevance, duplicate moments, source quality, and likely embed availability.
5. Import later with:

```bash
npm run content:import-videos -- data/intake/<channel-slug>-candidates.json
```

6. Run `npm run lint` and `npm run build`.
7. Verify newly imported videos in the browser by opening the channel page and confirming the YouTube embeds play.
8. Commit the candidate file and/or imported channel data as separate, reviewable changes.

## Using Research Queue

`data/researchQueue.ts` is the planning layer. For each `channelSlug`, use:

- `searchQueries` as starting YouTube searches.
- `mustIncludeTags` as required metadata themes for candidates.
- `avoidTerms` to filter out weak or off-brand results.
- `preferredSources` to prioritize official or trusted uploads.
- `notes` for channel-specific editorial direction.

The queue is guidance, not an importer. Candidate files remain local JSON until explicitly imported.

## Searching YouTube

Manual search is acceptable for Stage 1. Search YouTube with the queue's phrases, then inspect:

- title relevance;
- source/channel name;
- duration and format;
- thumbnail quality;
- whether it is a highlight/game clip versus commentary;
- whether another candidate covers the same moment better.

Future YouTube Data API scripts should use the same research queue, then enrich candidates with title, duration, thumbnail, source channel, and embeddable status before review.

## Candidate JSON Format

Candidate files use the same shape as the bulk importer:

```json
{
  "channelSlug": "kobe-tv",
  "videos": [
    {
      "urlOrId": "https://www.youtube.com/watch?v=REPLACE_WITH_REAL_ID",
      "title": "Video title",
      "tags": ["kobe", "lakers", "nba"],
      "vibeTags": ["iconic", "clutch"],
      "qualityScore": 90
    }
  ]
}
```

Use real YouTube URLs or IDs only when verified. If a file is just a template, use `REPLACE_WITH_YOUTUBE_URL` so it cannot be mistaken for a real candidate.

To create an empty candidate file:

```bash
npm run content:create-intake -- kobe-tv
```

This writes `data/intake/kobe-tv-candidates.json` with an empty `videos` array. It refuses to overwrite existing files unless called with `--force`.

## Quality Score

Use a simple 0-100 score:

- `90-100`: Iconic, high-quality, strongly relevant, good upload, strong highlight value.
- `75-89`: Very good fit, relevant, likely worth including.
- `60-74`: Acceptable filler, but not a top clip.
- Below `60`: Do not include unless specifically needed.

Quality is editorial, not just video resolution. Reward official sources, strong sports nostalgia, clean titles, useful duration, and replay value.

## Selection Rules

Every candidate should be:

- relevant to the channel identity;
- preferably highlight or game footage;
- preferably from official league, team, broadcast, or trusted highlight uploads;
- not a podcast, reaction, debate, or talking-head clip unless the channel specifically calls for it;
- not a Short unless intentionally building a Shorts-style channel;
- not a low-quality fan edit with unreadable video;
- not a duplicate moment unless the upload quality is clearly better;
- not obviously embed-blocked, unavailable, or region-restricted.

Avoid importing a weaker duplicate just to make a channel longer. Depth should feel curated, not padded.

## Duplicate Handling

Before importing, compare candidates against existing videos in `data/channels.ts`. The importer skips duplicate IDs already present in the target channel, but it cannot detect duplicate moments with different uploads. Human review should remove weaker duplicates before import.

## Channel Briefs

### Kobe TV

Research Kobe iconic scoring games, clutch moments, Lakers playoff highlights, the 81-point game, the final game, and the 2000s Lakers era. Prefer official NBA or Lakers uploads when available.

Avoid random debate shows, reaction clips, podcast segments, and legacy rankings that do not include meaningful highlight footage.

### NBA 2000s

Research Allen Iverson, Vince Carter, Shaq/Kobe, T-Mac, early LeBron, D-Wade, Pistons, Spurs, Suns, classic playoff games, dunk contests, and SportsCenter-era highlight packages.

Avoid modern reaction compilations, thin ranking videos, and clips that feel outside the 2000-2009 era.

### NFL Big Hits

Research legal classic big hit compilations, defensive highlight packages, NFL Films-style clips, hard-hitting rivalries, and iconic defensive players.

Avoid injury-focused exploitative clips, low-quality reposts, and videos framed around players getting hurt.

### Boston Sports Classics

Research Celtics, Patriots, Red Sox, and Bruins classic moments, championship highlights, comeback wins, local broadcast nostalgia, and Boston legends.

Prefer official team, league, or broadcast uploads. Keep the channel about classic Boston sports moments, not current talk radio.

### Florida Gators TV

Research the Tim Tebow era, Steve Spurrier era, national championship highlights, SEC rivalry games, and iconic Florida football moments.

Prefer ESPN, SEC Network, school, or broadcast uploads. Avoid recruiting rumors, current debate clips, and betting content.

### Tiger Sundays

Research Tiger Woods final rounds, Masters moments, Sunday red highlights, iconic clutch putts, major championship runs, and broadcast-length official clips.

Prefer PGA TOUR, The Masters, USGA, and Golf Channel uploads. Avoid swing tutorials, golf tips, reaction clips, and generic motivational edits.

## After Import QA

After importing candidates:

1. Start the app with `npm run dev`.
2. Open the affected channel page.
3. Confirm the new videos play as official YouTube embeds.
4. Use next/shuffle to verify the playlist still advances.
5. Check the homepage preview monitor for the affected channel.
6. Run `npm run lint` and `npm run build`.

