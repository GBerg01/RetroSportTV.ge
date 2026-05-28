const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

type EmbedOptions = {
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  rel?: boolean;
  modestbranding?: boolean;
  playsinline?: boolean;
  start?: number;
};

export function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_PATTERN.test(id);
}

export function getYouTubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function getYouTubeEmbedUrl(id: string, options: EmbedOptions = {}): string {
  const params = new URLSearchParams();

  if (options.autoplay !== undefined) params.set("autoplay", options.autoplay ? "1" : "0");
  if (options.mute !== undefined) params.set("mute", options.mute ? "1" : "0");
  if (options.controls !== undefined) params.set("controls", options.controls ? "1" : "0");
  if (options.rel !== undefined) params.set("rel", options.rel ? "1" : "0");
  if (options.modestbranding !== undefined) {
    params.set("modestbranding", options.modestbranding ? "1" : "0");
  }
  if (options.playsinline !== undefined) {
    params.set("playsinline", options.playsinline ? "1" : "0");
  }
  if (typeof options.start === "number" && options.start > 0) {
    params.set("start", String(Math.floor(options.start)));
  }

  const query = params.toString();
  return `https://www.youtube.com/embed/${id}${query ? `?${query}` : ""}`;
}

export function extractYouTubeId(input: string): string | undefined {
  const trimmed = input.trim();
  if (isValidYouTubeId(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && isValidYouTubeId(id) ? id : undefined;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const watchId = url.searchParams.get("v");
      if (watchId && isValidYouTubeId(watchId)) return watchId;

      const pathParts = url.pathname.split("/").filter(Boolean);
      const embedIndex = pathParts.findIndex((part) =>
        ["embed", "shorts", "live"].includes(part)
      );
      const id = embedIndex >= 0 ? pathParts[embedIndex + 1] : undefined;
      return id && isValidYouTubeId(id) ? id : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function normalizeYouTubeUrl(url: string): string | undefined {
  const id = extractYouTubeId(url);
  return id ? getYouTubeWatchUrl(id) : undefined;
}

