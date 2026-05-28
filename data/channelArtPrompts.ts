export type ChannelArtAssetKind = "row-bg" | "profile-bg" | "logo";

export type ChannelArtPrompt = {
  channelSlug: string;
  channelName: string;
  kind: ChannelArtAssetKind;
  outputPath: string;
  aspectRatio: "5:1" | "4:1" | "3:4" | "1:1";
  recommendedProvider: "openai";
  prompt: string;
  openAiInstructions: string;
  midjourneyParameters: string;
  notes: string[];
};

export type ChannelArtPromptSet = {
  channelSlug: string;
  channelName: string;
  direction: string;
  prompts: ChannelArtPrompt[];
};

const SHARED_NEGATIVE =
  "no real team logos, no real athlete faces, no readable text, no letters, no numbers, no watermarks, no trademarks, no UI mockup, no screenshots";

const OPENAI_INSTRUCTIONS: Record<ChannelArtAssetKind, string> = {
  "row-bg":
    "Generate as a wide channel-guide background layer. Keep the left and center areas lower-detail and text-safe. Preserve the requested aspect ratio when exporting/cropping.",
  "profile-bg":
    "Generate as a vertical profile-card background layer. Keep the upper-left and middle areas readable for overlaid UI text. Preserve a 3:4 crop.",
  logo:
    "Generate as a square icon-ready mark. Prefer a clean centered emblem on a transparent or easily removable background. Do not include text.",
};

const MIDJOURNEY_AR: Record<ChannelArtPrompt["aspectRatio"], string> = {
  "5:1": "--ar 5:1",
  "4:1": "--ar 4:1",
  "3:4": "--ar 3:4",
  "1:1": "--ar 1:1",
};

function outputPath(slug: string, kind: ChannelArtAssetKind) {
  return `/channel-art/${slug}/${kind}.png`;
}

function prompt(
  channelSlug: string,
  channelName: string,
  kind: ChannelArtAssetKind,
  aspectRatio: ChannelArtPrompt["aspectRatio"],
  promptText: string,
  notes: string[] = [],
): ChannelArtPrompt {
  return {
    channelSlug,
    channelName,
    kind,
    aspectRatio,
    recommendedProvider: "openai",
    outputPath: outputPath(channelSlug, kind),
    prompt: `${promptText}, background art layer only, designed for text overlay, ${SHARED_NEGATIVE}`,
    openAiInstructions: OPENAI_INSTRUCTIONS[kind],
    midjourneyParameters: MIDJOURNEY_AR[aspectRatio],
    notes,
  };
}

export const CHANNEL_ART_PROMPT_SETS: ChannelArtPromptSet[] = [
  {
    channelSlug: "kobe-tv",
    channelName: "Kobe TV",
    direction: "Purple and gold premium basketball legend package with hardwood, arena light, and jersey fabric energy.",
    prompts: [
      prompt(
        "kobe-tv",
        "Kobe TV",
        "row-bg",
        "5:1",
        "wide cinematic basketball channel banner, deep purple and gold palette, glossy hardwood floor texture, dramatic arena rim light, abstract jersey stitching, subtle snake-scale pattern, premium late-2000s sports broadcast package",
        ["Keep the center-left dark enough for channel name and metadata."],
      ),
      prompt(
        "kobe-tv",
        "Kobe TV",
        "profile-bg",
        "3:4",
        "vertical premium basketball profile card background, purple and gold glow, hardwood floor reflection, abstract spotlight haze, subtle jersey mesh texture, cinematic sports trading card backing",
      ),
      prompt(
        "kobe-tv",
        "Kobe TV",
        "logo",
        "1:1",
        "square icon-ready abstract black mamba inspired basketball emblem, purple and gold, coiled motion shape, premium metallic sports badge, transparent-background friendly composition",
      ),
    ],
  },
  {
    channelSlug: "nba-2000s",
    channelName: "NBA 2000s",
    direction: "Red, white, and blue early-2000s basketball broadcast energy with chrome, hardwood, and baggy-shorts era nostalgia.",
    prompts: [
      prompt(
        "nba-2000s",
        "NBA 2000s",
        "row-bg",
        "5:1",
        "wide early-2000s basketball broadcast banner, red white and blue light streaks, chrome TV graphics, hardwood court lines, grainy camcorder energy, abstract baggy uniform fabric shapes",
      ),
      prompt(
        "nba-2000s",
        "NBA 2000s",
        "profile-bg",
        "3:4",
        "vertical retro basketball broadcast profile background, chrome accents, blue and red studio lighting, hardwood texture, old television highlight package atmosphere",
      ),
      prompt(
        "nba-2000s",
        "NBA 2000s",
        "logo",
        "1:1",
        "square icon-ready abstract 2000s basketball badge, chrome rim, red and blue energy arcs, orange basketball texture, clean silhouette shape",
      ),
    ],
  },
  {
    channelSlug: "nfl-big-hits",
    channelName: "NFL Big Hits",
    direction: "Gritty football impact package with turf, chalk, steel, and collision energy.",
    prompts: [
      prompt(
        "nfl-big-hits",
        "NFL Big Hits",
        "row-bg",
        "5:1",
        "wide gritty football broadcast banner, dark green turf texture, white chalk yard marks, steel gray impact bursts, flying rubber pellets, dramatic stadium lights, aggressive sports package",
      ),
      prompt(
        "nfl-big-hits",
        "NFL Big Hits",
        "profile-bg",
        "3:4",
        "vertical football profile card background, dark turf and steel palette, chalk dust, impact shockwave graphics, helmet scuff texture without logos",
      ),
      prompt(
        "nfl-big-hits",
        "NFL Big Hits",
        "logo",
        "1:1",
        "square icon-ready abstract football impact emblem, cracked turf, steel shield shape, motion collision lines, no team marks",
      ),
    ],
  },
  {
    channelSlug: "florida-gators-tv",
    channelName: "Florida Gators TV",
    direction: "Orange and blue college football package with swamp atmosphere, stadium lights, and humid night-game energy.",
    prompts: [
      prompt(
        "florida-gators-tv",
        "Florida Gators TV",
        "row-bg",
        "5:1",
        "wide college football channel banner, electric orange and royal blue, swamp mist texture, wet grass, stadium floodlights, energetic southern night game atmosphere",
      ),
      prompt(
        "florida-gators-tv",
        "Florida Gators TV",
        "profile-bg",
        "3:4",
        "vertical college football profile background, orange and blue glow, swamp reeds silhouette, stadium haze, wet turf texture, premium campus broadcast package",
      ),
      prompt(
        "florida-gators-tv",
        "Florida Gators TV",
        "logo",
        "1:1",
        "square icon-ready abstract swamp football emblem, orange and blue, gator-scale texture without animal mascot likeness, bold shield shape",
      ),
    ],
  },
  {
    channelSlug: "tiger-sundays",
    channelName: "Tiger Sundays",
    direction: "Calm premium golf package with deep green, Sunday red, gold trim, fairway texture, and major championship atmosphere.",
    prompts: [
      prompt(
        "tiger-sundays",
        "Tiger Sundays",
        "row-bg",
        "5:1",
        "wide premium golf broadcast banner, deep green fairway texture, subtle Sunday red accent, gold trim, morning mist, manicured grass stripes, calm championship atmosphere",
      ),
      prompt(
        "tiger-sundays",
        "Tiger Sundays",
        "profile-bg",
        "3:4",
        "vertical premium golf profile card background, deep green and gold, soft red accent glow, fairway grass pattern, quiet major championship mood",
      ),
      prompt(
        "tiger-sundays",
        "Tiger Sundays",
        "logo",
        "1:1",
        "square icon-ready abstract golf Sunday badge, green fairway curve, red accent slash, gold ring, premium minimal sports emblem",
      ),
    ],
  },
  {
    channelSlug: "jordan-tv",
    channelName: "Jordan TV",
    direction: "Red, black, and white basketball icon package with championship atmosphere and premium hardwood treatment.",
    prompts: [
      prompt(
        "jordan-tv",
        "Jordan TV",
        "row-bg",
        "5:1",
        "wide premium basketball legend banner, red black and white palette, glossy hardwood, championship spotlight beams, abstract wing-like motion graphics, vintage 1990s broadcast intensity",
      ),
      prompt(
        "jordan-tv",
        "Jordan TV",
        "profile-bg",
        "3:4",
        "vertical basketball trading card background, red and black glow, hardwood reflection, championship confetti abstraction, premium sports icon treatment",
      ),
      prompt(
        "jordan-tv",
        "Jordan TV",
        "logo",
        "1:1",
        "square icon-ready abstract basketball crown emblem, red black and white, airborne motion arc without human likeness, premium badge",
      ),
    ],
  },
  {
    channelSlug: "bulls-mj-era",
    channelName: "Bulls MJ Era",
    direction: "1990s Chicago championship dynasty feel with red, black, white, hardwood, banners, and old arena atmosphere.",
    prompts: [
      prompt(
        "bulls-mj-era",
        "Bulls MJ Era",
        "row-bg",
        "5:1",
        "wide 1990s basketball dynasty banner, red black and white palette, old arena rafters, abstract championship banners with no readable text, hardwood court texture, documentary broadcast mood",
      ),
      prompt(
        "bulls-mj-era",
        "Bulls MJ Era",
        "profile-bg",
        "3:4",
        "vertical 1990s basketball dynasty profile background, red and black arena lighting, hanging banner silhouettes without text, hardwood grain, classic broadcast package",
      ),
      prompt(
        "bulls-mj-era",
        "Bulls MJ Era",
        "logo",
        "1:1",
        "square icon-ready abstract dynasty basketball badge, red black white, six-ring inspired geometric arcs, no team logo, clean sports emblem",
      ),
    ],
  },
  {
    channelSlug: "mike-tyson-tv",
    channelName: "Mike Tyson TV",
    direction: "Black, gold, and red fight-night package with canvas texture, poster lighting, and heavyweight energy.",
    prompts: [
      prompt(
        "mike-tyson-tv",
        "Mike Tyson TV",
        "row-bg",
        "5:1",
        "wide heavyweight boxing channel banner, black gold and deep red palette, ring canvas texture, smoky arena lights, dramatic fight poster energy, abstract glove motion blur",
      ),
      prompt(
        "mike-tyson-tv",
        "Mike Tyson TV",
        "profile-bg",
        "3:4",
        "vertical boxing profile card background, black canvas and gold trim, red corner light, smoky spotlight, scuffed leather texture, premium fight-night atmosphere",
      ),
      prompt(
        "mike-tyson-tv",
        "Mike Tyson TV",
        "logo",
        "1:1",
        "square icon-ready abstract boxing emblem, black gold red, glove silhouette shape without branding, championship belt geometry, clean badge",
      ),
    ],
  },
  {
    channelSlug: "inside-the-nba-classics",
    channelName: "Inside the NBA Classics",
    direction: "Late-night studio sports desk package with blue, orange, monitors, and classic cable TV control-room atmosphere.",
    prompts: [
      prompt(
        "inside-the-nba-classics",
        "Inside the NBA Classics",
        "row-bg",
        "5:1",
        "wide retro sports studio broadcast banner, blue and orange accent lights, late-night studio desk atmosphere, wall of CRT monitors with abstract glow, cable TV control room energy",
      ),
      prompt(
        "inside-the-nba-classics",
        "Inside the NBA Classics",
        "profile-bg",
        "3:4",
        "vertical sports studio profile background, blue orange lighting, broadcast desk reflections, CRT monitor wall bokeh, premium late-night cable sports mood",
      ),
      prompt(
        "inside-the-nba-classics",
        "Inside the NBA Classics",
        "logo",
        "1:1",
        "square icon-ready abstract studio sports badge, blue orange glow, microphone and monitor geometry, no network branding, clean emblem",
      ),
    ],
  },
  {
    channelSlug: "sportscenter-classics",
    channelName: "SportsCenter Classics",
    direction: "1990s sports highlight desk package with red, charcoal, chrome, CRT scanline energy, and archive tape mood.",
    prompts: [
      prompt(
        "sportscenter-classics",
        "SportsCenter Classics",
        "row-bg",
        "5:1",
        "wide 1990s sports highlight show banner, red charcoal and chrome palette, CRT scanlines, newsroom desk lights, VHS archive tape texture, fast highlight montage energy",
      ),
      prompt(
        "sportscenter-classics",
        "SportsCenter Classics",
        "profile-bg",
        "3:4",
        "vertical retro sports highlight profile background, red and chrome studio graphics, CRT glow, archive tape shelves, newsroom lighting, premium cable sports package",
      ),
      prompt(
        "sportscenter-classics",
        "SportsCenter Classics",
        "logo",
        "1:1",
        "square icon-ready abstract sports highlight badge, red chrome charcoal, circular broadcast desk geometry, CRT scanline motif, no network branding",
      ),
    ],
  },
];

export function getChannelArtPromptSet(slug: string): ChannelArtPromptSet | undefined {
  return CHANNEL_ART_PROMPT_SETS.find((set) => set.channelSlug === slug);
}
