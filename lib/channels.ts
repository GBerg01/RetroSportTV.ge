import { CHANNELS, type Channel, type Video } from "@/data/channels";

export type { Channel, Video };

export function getAllChannels(): Channel[] {
  return CHANNELS;
}

export function getChannelBySlug(slug: string): Channel | undefined {
  return CHANNELS.find((ch) => ch.slug === slug);
}

export function getFeaturedChannels(count = 6): Channel[] {
  return CHANNELS.slice(0, count);
}

export function getNextChannel(currentSlug: string): Channel {
  const index = CHANNELS.findIndex((ch) => ch.slug === currentSlug);
  return CHANNELS[(index + 1) % CHANNELS.length];
}

export function getPreviousChannel(currentSlug: string): Channel {
  const index = CHANNELS.findIndex((ch) => ch.slug === currentSlug);
  return CHANNELS[(index - 1 + CHANNELS.length) % CHANNELS.length];
}
