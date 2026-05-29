export type ChannelArtAssetType = "row-bg" | "profile-bg" | "logo" | "badge" | "logo-spin";
export type ImageProvider = "openai" | "midjourney";

export type ChannelArtPrompt = {
  channelSlug: string;
  channelName: string;
  assetType: ChannelArtAssetType;
  recommendedProvider: ImageProvider;
  conceptRoute: string;
  prompt: string;
  midjourneyPrompt: string;
  aspectRatio: "5:1" | "4:1" | "3:4" | "1:1";
  targetPath: string;
  targetFileName: string;
  safeZoneNotes: string;
  overlayNotes: string;
};

export type ChannelArtBlueprint = {
  channelSlug: string;
  channelNumber: string;
  channelName: string;
  channelType:
    | "player"
    | "team"
    | "era"
    | "event"
    | "chaos"
    | "studio"
    | "combat"
    | "golf"
    | "individual"
    | "college"
    | "compilation"
    | "ambient";
  sport: string;
  era: string;
  tone: string;
  identitySummary: string;
  visualAnchors: string[];
  conceptRoute: string;
  assetDirections: Record<ChannelArtAssetType, string>;
};

const ASSET_ORDER: ChannelArtAssetType[] = ["row-bg", "profile-bg", "logo", "badge", "logo-spin"];

const BASE_NEGATIVES =
  "no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots";

const MIDJOURNEY_AR: Record<ChannelArtPrompt["aspectRatio"], string> = {
  "5:1": "--ar 5:1",
  "4:1": "--ar 4:1",
  "3:4": "--ar 3:4",
  "1:1": "--ar 1:1",
};

const ASSET_OPENERS: Record<ChannelArtAssetType, string> = {
  "row-bg": "wide horizontal channel guide rectangle background",
  "profile-bg": "vertical channel profile card background",
  logo: "square static channel logo icon",
  badge: "square collectible badge emblem",
  "logo-spin": "rotating 3D collectible item",
};

const ASSET_LAYER_NOTES: Record<ChannelArtAssetType, string> = {
  "row-bg": "background art layer only",
  "profile-bg": "background art layer only",
  logo: "collectible art only",
  badge: "collectible art only",
  "logo-spin": "collectible art only",
};

const ASSET_ZONE_NOTES: Record<ChannelArtAssetType, string> = {
  "row-bg": "keep the left and center text-safe for React overlays and let the right side carry the strongest visual detail",
  "profile-bg": "keep the upper-left and center readable behind title, metadata, and CTA copy",
  logo: "transparent background preferred, centered silhouette, readable at small size",
  badge: "centered sticker-like collectible, readable at small size, future badge surface",
  "logo-spin": "transparent background preferred, centered object, collectible-item feel that reads at small size",
};

const ASSET_OVERLAY_NOTES: Record<ChannelArtAssetType, string> = {
  "row-bg": "React renders the channel name, CH number, metadata, and tune-in affordance.",
  "profile-bg": "React renders the selected-channel card text and badges.",
  logo: "React can use this as a small static icon or future image swap.",
  badge: "Future collectible badge surface; keep the shape simple and iconic.",
  "logo-spin": "Future rotating collectible surface; keep the object legible before any animation exists.",
};

const TARGET_FILE_NAMES: Record<ChannelArtAssetType, string> = {
  "row-bg": "row-bg.png",
  "profile-bg": "profile-bg.png",
  logo: "logo.png",
  badge: "badge.png",
  "logo-spin": "logo-spin.webp",
};

function targetPath(slug: string, assetType: ChannelArtAssetType) {
  return `/channel-art/${slug}/${TARGET_FILE_NAMES[assetType]}`;
}

function buildPrompt(blueprint: ChannelArtBlueprint, assetType: ChannelArtAssetType): ChannelArtPrompt {
  const assetDirection = blueprint.assetDirections[assetType];
  const aspectRatio = assetType === "row-bg" ? "5:1" : assetType === "profile-bg" ? "3:4" : "1:1";
  const prompt = `${ASSET_OPENERS[assetType]} for ${blueprint.channelName}, ${ASSET_LAYER_NOTES[assetType]}, ${assetDirection}, retro sports cable box aesthetic, premium sports nostalgia, CRT/VHS texture, sports-bar-at-night atmosphere, ${ASSET_ZONE_NOTES[assetType]}, ${BASE_NEGATIVES}`;

  return {
    channelSlug: blueprint.channelSlug,
    channelName: blueprint.channelName,
    assetType,
    recommendedProvider: "openai",
    conceptRoute: blueprint.conceptRoute,
    prompt,
    midjourneyPrompt: `${prompt} ${MIDJOURNEY_AR[aspectRatio]}`,
    aspectRatio,
    targetPath: targetPath(blueprint.channelSlug, assetType),
    targetFileName: TARGET_FILE_NAMES[assetType],
    safeZoneNotes: ASSET_ZONE_NOTES[assetType],
    overlayNotes: ASSET_OVERLAY_NOTES[assetType],
  };
}

export const CHANNEL_ASSET_IDEATION_BLUEPRINTS: ChannelArtBlueprint[] = [
  {
    channelSlug: "kobe-tv",
    channelNumber: "01",
    channelName: "Kobe TV",
    channelType: "player",
    sport: "Basketball",
    era: "1996–2016",
    tone: "cold-blooded",
    identitySummary: "Black-mamba legacy channel with ring-count prestige and ruthless scoring theater.",
    visualAnchors: [
      "purple and gold hardwood",
      "#24 jersey collectible",
      "arena tunnel lights",
      "championship ring glow",
      "late-2000s Lakers energy",
    ],
    conceptRoute: "Mamba Hardwood Legend",
    assetDirections: {
      "row-bg": "purple-gold hardwood legend banner with arena tunnel lights, jersey mesh, and championship aura",
      "profile-bg": "vertical purple-gold legend card with spotlight haze, hardwood sheen, and trophy glow",
      logo: "static collectible icon based on a #24 jersey silhouette, metallic purple and gold, premium basketball emblem",
      badge: "collectible championship badge with black-mamba energy, ring-seal shape, and sports-card unlock feel",
      "logo-spin": "rotating #24 jersey collectible with premium game-item energy, folded fabric, and chrome hanger loop",
    },
  },
  {
    channelSlug: "nba-2000s",
    channelNumber: "02",
    channelName: "NBA 2000s",
    channelType: "era",
    sport: "Basketball",
    era: "2000–2009",
    tone: "nostalgic",
    identitySummary: "The baggy-shorts, chrome-graphics, streetball-era NBA highlight capsule.",
    visualAnchors: [
      "chrome basketball graphics",
      "red white and blue broadcast bars",
      "baggy-shorts era silhouettes",
      "streetball textures",
      "old sports broadcast graphics",
    ],
    conceptRoute: "Chrome 2000s Broadcast",
    assetDirections: {
      "row-bg": "chrome basketball graphics with red-white-blue broadcast bars, baggy-shorts era motion, and old highlight-show texture",
      "profile-bg": "retro basketball profile panel with chrome edges, CRT glow, and early-2000s arena nostalgia",
      logo: "static icon built from a chrome basketball badge, red and blue energy arcs, and a throwback broadcast feel",
      badge: "collectible badge shaped like a chrome highlight emblem, old-school TV gloss, and early-2000s attitude",
      "logo-spin": "rotating throwback basketball collectible with chrome shine, red and blue streaks, and era-authentic swagger",
    },
  },
  {
    channelSlug: "nfl-big-hits",
    channelNumber: "03",
    channelName: "NFL Big Hits",
    channelType: "chaos",
    sport: "Football",
    era: "1990s–2010s",
    tone: "ferocious",
    identitySummary: "Football collision theater built around impact, turf, and thundering defensive energy.",
    visualAnchors: [
      "dark turf",
      "white chalk marks",
      "steel collision bursts",
      "stadium lights",
      "rugged broadcast graphics",
    ],
    conceptRoute: "Impact Field Package",
    assetDirections: {
      "row-bg": "dark turf broadcast banner with chalk marks, steel collision bursts, and violent highlight energy",
      "profile-bg": "football profile panel with scuffed turf, impact shockwaves, and hard-edged stadium lighting",
      logo: "static icon built from a collision-ready football shield, rugged steel edges, and defensive energy",
      badge: "collectible badge with hard-hit energy, gritty turf texture, and a steel-medal shape",
      "logo-spin": "rotating scuffed football collectible with impact scars, arena-light glint, and collision swagger",
    },
  },
  {
    channelSlug: "florida-gators-tv",
    channelNumber: "05",
    channelName: "Florida Gators TV",
    channelType: "college",
    sport: "College Football",
    era: "1990s–2010s",
    tone: "swamp heat",
    identitySummary: "SEC broadcast heat wrapped in swamp texture, stadium lights, and college title-game energy.",
    visualAnchors: [
      "orange and royal blue",
      "swamp texture",
      "stadium night lights",
      "wet grass",
      "SEC broadcast energy",
    ],
    conceptRoute: "Swamp SEC Night Game",
    assetDirections: {
      "row-bg": "orange and royal blue swamp banner with wet grass, stadium lights, and humid SEC night-game energy",
      "profile-bg": "college football profile panel with swamp mist, orange-blue glow, and campus broadcast polish",
      logo: "static icon inspired by a Gators helmet silhouette and swamp-football energy, bold and readable",
      badge: "collectible badge with swamp heat, college-football swagger, and a helmet-shaped emblem feel",
      "logo-spin": "rotating football collectible with orange-blue armor, swamp-energy accents, and college-title-game presence",
    },
  },
  {
    channelSlug: "tiger-sundays",
    channelNumber: "06",
    channelName: "Tiger Sundays",
    channelType: "golf",
    sport: "Golf",
    era: "1997–2019",
    tone: "dominant",
    identitySummary: "Sunday-red golf authority with major-championship calm and final-round inevitability.",
    visualAnchors: [
      "bird's-eye golf hole",
      "Sunday red",
      "tiger-striped golf ball",
      "green jacket mood",
      "golden tee",
    ],
    conceptRoute: "Birdseye Sunday Red",
    assetDirections: {
      "row-bg": "bird's-eye view of a pristine golf hole with Sunday red accents, green fairway stripes, and calm championship sunlight",
      "profile-bg": "premium golf profile panel with fairway texture, soft red glow, and major-championship atmosphere",
      logo: "static icon built from a tiger-striped golf ball, golden tee, and red-polo golf energy",
      badge: "collectible badge inspired by a green-jacket emblem, golf flag silhouette, and tiger-energy detail",
      "logo-spin": "rotating tiger-striped golf ball collectible with a golden tee, red accent ribbon, and calm premium finish",
    },
  },
  {
    channelSlug: "jordan-tv",
    channelNumber: "07",
    channelName: "Jordan TV",
    channelType: "player",
    sport: "Basketball",
    era: "1984–1998",
    tone: "mythic",
    identitySummary: "Michael Jordan as a myth machine: Finals daggers, dunk flights, and icon-level pressure.",
    visualAnchors: [
      "red black white palette",
      "championship spotlight",
      "Bulls-era hardwood",
      "dunk-contest flight",
      "Finals dagger energy",
    ],
    conceptRoute: "Air Jordan Myth Package",
    assetDirections: {
      "row-bg": "red-black-white basketball legend banner with championship spotlight, hardwood sheen, and flight-path motion",
      "profile-bg": "mythic basketball profile panel with deep red glow, hardwood reflection, and trophy-room drama",
      logo: "static icon inspired by a red-and-black #23 jersey relic, premium basketball emblem, and championship aura",
      badge: "collectible badge with mythic Finals energy, crown-like shape, and classic dynasty polish",
      "logo-spin": "rotating red-and-black #23 jersey collectible with airborne motion, premium fabric, and game-winning swagger",
    },
  },
  {
    channelSlug: "bulls-mj-era",
    channelNumber: "08",
    channelName: "Bulls MJ Era",
    channelType: "team",
    sport: "Basketball",
    era: "1991–1998",
    tone: "dynasty",
    identitySummary: "The 1990s Bulls dynasty: banners, rivalries, six rings, and old-arena authority.",
    visualAnchors: [
      "1990s championship banners",
      "red black white hardwood",
      "old arena rafters",
      "Jordan-Pippen-Rodman energy",
      "Finals rivalry drama",
    ],
    conceptRoute: "Dynasty Banner Room",
    assetDirections: {
      "row-bg": "1990s championship banner room with red-black-white hardwood, old-arena rafters, and dynasty tension",
      "profile-bg": "Bulls dynasty profile panel with hanging banners, spotlight haze, and old championship polish",
      logo: "static icon inspired by a Bulls-dynasty crest, red and black authority, and six-ring legacy",
      badge: "collectible badge with dynasty-banner geometry, old-arena polish, and championship seal energy",
      "logo-spin": "rotating dynasty-ring collectible with Bulls red, black trim, and a trophy-room finish",
    },
  },
  {
    channelSlug: "mike-tyson-tv",
    channelNumber: "13",
    channelName: "Mike Tyson TV",
    channelType: "combat",
    sport: "Boxing",
    era: "1985–2005",
    tone: "knockout storm",
    identitySummary: "VHS heavyweight menace: knockout power, ring walks, smoke, and fight-night threat.",
    visualAnchors: [
      "boxing gloves",
      "ring ropes",
      "black gold red palette",
      "championship belt",
      "smoky arena",
    ],
    conceptRoute: "Fight Night Menace",
    assetDirections: {
      "row-bg": "black-gold-red fight-poster banner with ring ropes, smoky canvas, and heavyweight menace",
      "profile-bg": "boxing profile panel with red-corner glow, canvas texture, and title-fight intensity",
      logo: "static icon built from a boxing glove silhouette, gold trim, and heavyweight fight-poster energy",
      badge: "collectible badge inspired by a championship belt plate, black-gold menace, and fight-night shine",
      "logo-spin": "rotating boxing glove collectible with belt-metal accents, smoky highlights, and knockout authority",
    },
  },
  {
    channelSlug: "inside-the-nba-classics",
    channelNumber: "11",
    channelName: "Inside the NBA Classics",
    channelType: "studio",
    sport: "Basketball",
    era: "2000s–present",
    tone: "late-night desk",
    identitySummary: "A cozy late-night TNT desk feed built on jokes, arguments, monitor walls, and playoff comfort TV.",
    visualAnchors: [
      "studio desk",
      "monitor wall",
      "blue and orange broadcast lights",
      "stat sheets",
      "late-night desk energy",
    ],
    conceptRoute: "Late-Night Desk Replay",
    assetDirections: {
      "row-bg": "studio desk banner with monitor wall, blue-orange broadcast lights, stat sheets, and late-night desk energy",
      "profile-bg": "studio profile panel with CRT monitor wall, desk reflections, and comfortable late-night glow",
      logo: "static icon inspired by a studio monitor badge, blue-orange broadcast lights, and desk-show charm",
      badge: "collectible badge shaped like a studio replay emblem, monitor-wall texture, and TNT-era comfort",
      "logo-spin": "rotating microphone-and-monitor collectible with desk-show polish, studio chrome, and late-night energy",
    },
  },
  {
    channelSlug: "sportscenter-classics",
    channelNumber: "15",
    channelName: "SportsCenter Classics",
    channelType: "studio",
    sport: "Multi-sport",
    era: "1990s–2010s",
    tone: "top ten glow",
    identitySummary: "ESPN highlight-news nostalgia: newsroom desk rhythm, CRT glow, and classic countdown energy.",
    visualAnchors: [
      "newsroom desk",
      "CRT monitors",
      "highlight wall",
      "red and blue broadcast package",
      "web-gem energy",
    ],
    conceptRoute: "Top Ten Newsroom",
    assetDirections: {
      "row-bg": "newsroom desk banner with CRT monitors, highlight wall, red-blue broadcast package, and classic countdown energy",
      "profile-bg": "SportsCenter profile panel with newsroom gloss, monitor glow, and archive-highlight nostalgia",
      logo: "static icon built from a red-blue highlight badge, newsroom energy, and classic ESPN rhythm",
      badge: "collectible badge shaped like a top-ten replay seal, CRT glow, and SportsCenter nostalgia",
      "logo-spin": "rotating highlight-reel collectible with newsroom chrome, red-blue energy, and archive broadcast swagger",
    },
  },
  {
    channelSlug: "super-bowl-channel",
    channelNumber: "09",
    channelName: "Super Bowl Channel",
    channelType: "event",
    sport: "Football",
    era: "1967–present",
    tone: "big game",
    identitySummary: "The NFL's biggest stage: comebacks, confetti, trophy gold, and championship chaos.",
    visualAnchors: [
      "stadium lights",
      "confetti",
      "aerial field geometry",
      "trophy-gold atmosphere",
      "big-game broadcast polish",
    ],
    conceptRoute: "Big Stage Trophy Glow",
    assetDirections: {
      "row-bg": "stadium-light banner with confetti burst, aerial field geometry, and trophy-gold big-game atmosphere",
      "profile-bg": "Super Bowl profile panel with gold glow, field-diagram geometry, and championship scale",
      logo: "static icon inspired by a trophy-gold stage emblem, championship energy, and big-game polish",
      badge: "collectible badge with confetti edges, trophy-room shine, and championship-stage authority",
      "logo-spin": "rotating football collectible with gold trophy treatment, stadium-light gleam, and title-game presence",
    },
  },
  {
    channelSlug: "nba-finals-channel",
    channelNumber: "10",
    channelName: "NBA Finals Channel",
    channelType: "event",
    sport: "Basketball",
    era: "1980–present",
    tone: "trophy room",
    identitySummary: "Championship basketball history: Game 7 pressure, gold banners, and legacy-defining moments.",
    visualAnchors: [
      "trophy-room glow",
      "game-seven court lines",
      "gold banners",
      "championship broadcast polish",
      "finals drama",
    ],
    conceptRoute: "Championship Trophy Room",
    assetDirections: {
      "row-bg": "trophy-room banner with gold banners, game-seven court lines, and championship broadcast polish",
      "profile-bg": "Finals profile panel with gold glow, trophy-room depth, and legacy-board atmosphere",
      logo: "static icon inspired by a championship seal, gold trim, and Finals-history prestige",
      badge: "collectible badge with trophy-room geometry, championship shine, and legacy energy",
      "logo-spin": "rotating championship trophy collectible with gold trim, court-line detailing, and legacy authority",
    },
  },
  {
    channelSlug: "march-madness-tv",
    channelNumber: "14",
    channelName: "March Madness TV",
    channelType: "college",
    sport: "College Basketball",
    era: "1980–present",
    tone: "bracket shock",
    identitySummary: "Tournament chaos: buzzer beaters, Cinderellas, and the emotional whiplash of March.",
    visualAnchors: [
      "bracket graphics",
      "hardwood chaos",
      "buzzer-beater energy",
      "NCAA tournament boards",
      "Cinderella pressure",
    ],
    conceptRoute: "Bracket Chaos Court",
    assetDirections: {
      "row-bg": "bracket-chaos banner with hardwood motion, tournament boards, and buzzer-beater energy",
      "profile-bg": "March profile panel with bracket fragments, arena tension, and postseason pressure",
      logo: "static icon inspired by a tournament-bracket emblem, collegiate urgency, and hardwood energy",
      badge: "collectible badge shaped like a bracket seal, Cinderella drama, and tournament countdown energy",
      "logo-spin": "rotating college-basketball collectible with bracket geometry, buzzer-light streaks, and upset swagger",
    },
  },
  {
    channelSlug: "patriots-dynasty",
    channelNumber: "17",
    channelName: "Patriots Dynasty",
    channelType: "team",
    sport: "Football",
    era: "2001–2019",
    tone: "methodical",
    identitySummary: "Brady, Belichick, comeback drives, and the cold machinery of New England football.",
    visualAnchors: [
      "cold blue-gray Foxboro atmosphere",
      "playbook grids",
      "Super Bowl rings",
      "comeback calm",
      "methodical drive lines",
    ],
    conceptRoute: "Foxboro Blueprint",
    assetDirections: {
      "row-bg": "cold blue-gray banner with playbook grids, comeback drive lines, and Foxboro discipline",
      "profile-bg": "Patriots profile panel with stadium-cold atmosphere, ring-room glow, and methodical polish",
      logo: "static icon inspired by a New England dynasty crest, cold blue authority, and disciplined football design",
      badge: "collectible badge with ring-room precision, playbook geometry, and dynasty-blue shine",
      "logo-spin": "rotating football collectible with cold-weather steel, ring-metal accents, and comeback discipline",
    },
  },
  {
    channelSlug: "random-sports-compilations",
    channelNumber: "12",
    channelName: "Random Sports Compilations",
    channelType: "compilation",
    sport: "Multi-sport",
    era: "1980–present",
    tone: "remote shuffle",
    identitySummary: "The wildcard sports-bar shuffle: catches, dunks, goals, hits, and impossible moments.",
    visualAnchors: [
      "mixed-sport collage",
      "CRT scanlines",
      "remote-shuffle tape labels",
      "sports-bar-at-night mood",
      "highlight-pile energy",
    ],
    conceptRoute: "Remote Shuffle Collage",
    assetDirections: {
      "row-bg": "mixed-sport collage banner with CRT scanlines, remote-shuffle tape labels, and sports-bar-night energy",
      "profile-bg": "compilation profile panel with archive tape texture, multi-sport collage fragments, and TV-static glow",
      logo: "static icon inspired by a remote-shuffle highlight badge, mixed-sport collage, and tape-label nostalgia",
      badge: "collectible badge with archive-tape edges, highlight-pile energy, and wildcard sports-bar flavor",
      "logo-spin": "rotating mixed-sport collectible with collage fragments, tape-label charm, and remote-shuffle chaos",
    },
  },
];

export const channelArtPrompts: ChannelArtPrompt[] = CHANNEL_ASSET_IDEATION_BLUEPRINTS.flatMap((blueprint) =>
  ASSET_ORDER.map((assetType) => buildPrompt(blueprint, assetType)),
);

export function getPromptsForChannel(slug: string): ChannelArtPrompt[] {
  return channelArtPrompts.filter((prompt) => prompt.channelSlug === slug);
}

export function getPromptForAsset(slug: string, assetType: ChannelArtAssetType): ChannelArtPrompt | undefined {
  return channelArtPrompts.find((prompt) => prompt.channelSlug === slug && prompt.assetType === assetType);
}

export function getBlueprintForChannel(slug: string): ChannelArtBlueprint | undefined {
  return CHANNEL_ASSET_IDEATION_BLUEPRINTS.find((blueprint) => blueprint.channelSlug === slug);
}
