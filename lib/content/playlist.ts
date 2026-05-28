import type { SportsChannel, SportsVideo } from "@/lib/types";

function isPlayable(video: SportsVideo): boolean {
  return (
    video.approved !== false &&
    video.embeddable !== false &&
    video.validationStatus !== "invalid" &&
    video.validationStatus !== "unavailable" &&
    video.validationStatus !== "not-embeddable"
  );
}

function qualityScore(video: SportsVideo): number {
  return video.qualityScore ?? 0;
}

export function getApprovedVideos(channel: SportsChannel): SportsVideo[] {
  return channel.videos.filter(isPlayable);
}

export function sortVideosForChannel(channel: SportsChannel): SportsVideo[] {
  return [...getApprovedVideos(channel)].sort((a, b) => {
    const scoreDelta = qualityScore(b) - qualityScore(a);
    if (scoreDelta !== 0) return scoreDelta;
    return channel.videos.indexOf(a) - channel.videos.indexOf(b);
  });
}

export function buildChannelPlaylist(channel: SportsChannel): SportsVideo[] {
  const sorted = sortVideosForChannel(channel);
  const maxVideos = channel.playlistRules
    ?.map((rule) => rule.maxVideos)
    .find((count): count is number => typeof count === "number" && count > 0);

  return typeof maxVideos === "number" ? sorted.slice(0, maxVideos) : sorted;
}

export function pickPreviewVideo(channel: SportsChannel): SportsVideo | undefined {
  return buildChannelPlaylist(channel)[0] ?? channel.videos.find(isPlayable);
}

export function pickNextVideo(
  videos: SportsVideo[],
  currentVideoId?: string
): SportsVideo | undefined {
  const playable = videos.filter(isPlayable);
  if (playable.length === 0) return undefined;
  if (!currentVideoId) return playable[0];

  const currentIndex = playable.findIndex((video) => video.id === currentVideoId);
  if (currentIndex === -1) return playable[0];
  return playable[(currentIndex + 1) % playable.length];
}

export function pickRandomVideo(
  videos: SportsVideo[],
  excludeVideoId?: string
): SportsVideo | undefined {
  const playable = videos.filter(
    (video) => isPlayable(video) && video.id !== excludeVideoId
  );
  const candidates = playable.length > 0 ? playable : videos.filter(isPlayable);
  if (candidates.length === 0) return undefined;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

