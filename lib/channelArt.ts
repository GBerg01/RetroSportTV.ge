import type { Channel } from "@/lib/channels";
import type { ChannelDisplayStyle, ChannelRowTexture } from "@/lib/types";

type ChannelArt = {
  accent: string;
  secondaryAccent: string;
  displayStyle: ChannelDisplayStyle;
  rowTexture: ChannelRowTexture;
  rowBackgroundUrl?: string;
  profileBackgroundUrl?: string;
  heroImageUrl?: string;
  textureUrl?: string;
  logoSpinUrl?: string;
  graphicLabel: string;
  background: string;
  texture: string;
};

const PRESET_ART: Record<
  string,
  Partial<Pick<ChannelArt, "secondaryAccent" | "displayStyle" | "rowTexture" | "graphicLabel">>
> = {
  "kobe-tv": {
    secondaryAccent: "#FDB927",
    displayStyle: "arena",
    rowTexture: "hardwood",
    graphicLabel: "MAMBA",
  },
  "nba-2000s": {
    secondaryAccent: "#C9082A",
    displayStyle: "broadcast",
    rowTexture: "court",
    graphicLabel: "00s",
  },
  "nfl-big-hits": {
    secondaryAccent: "#FACC15",
    displayStyle: "impact",
    rowTexture: "gridiron",
    graphicLabel: "HIT",
  },
  "boston-classics": {
    secondaryAccent: "#F4E7C5",
    displayStyle: "local",
    rowTexture: "scoreboard",
    graphicLabel: "BOS",
  },
  "florida-gators-tv": {
    secondaryAccent: "#FA4616",
    displayStyle: "broadcast",
    rowTexture: "swamp",
    graphicLabel: "GTR",
  },
  "tiger-sundays": {
    secondaryAccent: "#C41E3A",
    displayStyle: "premium",
    rowTexture: "fairway",
    graphicLabel: "SUN",
  },
};

const SPORT_TEXTURES: Record<string, ChannelRowTexture> = {
  basketball: "hardwood",
  football: "gridiron",
  baseball: "scoreboard",
  golf: "fairway",
  hockey: "ice",
  boxing: "canvas",
};

const TEXTURE_LAYERS: Record<ChannelRowTexture, string> = {
  hardwood:
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 76px), linear-gradient(180deg, rgba(255,255,255,0.045), transparent 48%)",
  gridiron:
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 58px), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.04) 18px 19px)",
  scoreboard:
    "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045), transparent)",
  swamp:
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.055) 0 2px, transparent 2px 13px), radial-gradient(circle at 16% 50%, rgba(255,255,255,0.07), transparent 24%)",
  fairway:
    "repeating-linear-gradient(105deg, rgba(255,255,255,0.045) 0 12px, transparent 12px 26px), linear-gradient(90deg, rgba(255,255,255,0.04), transparent)",
  court:
    "linear-gradient(90deg, transparent 0 49%, rgba(255,255,255,0.09) 49% 51%, transparent 51%), radial-gradient(circle at 20% 50%, transparent 0 44px, rgba(255,255,255,0.07) 45px 47px, transparent 48px)",
  ice:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 18px), linear-gradient(115deg, rgba(255,255,255,0.09), transparent 32%)",
  canvas:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 7px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 7px)",
  broadcast:
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px), linear-gradient(180deg, rgba(255,255,255,0.05), transparent)",
};

function fallbackDisplayStyle(channel: Channel): ChannelDisplayStyle {
  if (channel.category === "CLASSICS") return "classic";
  if (channel.category === "CHAOS") return "impact";
  if (channel.category === "GOLF") return "premium";
  if (channel.category === "TEAMS") return "broadcast";
  return "arena";
}

function fallbackGraphicLabel(channel: Channel) {
  const compact = channel.name.replace(/[^a-z0-9]/gi, "").toUpperCase();
  return compact.slice(0, 3) || "TV";
}

export function getChannelArt(channel: Channel): ChannelArt {
  const preset = PRESET_ART[channel.slug] ?? {};
  const sportKey = channel.sport.toLowerCase();
  const accent = channel.accentColor ?? "#39ff14";
  const secondaryAccent = channel.secondaryAccentColor ?? preset.secondaryAccent ?? "#ffb000";
  const rowTexture = channel.rowTexture ?? preset.rowTexture ?? SPORT_TEXTURES[sportKey] ?? "broadcast";
  const displayStyle = channel.displayStyle ?? preset.displayStyle ?? fallbackDisplayStyle(channel);
  const graphicLabel = preset.graphicLabel ?? fallbackGraphicLabel(channel);
  const rowBackgroundUrl = channel.rowBackgroundUrl;
  const texture = channel.textureUrl
    ? `linear-gradient(rgba(255,255,255,0.025), rgba(255,255,255,0.025)), url(${channel.textureUrl}), ${TEXTURE_LAYERS[rowTexture]}`
    : TEXTURE_LAYERS[rowTexture];

  return {
    accent,
    secondaryAccent,
    displayStyle,
    rowTexture,
    rowBackgroundUrl,
    profileBackgroundUrl: channel.profileBackgroundUrl,
    heroImageUrl: channel.heroImageUrl,
    textureUrl: channel.textureUrl,
    logoSpinUrl: channel.logoSpinUrl,
    graphicLabel,
    texture,
    background: [
      rowBackgroundUrl
        ? `linear-gradient(90deg, rgba(5,5,5,0.74) 0%, rgba(5,5,5,0.42) 38%, rgba(5,5,5,0.10) 70%, rgba(5,5,5,0.24) 100%), url(${rowBackgroundUrl})`
        : null,
      `radial-gradient(circle at 92% 50%, ${secondaryAccent}26 0%, transparent 30%)`,
      `linear-gradient(100deg, ${accent}20 0%, rgba(10,10,10,0.9) 38%, rgba(10,10,10,0.72) 100%)`,
      texture,
      "#080808",
    ]
      .filter(Boolean)
      .join(", "),
  };
}
