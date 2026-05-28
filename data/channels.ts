export type Video = {
  id: string;   // 11-char YouTube video ID — verify at youtube.com/watch?v=<id>
  title: string;
};

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
  videos: Video[];
};

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
    videos: [
      { id: "EjDMsGFN2kM", title: "Kobe Bryant 81 Points vs Toronto Raptors (Jan 22, 2006)" },
      { id: "qjFVSROeqRE", title: "Kobe Bryant 60-Point Farewell Game (Apr 13, 2016)" },
      { id: "9mSQQeu5yNs", title: "Kobe Bryant 2000 NBA Slam Dunk Contest" },
      { id: "T7KKWL5FnhA", title: "Kobe Bryant 2010 NBA Finals Game 7 — 28 Pts, 15 Reb" },
      { id: "5MhGY-dvaOI", title: "Kobe Bryant 62 Points in 3 Quarters vs Dallas Mavericks (2005)" },
      { id: "uYNN9VKQAEM", title: "Kobe Bryant 2005–06 Scoring Title — Season Highlights" },
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
    videos: [
      { id: "hpFNbfMHFCY", title: "Allen Iverson Step-Over Tyronn Lue — 2001 NBA Finals" },
      { id: "J8uAiZJMB3Y", title: "Vince Carter 2000 NBA Slam Dunk Contest — Perfect Score" },
      { id: "ySBGcImph-o", title: "Tracy McGrady 13 Points in 35 Seconds (Dec 9, 2004)" },
      { id: "Tg_bXrGaAyY", title: "Dirk Nowitzki 2006 NBA Finals — Championship Run" },
      { id: "oA5RsAa5Mbo", title: "2004 Detroit Pistons — Beating the Lakers for the Title" },
      { id: "3fkHe84KTXY", title: "Steve Nash Two-Time MVP — 2005–06 Phoenix Suns Highlights" },
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
    vibe: "Ferocious",
    videos: [
      { id: "bNQ1A8ED1Ok", title: "Ray Lewis Best Hits and Tackles — Career Compilation" },
      { id: "jvQ1bYoXn_4", title: "Troy Polamalu Greatest Plays — Steelers Legend" },
      { id: "G5gVMbzaSLk", title: "Ed Reed Best Interceptions and Hits" },
      { id: "XEK8d8bTVFU", title: "Lawrence Taylor — Defining Career Moments" },
      { id: "AONyvmHCcN4", title: "Brian Urlacher Monster Hits — Chicago Bears" },
      { id: "pVkQlmzXFq0", title: "Dick Butkus — The Most Feared Man in Football" },
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
    videos: [
      { id: "yDL6SwOTdNk", title: "2004 Red Sox ALCS Comeback vs Yankees — Down 0-3 to Champions" },
      { id: "5i7DLKoJFEg", title: "Patriots Super Bowl XXXVI vs Rams — Dynasty Begins" },
      { id: "X0PfxNRHbqc", title: "Tom Brady Greatest Comebacks Compilation" },
      { id: "eOGphk2TSGA", title: "Paul Pierce & 2008 Celtics — Championship Run" },
      { id: "hLEZyNFJx2w", title: "Larry Bird Greatest Plays — Celtic Pride" },
      { id: "K5aJBL7FHMA", title: "David Ortiz Walk-Off Hits — Big Papi's Best Moments" },
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
    videos: [
      { id: "5RaN7CDXkNg", title: "Tim Tebow Promise Speech After Ole Miss Loss (2008)" },
      { id: "uFY8aW7DQMQ", title: "2006 Florida Gators National Championship vs Ohio State" },
      { id: "Gv8v0-KOwP4", title: "Tim Tebow Greatest Moments at Florida" },
      { id: "H4HiVQY-4F0", title: "Danny Wuerffel Heisman Trophy Highlights (1996)" },
      { id: "vD2qGJfGThg", title: "Percy Harvin Florida Gators Highlights" },
      { id: "n2w_JlxQHEU", title: "1996 Florida Gators National Championship Season" },
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
    videos: [
      { id: "DkdFqRiPNPU", title: "Tiger Woods 1997 Masters — Record 18-Under Win at 21" },
      { id: "qMTAoLyKoVA", title: "Tiger Woods Chip-In Hole 16 — 2005 Masters (Most Replayed Golf Shot Ever)" },
      { id: "p5P5DPpbqiA", title: "Tiger Woods 2000 US Open — 15-Shot Victory at Pebble Beach" },
      { id: "0Bsb0bStU4Q", title: "Tiger Woods 2008 US Open — Playing on a Broken Leg" },
      { id: "mHwJoaGz0_4", title: "Tiger Woods 2019 Masters Comeback — Fifth Green Jacket" },
      { id: "Yt6PN12d_Mk", title: "Tiger Woods Greatest Career Shots Compilation" },
    ],
  },
];
