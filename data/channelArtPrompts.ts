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
  const prompt = `${ASSET_OPENERS[assetType]} for ${blueprint.channelName}, ${ASSET_LAYER_NOTES[assetType]}, ${assetDirection}, retro arcade sports cable box aesthetic, NBA Jam-style 90s sports game energy, CRT cabinet glow, bold saturated team colors, chunky sports graphics, dramatic arcade sports lighting, 90s trading card intensity, arcade sports menu panel feel, ${ASSET_ZONE_NOTES[assetType]}, ${BASE_NEGATIVES}`;

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
      "row-bg": "bold purple and gold NBA Jam-style hardwood legend panel, arena spotlight cones, jersey mesh overlay, championship ring glow, arcade sports menu composition",
      "profile-bg": "bold purple and gold arcade player-select card, spotlight cone from above, hardwood floor reflection, trophy glow, NBA Jam character-select energy",
      logo: "chunky basketball jersey silhouette, bold purple and gold, arcade sports emblem, character icon energy",
      badge: "bold championship seal badge, purple and gold metallic relief, ring-seal shape, arcade unlock collectible feel",
      "logo-spin": "rotating basketball jersey collectible, bold purple body gold trim, fabric folds, chrome hanger loop, arcade game-pickup item",
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
      "row-bg": "bold red-white-blue chrome basketball arcade panel, 90s broadcast bar graphics, baggy-shorts era arcade energy, chunky NBA era motion graphics",
      "profile-bg": "bold red-blue 90s arcade basketball card, chrome edge graphics, early-2000s arcade highlight show energy",
      logo: "chunky chrome basketball badge, bold red and blue arcade energy arcs, throwback 90s sports icon",
      badge: "bold chrome highlight badge, arcade seal shape, 90s TV gloss, chunky 2000s sports emblem",
      "logo-spin": "rotating throwback basketball collectible, bold chrome shine, red and blue arcade streaks",
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
      "row-bg": "bold dark turf NFL Blitz-style arcade impact panel, white chalk marks, steel collision burst graphics, chunky stadium light beams",
      "profile-bg": "bold dark football arcade card, scuffed turf texture, steel shockwave graphics, NFL Blitz-style stadium energy",
      logo: "chunky football shield icon, bold steel and dark green, defensive collision energy, arcade impact emblem",
      badge: "bold collision badge, hard-hit shield shape, gritty turf texture, steel-medal chunky arcade emblem",
      "logo-spin": "rotating scuffed football collectible, bold impact scars, arena-light glint, arcade game-item feel",
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
      "row-bg": "bold orange and royal blue arcade college football panel, swamp heat glow, humid SEC night energy, chunky campus broadcast graphics",
      "profile-bg": "bold orange-blue arcade college football card, swamp mist glow, campus arcade broadcast energy",
      logo: "chunky Gators helmet silhouette, bold orange and blue, arcade college football icon",
      badge: "bold swamp football badge, helmet-shaped arcade emblem, orange-blue chunky sticker",
      "logo-spin": "rotating football collectible, bold orange-blue armor, swamp-energy arcade accents",
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
      "row-bg": "bold Sunday red and deep green bird's-eye golf hole arcade panel, 90s arcade golf game menu energy, chunky fairway stripe graphics",
      "profile-bg": "bold red and green golf arcade card, fairway texture, red glow accent, 90s arcade golf energy",
      logo: "chunky tiger-striped golf ball icon, bold red and green, golden tee, arcade sports collectible",
      badge: "bold golf championship badge, green-jacket-style seal, golf flag silhouette, chunky arcade emblem",
      "logo-spin": "rotating tiger-striped golf ball collectible, bold golden tee, red accent, arcade game-pickup feel",
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
      "row-bg": "bold red-black-white NBA Jam-style basketball legend panel, championship spotlight, Bulls-era hardwood floor, flight-path motion graphics, arcade character energy",
      "profile-bg": "bold red-black arcade player-select card, deep red glow, hardwood reflection, NBA Jam legend energy",
      logo: "chunky basketball jersey silhouette, bold red and black, arcade character icon, championship emblem",
      badge: "bold championship badge, red and black arcade seal, crown-like shape, collectible sports unlock",
      "logo-spin": "rotating basketball jersey collectible, bold red and black, airborne arcade energy, game-item feel",
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
      "row-bg": "bold red-black-white dynasty arcade panel, 90s championship banner silhouettes, old arena rafters, NBA Jam-style dynasty energy, chunky banner graphics",
      "profile-bg": "bold red-black arcade dynasty card, hanging banner silhouettes, spotlight haze, old arena championship arcade energy",
      logo: "chunky Bulls dynasty crest icon, bold red and black, six-ring arcade emblem",
      badge: "bold dynasty badge, banner geometry, old arena arcade polish, championship seal chunky emblem",
      "logo-spin": "rotating championship ring collectible, bold Bulls red, black trim, trophy arcade energy, game-item feel",
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
      "row-bg": "bold black-gold-red Punch-Out-style arcade fight panel, ring ropes, smoky canvas texture, heavyweight arcade energy, boxing cabinet feel",
      "profile-bg": "bold black-gold arcade boxing card, red corner glow, canvas texture, title-fight arcade intensity",
      logo: "chunky boxing glove silhouette, bold black and gold, arcade combat icon, heavyweight emblem",
      badge: "bold championship belt badge, belt-plate shape, black-gold arcade relief, fight-night collectible emblem",
      "logo-spin": "rotating boxing glove collectible, bold belt-metal accents, smoky highlights, knockout arcade energy",
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
      "row-bg": "bold blue-orange arcade studio desk panel, CRT monitor wall glow, stat sheet graphics, late-night desk arcade energy, 90s cable sports TV menu feel",
      "profile-bg": "bold blue-orange arcade studio card, CRT monitor wall glow, desk reflections, late-night TV arcade energy",
      logo: "chunky studio monitor badge icon, bold blue and orange, desk-show arcade emblem",
      badge: "bold studio replay badge, monitor-wall shape, blue and orange chunky arcade emblem",
      "logo-spin": "rotating microphone-and-monitor collectible, bold studio chrome, blue-orange arcade desk energy",
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
      "row-bg": "bold red-blue arcade newsroom panel, CRT monitor wall, highlight wall graphics, 90s ESPN countdown arcade energy, classic broadcast menu feel",
      "profile-bg": "bold red-blue arcade newsroom card, CRT monitor glow, archive-highlight arcade broadcast energy",
      logo: "chunky red-blue highlight badge icon, bold newsroom arcade emblem, classic sports broadcast icon",
      badge: "bold top-ten replay badge, CRT glow seal, red and blue chunky arcade emblem",
      "logo-spin": "rotating highlight-reel collectible, bold newsroom chrome, red-blue arcade streaks",
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
      "row-bg": "bold gold championship arcade panel, stadium light beams, confetti burst, aerial field geometry, big-game arcade broadcast energy",
      "profile-bg": "bold gold arcade championship card, field-diagram geometry, trophy glow, big-game arcade broadcast energy",
      logo: "chunky trophy-gold stage emblem, bold championship arcade icon, big-game energy",
      badge: "bold championship badge, confetti-edge seal, gold arcade relief, trophy chunky emblem",
      "logo-spin": "rotating football collectible, bold gold trophy treatment, stadium-light gleam, arcade game-item energy",
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
      "row-bg": "bold gold championship trophy-room arcade panel, banner silhouettes, game-seven court line graphics, bold gold broadcast energy",
      "profile-bg": "bold gold arcade Finals card, trophy-room glow, legacy-board arcade energy",
      logo: "chunky championship seal icon, bold gold arcade relief, Finals-history prestige emblem",
      badge: "bold championship badge, trophy-room geometry, gold arcade shine, legacy seal chunky emblem",
      "logo-spin": "rotating championship trophy collectible, bold gold trim, court-line arcade detailing",
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
      "row-bg": "bold bracket-chaos arcade panel, hardwood motion graphics, tournament board line art, buzzer-beater arcade energy, 90s NCAA game menu feel",
      "profile-bg": "bold bracket arcade card, bracket fragment graphics, arena tension, postseason arcade pressure",
      logo: "chunky tournament-bracket emblem icon, bold collegiate arcade colors, hardwood energy",
      badge: "bold bracket seal badge, Cinderella drama, chunky arcade tournament emblem",
      "logo-spin": "rotating college basketball collectible, bold bracket geometry, buzzer-light arcade streaks",
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
      "row-bg": "bold cold blue-gray Foxboro arcade panel, playbook grid line art, comeback drive graphics, dynasty arcade energy",
      "profile-bg": "bold blue-gray arcade dynasty card, stadium-cold atmosphere, ring-room glow, methodical arcade energy",
      logo: "chunky New England dynasty crest icon, bold cold blue, disciplined football arcade emblem",
      badge: "bold dynasty badge, ring-room geometry, blue and silver arcade shine, playbook grid emblem",
      "logo-spin": "rotating football collectible, bold cold-weather steel, ring-metal accents, comeback arcade energy",
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
      "row-bg": "bold mixed-sport arcade collage panel, CRT scanlines, remote-shuffle tape label graphics, wildcard multi-sport arcade energy",
      "profile-bg": "bold mixed-sport arcade card, archive tape texture, collage fragment graphics, TV-static arcade glow",
      logo: "chunky remote-shuffle highlight badge icon, bold mixed-sport arcade collage",
      badge: "bold wildcard badge, archive-tape edges, highlight-pile energy, chunky sports-bar arcade emblem",
      "logo-spin": "rotating mixed-sport collectible, bold collage fragments, tape-label arcade charm",
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
