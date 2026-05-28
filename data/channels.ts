export type Channel = {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  // Optional: set logoUrl to swap emoji for an image/SVG/badge without touching UI components
  logoUrl?: string;
  channelNumber: string;
  sport: string;
  era: string;
  vibe: string;
  videoIds: string[];
};

// All video IDs below are PLACEHOLDERS.
// Format matches real YouTube IDs (11 chars) but have NOT been verified.
// Swap each one for a real ID before the Phase 3/4 player goes live.
// To find real IDs: go to youtube.com/watch?v=<ID>, copy the ID from the URL.

export const CHANNELS: Channel[] = [
  {
    id: "kobe-tv",
    slug: "kobe-tv",
    name: "Kobe TV",
    description:
      "The Black Mamba's greatest moments — 81 points, five rings, cold-blooded daggers.",
    emoji: "🐍",
    channelNumber: "01",
    sport: "Basketball",
    era: "1996–2016",
    vibe: "Cold-blooded",
    videoIds: [
      "EjDMsGFN2kM", // TODO: verify — Kobe 81-point game highlights
      "6Bn4kfkJPIE", // TODO: verify — Kobe vs Toronto 81 pts full highlights
      "qjFVSROeqRE", // TODO: verify — Kobe 60-point final game farewell
      "Qx7J_WLSdgU", // TODO: verify — Kobe game 7 2010 NBA Finals
      "9mSQQeu5yNs", // TODO: verify — Kobe dunk contest 1997
      "uYNN9VKQAEM", // TODO: verify — Kobe scoring title 2006 highlights
      "k8ks7fVpHys", // TODO: verify — Kobe vs Vince Carter iconic duel
    ],
  },
  {
    id: "nba-2000s",
    slug: "nba-2000s",
    name: "NBA 2000s",
    description:
      "The golden era of big men, cornrows, and ankle-breakers. 2000–2009.",
    emoji: "🏀",
    channelNumber: "02",
    sport: "Basketball",
    era: "2000–2009",
    vibe: "Nostalgic",
    videoIds: [
      "hpFNbfMHFCY", // TODO: verify — Allen Iverson step-over on Tyronn Lue
      "J8uAiZJMB3Y", // TODO: verify — Vince Carter 2000 dunk contest
      "ySBGcImph-o", // TODO: verify — T-Mac 13 points in 35 seconds
      "Tg_bXrGaAyY", // TODO: verify — Dirk 2006 Finals game winner
      "8y5VGBvBfAA", // TODO: verify — LeBron first NBA game highlights
      "3fkHe84KTXY", // TODO: verify — Nash two-time MVP 2005 Suns highlights
      "oA5RsAa5Mbo", // TODO: verify — 2004 Pistons beat Lakers championship
      "rH3KhAGYAsE", // TODO: verify — Carmelo Anthony 2003 draft highlights
    ],
  },
  {
    id: "nfl-big-hits",
    slug: "nfl-big-hits",
    name: "NFL Big Hits",
    description:
      "The hardest-hitting moments in football history. Shoulder pads, turf, and thunder.",
    emoji: "🏈",
    channelNumber: "03",
    sport: "Football",
    era: "1990s–2010s",
    vibe: "Violent",
    videoIds: [
      "bNQ1A8ED1Ok", // TODO: verify — Ray Lewis greatest hits compilation
      "4L0vFNPwKbY", // TODO: verify — Jack Tatum legendary hits
      "G5gVMbzaSLk", // TODO: verify — Ed Reed best plays and hits
      "jvQ1bYoXn_4", // TODO: verify — Troy Polamalu best moments
      "AONyvmHCcN4", // TODO: verify — Brian Urlacher monster hits
      "pVkQlmzXFq0", // TODO: verify — Dick Butkus legendary footage
      "XEK8d8bTVFU", // TODO: verify — Lawrence Taylor greatest hits
    ],
  },
  {
    id: "boston-classics",
    slug: "boston-classics",
    name: "Boston Classics",
    description:
      "Celtics dynasties, Patriots championships, Red Sox miracles. Long-suffering fans rejoice.",
    emoji: "🍀",
    channelNumber: "04",
    sport: "Multi-sport",
    era: "1980s–2010s",
    vibe: "Blue-collar",
    videoIds: [
      "yDL6SwOTdNk", // TODO: verify — 2004 Red Sox ALCS comeback vs Yankees
      "K5aJBL7FHMA", // TODO: verify — David Ortiz walk-off hits compilation
      "5i7DLKoJFEg", // TODO: verify — Patriots Super Bowl XXXVI vs Rams
      "X0PfxNRHbqc", // TODO: verify — Tom Brady greatest comebacks
      "eOGphk2TSGA", // TODO: verify — Paul Pierce 2008 Celtics championship
      "hLEZyNFJx2w", // TODO: verify — Larry Bird greatest plays
      "mNb5pRk-3VQ", // TODO: verify — 2013 Red Sox World Series champions
    ],
  },
  {
    id: "florida-gators-tv",
    slug: "florida-gators-tv",
    name: "Florida Gators TV",
    description:
      "Swamp fever — Tebow tears, SEC championships, and the greatest college football dynasty.",
    emoji: "🐊",
    channelNumber: "05",
    sport: "College Football",
    era: "1990s–2010s",
    vibe: "Swamp heat",
    videoIds: [
      "Gv8v0-KOwP4", // TODO: verify — Tim Tebow greatest Gators moments
      "n2w_JlxQHEU", // TODO: verify — 1996 Gators national championship
      "5RaN7CDXkNg", // TODO: verify — Tebow promise speech after Ole Miss loss
      "uFY8aW7DQMQ", // TODO: verify — 2006 Gators national championship vs Ohio State
      "vD2qGJfGThg", // TODO: verify — Percy Harvin Gators highlights
      "H4HiVQY-4F0", // TODO: verify — Danny Wuerffel Heisman highlights
      "xzNT0zHUFOE", // TODO: verify — Urban Meyer Gators era best moments
    ],
  },
  {
    id: "tiger-sundays",
    slug: "tiger-sundays",
    name: "Tiger Sundays",
    description:
      "Tiger in red on Sunday afternoons. The most dominant golfer in history, hole by hole.",
    emoji: "🐯",
    channelNumber: "06",
    sport: "Golf",
    era: "1997–2019",
    vibe: "Dominant",
    videoIds: [
      "DkdFqRiPNPU", // TODO: verify — Tiger Woods 1997 Masters highlights
      "qMTAoLyKoVA", // TODO: verify — Tiger chip-in 2005 Masters 16th hole
      "Yt6PN12d_Mk", // TODO: verify — Tiger greatest shots compilation
      "p5P5DPpbqiA", // TODO: verify — Tiger 2000 US Open 15-shot win
      "mHwJoaGz0_4", // TODO: verify — Tiger 2019 Masters comeback win
      "0Bsb0bStU4Q", // TODO: verify — Tiger 2008 US Open on one leg
      "FGzCZmMeEHA", // TODO: verify — Tiger majors countdown compilation
    ],
  },
];
