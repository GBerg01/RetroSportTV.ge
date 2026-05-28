export type ResearchTarget = {
  channelSlug: string;
  searchQueries: string[];
  mustIncludeTags: string[];
  avoidTerms: string[];
  preferredSources: string[];
  notes: string;
};

export const RESEARCH_QUEUE: ResearchTarget[] = [
  {
    channelSlug: "kobe-tv",
    searchQueries: [
      "Kobe Bryant full game highlights 2006 81 points",
      "Kobe Bryant clutch moments official NBA",
      "Kobe Bryant final game highlights 60 points",
    ],
    mustIncludeTags: ["kobe", "lakers", "nba", "highlights"],
    avoidTerms: ["reaction", "podcast", "shorts", "2k gameplay"],
    preferredSources: ["NBA", "Los Angeles Lakers", "ESPN", "House of Highlights"],
    notes: "Prioritize iconic games, official NBA uploads, and long highlight packages over commentary clips.",
  },
  {
    channelSlug: "jordan-tv",
    searchQueries: [
      "Michael Jordan flu game highlights official NBA",
      "Michael Jordan top plays career highlights",
      "Michael Jordan 1998 finals game 6 highlights",
    ],
    mustIncludeTags: ["jordan", "bulls", "nba", "classics"],
    avoidTerms: ["reaction", "debate", "podcast", "documentary trailer"],
    preferredSources: ["NBA", "Chicago Bulls", "ESPN"],
    notes: "Future player channel. Focus on Bulls-era playoff moments and official archival clips.",
  },
  {
    channelSlug: "nba-2000s",
    searchQueries: [
      "NBA 2000s best plays official",
      "Allen Iverson 2001 finals highlights",
      "Tracy McGrady 13 points 35 seconds official",
    ],
    mustIncludeTags: ["nba", "2000s", "classic", "highlights"],
    avoidTerms: ["reaction", "ranking debate", "podcast", "shorts"],
    preferredSources: ["NBA", "ESPN", "House of Highlights"],
    notes: "Keep the channel era-focused: 2000-2009 stars, playoffs, dunk contests, and signature games.",
  },
  {
    channelSlug: "nfl-big-hits",
    searchQueries: [
      "NFL biggest hits official highlights",
      "Ray Lewis biggest hits NFL",
      "Troy Polamalu career highlights",
    ],
    mustIncludeTags: ["nfl", "hits", "defense", "football"],
    avoidTerms: ["injury compilation", "reaction", "podcast", "madden"],
    preferredSources: ["NFL", "Pittsburgh Steelers", "Baltimore Ravens", "ESPN"],
    notes: "Avoid injury-focused framing. Prefer defensive highlight reels from official/team sources.",
  },
  {
    channelSlug: "boston-classics",
    searchQueries: [
      "Boston sports classic highlights Red Sox Patriots Celtics",
      "2004 Red Sox ALCS highlights",
      "Patriots Super Bowl comeback highlights",
    ],
    mustIncludeTags: ["boston", "classics", "championship", "highlights"],
    avoidTerms: ["talk radio", "podcast", "reaction", "odds"],
    preferredSources: ["MLB", "NFL", "NBA", "Boston Celtics", "New England Patriots", "Boston Red Sox"],
    notes: "Mix sports, but keep the thread as Boston title runs, miracles, and legends.",
  },
  {
    channelSlug: "florida-gators-tv",
    searchQueries: [
      "Florida Gators Tim Tebow promise speech",
      "Florida Gators 2006 national championship highlights",
      "Florida Gators 2008 football highlights",
    ],
    mustIncludeTags: ["florida", "gators", "college football", "sec"],
    avoidTerms: ["recruiting rumors", "podcast", "reaction", "betting"],
    preferredSources: ["ESPN College Football", "SEC Network", "Florida Gators"],
    notes: "Prioritize Tebow-era football, national title games, and official school or broadcast sources.",
  },
  {
    channelSlug: "tiger-sundays",
    searchQueries: [
      "Tiger Woods Masters final round highlights",
      "Tiger Woods 2008 US Open highlights",
      "Tiger Woods best shots official PGA",
    ],
    mustIncludeTags: ["tiger woods", "golf", "masters", "pga"],
    avoidTerms: ["swing tutorial", "podcast", "reaction", "golf tips"],
    preferredSources: ["PGA TOUR", "The Masters", "USGA", "Golf Channel"],
    notes: "Favor final-round drama, major championships, and broadcast-length official uploads.",
  },
  {
    channelSlug: "college-football-chaos",
    searchQueries: [
      "college football greatest endings highlights",
      "college football upset highlights classic",
      "college football chaos rivalry game highlights",
    ],
    mustIncludeTags: ["college football", "chaos", "upset", "classic"],
    avoidTerms: ["betting", "podcast", "reaction", "video game"],
    preferredSources: ["ESPN College Football", "NCAA", "conference networks"],
    notes: "Future chaos channel. Look for blocked kicks, laterals, upsets, rivalry endings, and crowd storms.",
  },
  {
    channelSlug: "buzzer-beaters",
    searchQueries: [
      "NBA greatest buzzer beaters official",
      "NCAA March Madness buzzer beaters",
      "basketball game winners classic highlights",
    ],
    mustIncludeTags: ["basketball", "buzzer beater", "game winner", "clutch"],
    avoidTerms: ["reaction", "debate", "podcast", "shorts only"],
    preferredSources: ["NBA", "NCAA March Madness", "ESPN"],
    notes: "Future moment-type channel. Prefer clips with broadcast audio and enough context before the shot.",
  },
  {
    channelSlug: "rivalry-week",
    searchQueries: [
      "greatest rivalry games highlights sports",
      "Yankees Red Sox rivalry highlights",
      "Lakers Celtics rivalry highlights",
      "college football rivalry week classic games",
    ],
    mustIncludeTags: ["rivalry", "classic", "highlights"],
    avoidTerms: ["betting", "podcast", "argument", "reaction"],
    preferredSources: ["ESPN", "NBA", "MLB", "NFL", "college conference networks"],
    notes: "Future cross-sport channel. Keep the curation about historic rivalry games, not debate content.",
  },
  {
    channelSlug: "sportscenter-classics",
    searchQueries: [
      "classic SportsCenter highlights 2000s",
      "ESPN SportsCenter top 10 classic",
      "This is SportsCenter classic commercials highlights",
    ],
    mustIncludeTags: ["sportscenter", "espn", "classic", "2000s"],
    avoidTerms: ["podcast", "reaction", "debate", "fake"],
    preferredSources: ["ESPN", "SportsCenter"],
    notes: "Future vibe channel. Validate rights and embed availability carefully; prefer official ESPN uploads.",
  },
];

