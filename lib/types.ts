export type ChannelCategory =
  | "PLAYERS"
  | "ERAS"
  | "TEAMS"
  | "CHAOS"
  | "CLASSICS"
  | "COLLEGE"
  | "GOLF"
  | "MULTI_SPORT";

export type VideoSource =
  | "youtube"
  | "youtube-search"
  | "youtube-playlist"
  | "manual-curation";

export type VideoValidationStatus =
  | "unchecked"
  | "valid"
  | "invalid"
  | "unavailable"
  | "not-embeddable";

export type PlaylistRule = {
  id: string;
  description: string;
  requiredTags?: string[];
  preferredTags?: string[];
  excludedTags?: string[];
  minQualityScore?: number;
  maxVideos?: number;
};

export type SportsVideo = {
  id: string;
  title: string;
  originalUrl?: string;
  source?: VideoSource;
  thumbnailUrl?: string;
  durationSeconds?: number;
  sport?: string;
  league?: string;
  player?: string;
  team?: string;
  era?: string;
  tags?: string[];
  vibeTags?: string[];
  qualityScore?: number;
  approved?: boolean;
  embeddable?: boolean;
  validationStatus?: VideoValidationStatus;
  lastCheckedAt?: string;
};

export type ChannelDisplayStyle =
  | "arena"
  | "broadcast"
  | "classic"
  | "impact"
  | "premium"
  | "local";

export type ChannelRowTexture =
  | "hardwood"
  | "gridiron"
  | "scoreboard"
  | "swamp"
  | "fairway"
  | "court"
  | "ice"
  | "canvas"
  | "broadcast";

export type SportsChannel = {
  id: string;
  slug: string;
  name: string;
  channelNumber: string;
  description: string;
  category?: ChannelCategory;
  categories?: ChannelCategory[];
  sport: string;
  era: string;
  vibe: string;
  accentColor?: string;
  secondaryAccentColor?: string;
  displayStyle?: ChannelDisplayStyle;
  heroImageUrl?: string;
  rowBackgroundUrl?: string;
  profileBackgroundUrl?: string;
  textureUrl?: string;
  rowTexture?: ChannelRowTexture;
  logoUrl?: string;
  logoSpinUrl?: string;
  emoji: string;
  playlistRules?: PlaylistRule[];
  videos: SportsVideo[];
};
