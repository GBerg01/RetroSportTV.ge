# Content Pipeline — RetroSportTV.ge

This document defines the Stage 1 local content engine for building deeper RetroSportTV.ge channels. The current MVP still runs from local files, with no database, auth, admin panel, or external API dependency.

## Goal

Channels should grow from hand-picked seed videos into deeper, validated playlists. Future agents should be able to research candidate videos, normalize YouTube IDs, enrich metadata, score quality, and compose playlists without changing the player or homepage UI.

## Source Of Truth

- `data/channels.ts` remains the local source of channel data used by the app.
- `lib/types.ts` defines reusable `SportsChannel`, `SportsVideo`, `PlaylistRule`, and validation-related types.
- `lib/content/playlist.ts` contains pure playlist composition helpers.
- `lib/content/validation.ts` contains pure YouTube ID and URL helpers.
- `data/researchQueue.ts` lists channel expansion targets and search guidance.

## Research Queue

`data/researchQueue.ts` is a planning queue for future content collection work. Each target includes:

- `channelSlug`: existing or future channel slug.
- `searchQueries`: queries a future script or agent should run.
- `mustIncludeTags`: metadata that candidate videos should satisfy.
- `avoidTerms`: phrases that usually indicate low-quality or off-brand results.
- `preferredSources`: official leagues, teams, broadcasters, or trusted highlight channels.
- `notes`: channel-specific curation guidance.

The queue does not fetch anything by itself. It is deliberately local and reviewable.

## Candidate Retrieval

Stage 1 does not call external APIs. Future scripts should read `RESEARCH_QUEUE`, retrieve candidate YouTube results, and write draft candidates for human or automated review.

The future retrieval order should be:

1. Official league/team/broadcast sources.
2. Long-form highlight packages with stable titles and thumbnails.
3. Fan uploads only when no official embeddable version exists.

Avoid reaction videos, podcasts, betting content, video game footage, and clips whose title does not match the target channel.

## Adding One Video Locally

Use the local add-video script when you already have a YouTube URL or video ID and want to append it to an existing channel:

```bash
npm run content:add-video -- <channel-slug> <youtube-url-or-id> "<title>" [--tags tag1,tag2] [--qualityScore 80]
```

Example:

```bash
npm run content:add-video -- kobe-tv https://youtu.be/0RvPKROSXEQ "Kobe Bryant 81 Point Game" --tags kobe,lakers,nba --qualityScore 95
```

The script:

- extracts and validates the YouTube ID using `lib/content/validation.ts`;
- rejects invalid IDs;
- rejects duplicate IDs within the same channel;
- appends an approved, embeddable `SportsVideo` object to `data/channels.ts`;
- stores the canonical YouTube watch URL and thumbnail URL;
- does not call external APIs.

After adding a video, run `npm run lint` and `npm run build` before committing.

## Validation

Validation starts with `lib/content/validation.ts`.

Use `extractYouTubeId(input)` to accept raw IDs, watch URLs, short URLs, embed URLs, shorts URLs, or live URLs. Use `normalizeYouTubeUrl(url)` to store canonical watch URLs. Use `getYouTubeEmbedUrl(id, options)` when a script or component needs a legal official embed URL.

Stage 1 validation is structural only:

- YouTube IDs must be 11 characters.
- URLs must resolve to recognizable YouTube ID patterns.
- No network calls are made.

Future validation can add YouTube Data API checks for availability, duration, thumbnails, titles, and embed permission. Results should write to `approved`, `embeddable`, `validationStatus`, and `lastCheckedAt` on each `SportsVideo`.

## Quality Score

`qualityScore` should be a simple 0-100 number. Suggested scoring:

- 90-100: official source, iconic moment, strong title, good duration, embeddable.
- 70-89: good source and relevant, but less iconic or shorter context.
- 50-69: useful filler, acceptable quality, may need replacement later.
- Below 50: keep out of default playlists unless manually approved for a specific reason.

Signals to reward:

- Official or trusted source.
- Broadcast footage with real game context.
- Clear title matching the channel.
- Appropriate length for lean-back viewing.
- Strong nostalgia fit and replay value.

Signals to penalize:

- Reaction/podcast/debate format.
- Misleading title.
- Too short for the channel experience.
- Poor upload quality.
- Embed disabled or unavailable.

## Playlist Composition

`lib/content/playlist.ts` defines the app-side playlist framework:

- `getApprovedVideos(channel)` removes videos explicitly marked unapproved, not embeddable, invalid, unavailable, or not embeddable.
- `sortVideosForChannel(channel)` ranks approved videos by `qualityScore`, preserving original order as the fallback.
- `buildChannelPlaylist(channel)` applies the sorted approved list and respects a future `maxVideos` playlist rule.
- `pickPreviewVideo(channel)` selects the first playable preview candidate.
- `pickNextVideo(videos, currentVideoId)` wraps through playable videos.
- `pickRandomVideo(videos, excludeVideoId)` avoids repeating the current video when possible.

Missing metadata should not break the MVP. Legacy videos without `approved`, `embeddable`, or `qualityScore` are treated as playable and sorted after scored videos.

## YouTube Policy Boundary

RetroSportTV.ge uses official YouTube embeds only. Do not download, rip, proxy, transcode, or rehost video content. The content pipeline may discover and validate YouTube IDs, but playback must remain through YouTube embed URLs.

## Future Path

The next practical stages are:

1. Add a local script that reads `RESEARCH_QUEUE` and writes candidate JSON files.
2. Add optional YouTube Data API lookup for title, thumbnail, duration, channel title, and embeddable status.
3. Add a review step that promotes approved candidates into `data/channels.ts`.
4. Move channel/video records into a database only after the local workflow proves useful.
5. Add admin tooling after the data model and curation rules stabilize.

Until then, keep the local-data MVP working and keep UI components insulated from discovery and validation logic.
