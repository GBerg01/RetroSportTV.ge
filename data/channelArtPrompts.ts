import { CHANNELS } from "@/data/channels";
import type { Channel } from "@/lib/channels";

export type ChannelArtAssetType = "row-bg" | "profile-bg" | "logo-spin";
export type ImageProvider = "openai" | "midjourney";

export type ChannelArtPrompt = {
  slug: string;
  channelName: string;
  assetType: ChannelArtAssetType;
  recommendedProvider: ImageProvider;
  prompt: string;
  midjourneyPrompt: string;
  aspectRatio: "5:1" | "4:1" | "3:4" | "1:1";
  notes: string[];
  targetFileName: string;
  targetPath: string;
};

export type ChannelArtPromptSet = {
  slug: string;
  channelName: string;
  channelNumber: string;
  sport: string;
  era: string;
  category: string;
  visualDirection: string;
  prompts: ChannelArtPrompt[];
};

const GLOBAL_RULES =
  "no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots";

const MIDJOURNEY_AR: Record<ChannelArtPrompt["aspectRatio"], string> = {
  "5:1": "--ar 5:1",
  "4:1": "--ar 4:1",
  "3:4": "--ar 3:4",
  "1:1": "--ar 1:1",
};

const PILOT_DIRECTIONS: Record<string, string> = {
  "kobe-tv":
    "Purple and gold premium basketball legend package with hardwood, arena light, jersey fabric energy, and a collectible #24 jersey object for logo-spin.",
  "nba-2000s":
    "Red, white, and blue early-2000s basketball broadcast energy with chrome, hardwood, baggy-shorts nostalgia, and a rotating throwback basketball pickup.",
  "nfl-big-hits":
    "Gritty football impact package with dark turf, chalk marks, steel collision energy, and a rotating scuffed football impact collectible.",
  "florida-gators-tv":
    "Orange and blue college football package with swamp atmosphere, stadium lights, humid night-game energy, and a rotating helmet or football collectible without real marks.",
  "tiger-sundays":
    "Calm premium golf package with deep green, Sunday red, gold trim, fairway texture, and a rotating golf ball or red-shirt collectible object.",
  "jordan-tv":
    "Red, black, and white basketball icon package with championship spotlight, premium hardwood, and a rotating #23 jersey or trophy-like basketball object.",
  "bulls-mj-era":
    "1990s championship dynasty package with red, black, white, hardwood, abstract banners, and a rotating dynasty-ring basketball collectible.",
  "mike-tyson-tv":
    "Black, gold, and red fight-night package with canvas texture, smoky poster lighting, and a rotating boxing glove or championship-belt-inspired object.",
  "inside-the-nba-classics":
    "Late-night sports studio package with blue/orange lights, CRT monitor wall, broadcast desk reflections, and a rotating microphone-monitor collectible.",
  "sportscenter-classics":
    "1990s sports highlight desk package with red, charcoal, chrome, CRT scanline energy, archive tape mood, and a rotating highlight-reel broadcast badge.",
};

const SPORT_DIRECTION: Record<string, string> = {
  basketball: "hardwood court texture, arena lights, premium broadcast graphics, kinetic highlight energy",
  football: "turf texture, chalk marks, stadium lights, collision energy, rugged broadcast graphics",
  baseball: "scoreboard texture, grass and dirt, stadium lights, archival local broadcast mood",
  golf: "fairway texture, calm premium lighting, green and gold trim, Sunday broadcast atmosphere",
  hockey: "ice texture, rink boards, cold arena light, classic playoff broadcast energy",
  boxing: "ring canvas texture, smoky spotlights, red corner light, fight poster atmosphere",
  soccer: "pitch texture, stadium floodlights, global tournament broadcast energy",
  "multi-sport": "highlight montage texture, CRT scanlines, fast-cut broadcast package energy",
};

function primaryCategory(channel: Channel) {
  return channel.categories?.[0] ?? channel.category ?? "SPORTS";
}

function lowerSport(channel: Channel) {
  return channel.sport.toLowerCase();
}

function visualDirection(channel: Channel) {
  if (PILOT_DIRECTIONS[channel.slug]) return PILOT_DIRECTIONS[channel.slug];
  const sport = lowerSport(channel);
  const sportDirection = SPORT_DIRECTION[sport] ?? SPORT_DIRECTION["multi-sport"];
  return `${channel.name} custom sports cable package for ${channel.sport}, ${channel.era}, ${channel.vibe}; ${sportDirection}.`;
}

function targetFileName(assetType: ChannelArtAssetType) {
  if (assetType === "row-bg") return "row-bg.png";
  if (assetType === "profile-bg") return "profile-bg.png";
  return "logo-spin.webp";
}

function targetPath(slug: string, assetType: ChannelArtAssetType) {
  return `/channel-art/${slug}/${targetFileName(assetType)}`;
}

function assetPrompt(channel: Channel, assetType: ChannelArtAssetType) {
  const direction = visualDirection(channel);
  const category = primaryCategory(channel);

  if (assetType === "row-bg") {
    return `wide horizontal channel guide rectangle background for ${channel.name}, ${direction}, ${category} channel identity, background art layer only, low-detail text-safe left and center zones, richer custom art on the right side, retro sports cable guide aesthetic, premium but gritty`;
  }

  if (assetType === "profile-bg") {
    return `vertical TV profile card background for ${channel.name}, ${direction}, ${category} channel identity, background art layer only, readable upper-left and center zones for overlaid UI, subtle depth, retro sports trading card meets cable box preview panel`;
  }

  return `rotating 3D collectible item icon for ${channel.name}, ${direction}, channel-specific video-game pickup object, glossy collectible material, transparent background preferred, centered object, readable at small size, no text on the object`;
}

function notes(channel: Channel, assetType: ChannelArtAssetType) {
  if (assetType === "row-bg") {
    return [
      "Target a 5:1 crop; 4:1 is acceptable if the composition still works.",
      "Keep the left and center readable because React overlays channel name, metadata, badges, and CTA.",
      `Install at public/channel-art/${channel.slug}/row-bg.png.`,
    ];
  }

  if (assetType === "profile-bg") {
    return [
      "Target a 3:4 crop.",
      "Avoid busy detail behind the card title, description, metadata rows, and CTA.",
      `Install at public/channel-art/${channel.slug}/profile-bg.png.`,
    ];
  }

  return [
    "Target a 1:1 square export with transparent or easily removable background.",
    "Preferred future format is animated WebP named logo-spin.webp; static fallback can be logo.png.",
    `Install preferred animated asset at public/channel-art/${channel.slug}/logo-spin.webp.`,
  ];
}

function promptFor(channel: Channel, assetType: ChannelArtAssetType): ChannelArtPrompt {
  const aspectRatio = assetType === "profile-bg" ? "3:4" : assetType === "logo-spin" ? "1:1" : "5:1";
  const basePrompt = `${assetPrompt(channel, assetType)}, ${GLOBAL_RULES}`;

  return {
    slug: channel.slug,
    channelName: channel.name,
    assetType,
    recommendedProvider: "openai",
    prompt: basePrompt,
    midjourneyPrompt: `${basePrompt} ${MIDJOURNEY_AR[aspectRatio]}`,
    aspectRatio,
    notes: notes(channel, assetType),
    targetFileName: targetFileName(assetType),
    targetPath: targetPath(channel.slug, assetType),
  };
}

export const CHANNEL_ART_PROMPT_SETS: ChannelArtPromptSet[] = CHANNELS.map((channel) => ({
  slug: channel.slug,
  channelName: channel.name,
  channelNumber: channel.channelNumber,
  sport: channel.sport,
  era: channel.era,
  category: primaryCategory(channel),
  visualDirection: visualDirection(channel),
  prompts: [
    promptFor(channel, "row-bg"),
    promptFor(channel, "profile-bg"),
    promptFor(channel, "logo-spin"),
  ],
}));

export function getChannelArtPromptSet(slug: string): ChannelArtPromptSet | undefined {
  return CHANNEL_ART_PROMPT_SETS.find((set) => set.slug === slug);
}

export function getChannelArtPrompt(
  slug: string,
  assetType: ChannelArtAssetType,
): ChannelArtPrompt | undefined {
  return getChannelArtPromptSet(slug)?.prompts.find((prompt) => prompt.assetType === assetType);
}
