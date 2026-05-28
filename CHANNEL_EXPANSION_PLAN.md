# Channel Expansion Plan — RetroSportTV.ge

Planning document only. Do not add these channels to `data/channels.ts` yet.

RetroSportTV.ge should grow from a 6-channel MVP into a retro sports cable-box product: a guide full of ESPN Classic programming blocks, sports-bar feeds, VHS highlight tapes, studio desk clips, championship reruns, and curated nostalgia stations.

This document is the editorial roadmap. The typed implementation roadmap lives in `data/channelRoadmap.ts`.

## Product Rationale

The current MVP proves the core loop: open the app, choose a channel, and watch curated sports highlights through a retro TV interface. The next product leap is not search, social, or a database. It is programming depth.

100 themed channels makes sense long-term because:

- Channel surfing feels better when the guide has enough density to explore.
- Sports nostalgia naturally clusters by player, team, era, event, rivalry, chaos, studio desk, and ambient compilation.
- A large guide makes the product feel like a cable package instead of a small playlist page.
- Channels can launch gradually without changing the fullscreen player.
- Research candidates can be staged through `data/intake/` before promotion into live data.

## Why Not Launch All 100 At Once

Do not ship all 100 channels into the live homepage immediately.

- Empty or shallow channels would hurt the cable-box illusion.
- Video quality and embeddability need review.
- Duplicates and weak uploads need human curation.
- The current homepage needs to stay fast and legible.
- The right rollout is depth-first: launch fewer channels with strong playlists.

## Recommended Phased Rollout

### Phase A: Next 12 Channels

Build these first as candidate files, then import only after review:

1. Jordan TV
2. Bulls MJ Era
3. Super Bowl Channel
4. NBA Finals Channel
5. Inside the NBA Classics
6. Random Sports Compilations
7. Mike Tyson TV
8. March Madness TV
9. SportsCenter Classics
10. College Football Chaos
11. Patriots Dynasty
12. Tiger Sundays Expansion

### Phase B: Soon Channels

Prioritize channels with broad appeal, strong source availability, and obvious highlight footage: major teams, NBA/NFL eras, combat-sports anchors, event channels, and sports-bar ambient mixes.

### Phase C: Later Channels

Launch narrower or more experimental channels after the content pipeline proves reliable: studio/talk variants, niche individual sports, specialized chaos channels, GOAT debate, commercials, and atmosphere feeds.

## Launch Priority Tiers

- `next`: first 12 expansion builds.
- `soon`: strong second-wave candidates with likely content depth.
- `later`: valuable long-tail channels that need more careful sourcing or product timing.

## Research Rules

Use `data/researchQueue.ts`, `CONTENT_PIPELINE.md`, and `CONTENT_RESEARCH_GUIDE.md` before creating candidate files.

Good candidate research:

- Prefer official league, team, broadcast, tournament, or trusted highlight uploads.
- Prefer highlight/game footage over talking-head commentary.
- Use real YouTube URLs or IDs only after verification.
- Save candidates into `data/intake/<channel-slug>-candidates.json`.
- Import later with `npm run content:import-videos -- <file>`.
- Verify imported videos in the browser before committing live data.

Avoid:

- fake YouTube IDs;
- unverified URLs;
- reaction videos unless the channel specifically calls for commentary;
- low-quality reposts;
- Shorts unless intentionally building a Shorts-style channel;
- podcasts unless the channel specifically calls for studio/talk content;
- adding anything directly to live data before review.

## Full 100-Channel Roadmap

Each channel below includes its proposed channel number, category, sport, era, vibe, launch priority, example moments/search themes, ideal source phrases, and avoid notes. The same roadmap is exported in typed form from `data/channelRoadmap.ts`.

## 1. Player Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 01 | Kobe TV | Basketball | 1996-2016 | Cold-blooded | soon | 81-point game; final 60; Lakers playoff daggers; 2000-2002 titles; Kobe vs Iverson; Kobe vs T-Mac | Kobe Bryant 81 points highlights; Kobe clutch moments; Lakers Kobe playoff highlights | debate shows; reaction clips; motivational edits without game footage |
| 02 | Jordan TV | Basketball | 1984-1998 | Mythic | next | Flu Game; Bulls Finals; Shrug Game; 63 at Boston Garden; Last Shot; dunk contests | Michael Jordan flu game highlights; Jordan last shot; Jordan dunk contest highlights | GOAT debate panels; documentary trailers only |
| 03 | LeBron Archive | Basketball | 2003-present | Inevitable | soon | 2007 Pistons; 2012 Celtics Game 6; 2016 Finals; chase-down block; Heat titles; Lakers bubble run | LeBron playoff highlights; LeBron 2016 Finals; LeBron 2012 Game 6 | current news chatter; podcast arguments |
| 04 | Shaq Diesel TV | Basketball | 1992-2011 | Unstoppable | soon | Magic Shaq; Lakers three-peat; 2000 Finals; backboard breaks; Shaq vs Hakeem; Heat title | Shaq Lakers dominance; Shaquille O'Neal Finals highlights; Shaq top plays NBA | prank clips; studio-only clips unless for studio channel |
| 05 | Iverson TV | Basketball | 1996-2010 | Rebellious | soon | 2001 Finals; step-over; crossover on Jordan; Sixers playoff run; scoring titles; Georgetown | Allen Iverson 2001 Finals; Iverson crossover Jordan; Sixers Iverson highlights | practice meme-only clips; low-quality mixtapes |
| 06 | Vince Carter Airwaves | Basketball | 1998-2020 | Half-man half-amazing | soon | 2000 dunk contest; Olympic dunk; Raptors; Nets; game winners; late-career moments | Vince Carter 2000 dunk contest; Vince Carter Olympic dunk; Raptors highlights | short vertical reposts; reaction compilations |
| 07 | Steph Range TV | Basketball | 2009-present | Logo range | soon | 2016 OKC winner; 402 threes; Warriors Finals; deep threes; ankle breakers; records | Steph Curry deep threes; Curry OKC game winner; Curry Finals highlights | hot takes; shooting tutorials |
| 08 | Magic Showtime | Basketball | 1979-1991 | Fast break | later | 1980 Finals Game 6; Showtime breaks; Lakers/Celtics; Kareem connection; no-look passes; Dream Team | Magic Johnson Finals; Showtime Lakers highlights; Magic no-look passes | modern Lakers commentary |
| 09 | Larry Legend TV | Basketball | 1979-1992 | Cold Garden | later | 1986 Celtics; Bird vs Dominique; three-point contests; Lakers rivalry; clutch shots; passing | Larry Bird classic highlights; Bird Dominique duel; Larry Bird clutch shots | debate panels; poor transfers |
| 10 | D-Wade County | Basketball | 2003-2019 | Flash | soon | 2006 Finals; Big Three Heat; Wade blocks; Wade dunks; game winners; retirement tour | Dwyane Wade 2006 Finals; D-Wade Heat highlights; Wade blocks dunks | Heat debate shows; podcast clips |
| 11 | Big Ticket TV | Basketball | 1995-2016 | Intensity | soon | Timberwolves MVP; 2008 Celtics; defense; KG vs Duncan; playoff fire; interviews | Kevin Garnett Timberwolves; KG Celtics 2008; KG defensive highlights | talk-only clips; modern debate |
| 12 | Dirk Forever | Basketball | 1998-2019 | One-legged fade | later | 2011 Finals; 2011 playoffs; fadeaway; Mavs vs Spurs; Mavs vs Heat; farewell game | Dirk 2011 Finals; Dirk playoff highlights; Dirk fadeaway highlights | debate-only legacy clips |
| 13 | T-Mac Time | Basketball | 1997-2013 | Smooth heat | soon | 13 in 35; Magic scoring; Rockets; playoff scoring; All-Star moments; Kobe duels | Tracy McGrady 13 points; T-Mac Magic highlights; T-Mac Rockets highlights | injury retrospectives without highlights |
| 14 | Nash & Seven Seconds | Basketball | 2004-2010 | Fast tempo | later | MVP seasons; Suns breaks; Nash assists; Spurs series; Amare pick-and-roll; 2000s pace | Steve Nash Suns highlights; seven seconds or less Suns; Nash assists | analytics lectures without footage |
| 15 | Derrick Rose Channel | Basketball | 2008-2012 | Explosive | later | 2011 MVP; Bulls playoffs; dunks; acrobatic layups; game winners; rookie year | Derrick Rose MVP highlights; Derrick Rose Bulls highlights; Rose game winner | injury tragedy compilations |

## 2. Team Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 16 | Bulls MJ Era | Basketball | 1991-1998 | Dynasty | next | 1991-1998 Bulls; Rodman; Pippen; Phil Jackson; Jazz Finals; Knicks rivalry; 72 wins | Chicago Bulls 1990s highlights; Bulls Jazz Finals; Bulls Knicks rivalry | modern Bulls news; Jordan-only debate |
| 17 | Lakers Classics | Basketball | 1980s-2010s | Forum lights | soon | Showtime; Shaq/Kobe; Kobe/Pau; Lakers/Celtics; Magic Finals; Fisher 0.4 | Lakers classic highlights; Lakers Celtics Finals; Shaq Kobe Lakers | modern rumors; current debate |
| 18 | Celtics Vault | Basketball | 1980s-2010s | Garden ghosts | soon | 1986 Celtics; Bird; 2008 Celtics; Pierce/KG/Allen; Celtics/Lakers; Garden crowds | Boston Celtics classic highlights; 2008 Celtics Finals; Larry Bird Celtics | trade talk; radio arguments |
| 19 | Heat Culture TV | Basketball | 2003-present | South Beach grind | soon | 2006 Finals; Big Three; Ray Allen shot; LeBron/Wade; Jimmy Butler; White Hot crowds | Miami Heat classic highlights; Heat 2006 Finals; Ray Allen Game 6 | culture debate without footage |
| 20 | Warriors Dynasty | Basketball | 2014-2022 | Splash | soon | 2015 title; 73 wins; KD Warriors; Splash Brothers; 2017 Finals; 2022 title | Warriors dynasty highlights; Splash Brothers; Warriors 73 win season | current debate; trade speculation |
| 21 | Knicks Garden Classics | Basketball | 1970s-1990s | Garden grit | later | Ewing; Knicks/Heat; Reggie Miller; 1994 Finals; Oakley/Mason/Starks; MSG crowds | Knicks 1990s highlights; Knicks Heat rivalry; Ewing playoff highlights | talk radio; current debates |
| 22 | Pistons Bad Boys | Basketball | 1986-1991 | Bruising | soon | Isiah; Dumars; Rodman; Laimbeer; Jordan Rules; 1989/1990 titles | Detroit Pistons Bad Boys; Jordan Rules Pistons; Isiah Pistons | fight-only clips |
| 23 | Spurs System TV | Basketball | 1999-2014 | Clockwork | later | 1999 title; 2003 title; 2005 Finals; 2014 beautiful game; Duncan; Manu/Parker | Spurs dynasty highlights; 2014 Spurs Finals; Tim Duncan playoffs | boring-team debate clips |
| 24 | Patriots Dynasty | Football | 2001-2019 | Methodical | next | Tuck Rule; Super Bowl XXXVI; 2004 defense; 18-1; Super Bowl XLIX; Super Bowl LI | Patriots dynasty highlights; Tom Brady Super Bowl; Patriots comeback | scandal-only clips; debate panels |
| 25 | Cowboys America's Team | Football | 1970s-1990s | Star power | soon | Staubach; 1970s Super Bowls; Aikman/Irvin/Emmitt; 1990s dynasty; NFC titles; Thanksgiving | Dallas Cowboys 1990s; Cowboys Super Bowl classics; Emmitt Smith highlights | owner drama; modern talk |
| 26 | Steelers Classics | Football | 1970s-2010s | Black and gold | soon | Steel Curtain; Immaculate Reception; 1970s titles; Polamalu; 2005 title; 2008 title | Steelers classic highlights; Steel Curtain NFL Films; Polamalu Steelers | injury-focused hits |
| 27 | 49ers Gold Rush | Football | 1980s-1990s | West Coast | later | The Catch; Montana/Rice; Steve Young; 1994 title; Cowboys rivalry; Bill Walsh | 49ers classic highlights; Joe Montana 49ers; Jerry Rice highlights | trade talk; list videos |
| 28 | Red Sox Classics | Baseball | 1975-2018 | Fenway miracle | soon | Fisk 1975; 2004 ALCS; Bloody Sock; Ortiz walk-offs; 2007 title; 2013 title | Red Sox 2004 ALCS; David Ortiz walk off; Fenway classics | local talk radio |
| 29 | Yankees Dynasty TV | Baseball | 1977-2009 | Pinstripe pressure | soon | Reggie three homers; Jeter flip; 1996 title; 1998 Yankees; Rivera saves; 2009 title | Yankees postseason highlights; Derek Jeter playoffs; Yankees World Series | tabloid drama |
| 30 | Florida Gators TV | College Football | 1990s-2010s | Swamp heat | soon | Tebow; Spurrier; 1996 title; 2006 title; 2008 title; Florida/Georgia | Florida Gators Tebow; Gators national championship; Spurrier Florida | recruiting rumors; betting |

## 3. Era Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 31 | NBA 2000s | Basketball | 2000-2009 | SportsCenter era | soon | Iverson; Vince; Shaq/Kobe; T-Mac; early LeBron; Wade; Pistons; Spurs; Suns | NBA 2000s best plays; 2000s NBA playoffs; SportsCenter Top 10 NBA 2000s | modern reaction compilations |
| 32 | NBA 90s Hardwood | Basketball | 1990-1999 | Hand-check haze | soon | Bulls; Knicks/Heat; Reggie; Hakeem; Barkley; Sonics; Jazz Finals | NBA 1990s highlights; 90s NBA playoffs; Bulls Knicks Pacers | era debate without highlights |
| 33 | NBA 2010s Heat Check | Basketball | 2010-2019 | Modern classic | later | Heatles; Warriors; 2016 Cavs; Spurs 2014; OKC; Kawhi Raptors; Lob City | NBA 2010s highlights; 2016 Cavs Finals; Warriors dynasty | current debate |
| 34 | NFL 2000s Primetime | Football | 2000-2009 | Sunday recap | soon | Brady/Manning; Ray Lewis; LT; Vick; Favre; Steelers titles | NFL 2000s highlights; NFL Primetime 2000s; Brady Manning rivalry | fantasy football content |
| 35 | NFL 90s Smashmouth | Football | 1990-1999 | Shoulder pads | soon | Cowboys; 49ers; Bills; Barry Sanders; Deion; Favre | NFL 1990s highlights; Barry Sanders; Cowboys 49ers classics | injury compilations |
| 36 | MLB Steroid Era | Baseball | 1994-2004 | Long ball summer | later | McGwire/Sosa; Bonds; Griffey; home-run chase; Yankees; Braves pitching | MLB home run chase; McGwire Sosa 1998; Barry Bonds highlights | steroid debate-only clips |
| 37 | MLB 2000s October | Baseball | 2000-2009 | Fall pressure | later | 2001 World Series; 2004 Red Sox; 2006 Cardinals; 2008 Phillies; Ortiz; Jeter | MLB 2000s postseason; 2001 World Series Game 7; 2004 ALCS | regular-season filler |
| 38 | College Football BCS Era | College Football | 1998-2013 | BCS voltage | soon | Miami 2001; USC; Texas 2005; Florida Tebow; Boise State; Cam Newton | BCS classic games; college football 2000s; Texas USC Rose Bowl | recruiting content |
| 39 | SportsCenter Top 10 Era | Multi-sport | 1990s-2010s | Highlight desk | soon | Top 10; web gems; buzzer beaters; catches; anchors; nightly recaps | SportsCenter classic top 10; ESPN top plays archive; classic SportsCenter | fake edits |
| 40 | VHS Highlight Vault | Multi-sport | 1980s-2000s | Tape hiss | later | VHS tapes; old intros; player packages; arena music; scoreboards; late-night recaps | classic sports VHS highlights; ESPN Classic intros; vintage sports broadcasts | non-sports nostalgia |

## 4. Event Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 41 | Super Bowl Channel | Football | 1967-present | Big game | next | greatest Super Bowls; halftime moments; comebacks; game-winning drives; Montana; Brady; Giants upsets | Super Bowl greatest moments NFL Films; NFL Super Bowl highlights; greatest Super Bowl comebacks | prediction shows; betting previews |
| 42 | NBA Finals Channel | Basketball | 1980-present | Trophy room | next | Magic/Bird; Jordan; Lakers three-peat; 2008 Celtics; 2016 Cavs; Warriors | NBA Finals classics; greatest NBA Finals games; NBA Finals Game 7 | regular-season clips |
| 43 | March Madness TV | College Basketball | 1980-present | Bracket shock | next | buzzer beaters; Cinderellas; Duke/Kentucky 1992; Villanova; UConn; court storms | March Madness buzzer beaters; NCAA tournament classics; college basketball endings | bracket advice; gambling |
| 44 | World Series Classics | Baseball | 1975-present | Fall classic | soon | Fisk 1975; Gibson 1988; Yankees dynasty; 2001 Diamondbacks; 2004 Red Sox; Cubs 2016 | World Series classic highlights; greatest World Series moments; World Series Game 7 | offseason analysis |
| 45 | Stanley Cup Nights | Hockey | 1980-present | Overtime cold | soon | Cup-winning goals; Game 7 OT; Gretzky; Lemieux; Red Wings; goalie saves | Stanley Cup classics; NHL Game 7 overtime; Stanley Cup winning goals | fight-only clips |
| 46 | Olympic Legends | Multi-sport | 1980-present | Gold medal | later | Dream Team; Bolt; Phelps; Biles; gymnastics gold; track finals | Olympic classic highlights; Olympic legends; Team USA gold medal highlights | politics-only clips |
| 47 | World Cup Classics | Soccer | 1970-present | Global drama | soon | Maradona; Brazil 2002; Zidane; Germany 2014; shootouts; finals | World Cup classic highlights; greatest World Cup goals; World Cup final highlights | politics-only clips |
| 48 | Rivalry Week | Multi-sport | 1980-present | Bad blood | soon | Lakers/Celtics; Yankees/Red Sox; Michigan/Ohio State; Duke/UNC; Steelers/Ravens; El Clasico | greatest sports rivalries; rivalry game classics; rivalry week moments | debate-only rankings |
| 49 | Game 7 Network | Multi-sport | 1980-present | No tomorrow | later | NBA Game 7s; World Series Game 7; Stanley Cup Game 7; Cavs/Warriors; 2001 WS; playoff OT | greatest Game 7 highlights; NBA Game 7 classics; World Series Game 7 | predictions |
| 50 | Championship Sunday | Multi-sport | 1980-present | Trophy lift | later | conference championships; final rounds; title clinchers; trophy lifts; parades; last plays | championship Sunday highlights; title-clinching moments; championship moments | prediction shows |

## 5. Chaos Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 51 | NFL Big Hits | Football | 1990s-2010s | Ferocious | soon | Ray Lewis; Polamalu; goal-line stands; safeties; rivalry games; defensive packages | NFL biggest legal hits; NFL defensive highlights; Ray Lewis tackles | injury-focused compilations |
| 52 | College Football Chaos | College Football | 1980-present | Upset alert | next | Kick Six; Boise State; App State/Michigan; Hail Marys; blocked kicks; field storms | college football greatest endings; college football upsets; college football chaos | betting recaps |
| 53 | Buzzer Beater TV | Basketball | 1980-present | Last-second | soon | NBA winners; NCAA buzzer beaters; playoff daggers; half-court shots; March endings; crowd eruptions | NBA greatest buzzer beaters; NCAA buzzer beaters; basketball game winners | fake crowd audio |
| 54 | Walk-Off Channel | Baseball | 1975-present | Dugout eruption | soon | walk-off homers; playoff walk-offs; Kirk Gibson; Joe Carter; Ortiz; Game 7 endings | MLB greatest walk offs; playoff walk-off homers; World Series walk off | regular recaps |
| 55 | Miracle Finishes | Multi-sport | 1980-present | Impossible | soon | Music City Miracle; Meadowlands; Reggie Miller; Hail Marys; laterals; comebacks | greatest sports miracle finishes; impossible sports endings; last-second miracles | fake/staged clips |
| 56 | Sports Fights & Scrums | Multi-sport | 1980-present | Bad blood | later | bench-clearing; hockey scrums; NBA scuffles; rivalries; post-whistle chaos; altercations | sports fights classics; bench-clearing brawls; hockey scrums | non-sports violence |
| 57 | Posterized TV | Basketball | 1980-present | Above the rim | soon | Vince dunks; Shaq posters; LeBron dunks; Blake Griffin; college dunks; blocks | NBA poster dunks; greatest basketball dunks; college poster dunks | vertical reposts |
| 58 | Ankle Breaker Channel | Basketball | 1990-present | Shifty | later | Iverson; Kyrie; Curry; streetball; NBA ankle breakers; And1 | NBA ankle breakers; Iverson crossover; basketball handles | fake edited clips |
| 59 | Trick Play TV | Football | 1980-present | Gadget play | later | Boise State; Philly Special; fake punts; flea flickers; laterals; onside kicks | football trick plays; Philly Special; college football trick plays | video game clips |
| 60 | Ref Meltdown Network | Multi-sport | 1980-present | Whistle storm | later | coach ejections; umpire arguments; NBA techs; disputed calls; VAR drama; rants | classic sports ejections; coach meltdown highlights; referee calls sports | toxic outrage |

## 6. Talk Show / Studio Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 61 | NBA Tonight | Basketball | 1990s-2010s | Studio desk | soon | old NBA studio; playoff recaps; top plays; Finals desk; Shaq/Kenny/Charles/Ernie; funny desk clips | old NBA studio segments; NBA Tonight ESPN classic; NBA playoff studio recap | hot-take debate clips |
| 62 | Inside the NBA Classics | Basketball | 2000s-present | Late-night desk | next | Shaq/Kenny/Charles/Ernie; funny desk clips; Gone Fishin; guarantees; Kenny board; postgame laughs | Inside the NBA funniest moments Shaq Charles; Inside the NBA classic moments; Gone Fishin | out-of-context drama |
| 63 | SportsCenter Classics | Multi-sport | 1990s-2010s | Top ten glow | next | Top 10; web gems; anchors; This Is SportsCenter; rundowns; old intros | SportsCenter classic moments; classic SportsCenter Top 10; ESPN highlights | fake edits |
| 64 | PTI / Around the Horn Era | Multi-sport | 2001-2015 | Pardon the noise | later | PTI intros; Around the Horn; Kornheiser; Wilbon; panel scoring; ESPN afternoons | classic PTI moments; Around the Horn classic; early 2000s ESPN debate | rage bait |
| 65 | NFL Primetime Desk | Football | 1987-2005 | Sunday recap | soon | Berman; Tom Jackson; Sunday recaps; music packages; playoff recaps; ESPN NFL | NFL Primetime classics; Chris Berman Tom Jackson; ESPN NFL Primetime | fantasy shows |
| 66 | NBA Draft Night | Basketball | 1984-present | Green room | later | 1984 draft; 1996 draft; 2003 draft; steals; green room; David Stern era | classic NBA Draft moments; 1996 NBA Draft; 2003 NBA Draft LeBron | mock draft speculation |
| 67 | Trade Deadline TV | Multi-sport | 1990-present | Ticker panic | later | NBA trades; MLB deadline; NFL deadline; blockbuster reactions; ticker graphics; ESPN coverage | classic trade deadline coverage; biggest sports trades; ESPN trade deadline classic | rumor mills |
| 68 | Postgame Pressers | Multi-sport | 1980-present | Mic table | later | Iverson practice; Jim Mora; Dennis Green; championship podiums; retirements; coach rants | classic sports press conferences; famous athlete presser; coach rant sports | controversy farming |
| 69 | Mic'd Up Channel | Multi-sport | 1990-present | On-field audio | soon | NFL mic'd up; NBA audio; dugout audio; coach huddles; sidelines; trash talk | NFL mic'd up classic; NBA mic'd up; best mic'd up sports | audio without video context |
| 70 | Commercial Break Classics | Multi-sport | 1980s-2000s | Ad break | later | This Is SportsCenter; Nike ads; Gatorade ads; Jordan ads; Madden ads; local cable ads | classic sports commercials; This Is SportsCenter commercials; 90s Nike basketball ads | modern product ads |

## 7. Combat Sports Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 71 | Mike Tyson TV | Boxing | 1985-2005 | Knockout storm | next | knockouts; entrances; interviews; 80s heavyweight era; Spinks fight; training footage | Mike Tyson knockouts highlights; Mike Tyson classic fights; Tyson heavyweight highlights | crime retrospectives |
| 72 | Ali Classics | Boxing | 1960-1981 | Float and sting | soon | Liston; Frazier trilogy; Foreman; Rumble; rope-a-dope; interviews | Muhammad Ali classic fights; Ali Frazier highlights; Ali Foreman | politics-only clips |
| 73 | Mayweather Money Channel | Boxing | 1996-2017 | Precision | later | Pretty Boy Floyd; defense; De La Hoya; Hatton; Canelo; Pacquiao; Vegas | Floyd Mayweather highlights; Mayweather defense; Mayweather title fights | lifestyle clips |
| 74 | Pacquiao TV | Boxing | 1995-2021 | Relentless | later | Morales; Marquez; De La Hoya; Hatton KO; Cotto; Mayweather buildup | Manny Pacquiao highlights; Pacquiao knockouts; Pacquiao classic fights | politics content |
| 75 | UFC Knockout Channel | MMA | 1993-present | Cage lights | soon | Liddell; Silva; McGregor; Rousey; title KOs; comeback stoppages | UFC greatest knockouts; UFC classic finishes; UFC title fight KOs | graphic injury framing |
| 76 | UFC Rivalries | MMA | 2000-present | Bad blood | later | GSP/Penn; Silva/Sonnen; McGregor/Diaz; Jones/Cormier; Rousey; rematches | UFC greatest rivalries; UFC rematch highlights; UFC rivalry fights | weigh-in-only drama |
| 77 | Pride FC Vault | MMA | 1997-2007 | Japanese arena | later | Fedor; Cro Cop; Wanderlei; Sakuraba; Grand Prix; entrances | PRIDE FC classics; Fedor Pride; Cro Cop Pride knockouts | poor fan rips |
| 78 | WWE Attitude Era | Pro Wrestling | 1997-2002 | Pyro chaos | soon | Stone Cold; The Rock; DX; Undertaker; Monday Night Wars; title moments | WWE Attitude Era highlights; Stone Cold classic moments; The Rock Attitude Era | rumor channels |
| 79 | WrestleMania Channel | Pro Wrestling | 1985-present | Grand stage | later | Hogan/Andre; Undertaker streak; Shawn Michaels; Stone Cold; Cena; entrances | WrestleMania classic highlights; Undertaker streak; WWE WrestleMania moments | podcast commentary |
| 80 | Boxing Heavyweight Nights | Boxing | 1970-present | Big men under lights | soon | Ali/Frazier/Foreman; Tyson; Holyfield; Lennox; Klitschko; Wilder/Fury | heavyweight boxing classics; greatest heavyweight fights; heavyweight knockouts | non-heavyweight clips |

## 8. Golf / Tennis / Individual Sports Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 81 | Tiger Sundays Expansion | Golf | 1997-2019 | Sunday red | next | 1997 Masters; 2005 chip; 2008 US Open; 2019 Masters; Sunday red; clutch putts | Tiger Woods final round; Tiger Masters moments; Tiger clutch putts | swing tutorials |
| 82 | Masters Channel | Golf | 1975-present | Amen Corner | soon | Nicklaus 1986; Tiger 1997; Tiger 2019; Phil; Amen Corner; green jacket | Masters final round; Amen Corner classic; Masters iconic moments | golf instruction |
| 83 | Golf Meltdown TV | Golf | 1980-present | Club toss | later | major collapses; missed putts; playoff losses; water balls; Ryder Cup; final-hole drama | golf meltdowns; major golf collapse; Ryder Cup pressure | mockery-only compilations |
| 84 | Serena TV | Tennis | 1999-2022 | Power | soon | US Open; Wimbledon; Australian Open; Venus; match-point saves; Olympic doubles | Serena Grand Slam highlights; Serena Wimbledon final; US Open Serena | controversy-only clips |
| 85 | Federer Elegance | Tennis | 1998-2022 | Smooth | later | Wimbledon; Federer/Nadal 2008; US Open; backhands; Slam finals; Djokovic rivalry | Federer Wimbledon highlights; Federer Nadal 2008; Federer best shots | equipment reviews |
| 86 | Nadal Clay Court | Tennis | 2005-present | Red clay | later | French Open; Federer rivalry; Djokovic rivalry; clay rallies; Olympics; match points | Nadal French Open highlights; Nadal clay; Nadal Federer classic | training clips |
| 87 | Bolt Speed Channel | Track and Field | 2008-2016 | Lightning | soon | 2008 100m; 2009 record; 2012 Olympics; 2016 Olympics; relays; celebrations | Usain Bolt Olympic highlights; Bolt 100m record; Olympic sprint final | training advice |
| 88 | Phelps Pool TV | Swimming | 2000-2016 | Gold rush | later | 2008 Beijing; 4x100 relay; 8 golds; butterfly finals; Lochte; medal races | Michael Phelps Olympics; 2008 swimming relay; Phelps gold medal races | interview-only clips |
| 89 | X Games Classics | Action Sports | 1995-2015 | Ramp lights | soon | Tony Hawk 900; Shaun White; skate vert; BMX; Moto X; snowboarding | X Games classic highlights; Tony Hawk 900; Shaun White X Games | influencer vlogs |
| 90 | Surf / Snow / Extreme TV | Action Sports | 1990-present | Adrenaline | later | big waves; snowboard runs; ski jumps; Red Bull events; winter X Games; wipeouts | extreme sports classics; big wave surfing; snowboarding competition | travel vlogs |

## 9. College Sports Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 91 | College Hoops Classics | College Basketball | 1980-present | Campus hardwood | soon | Duke/Kentucky 1992; UConn; Kansas; UNC/Duke; Final Four; Cinderellas | college basketball classics; NCAA basketball games; Final Four classics | bracket advice |
| 92 | College Football Tailgate TV | College Football | 1980-present | Saturday morning | later | tailgates; campus intros; rivalries; bands; GameDay; stadium entrances | college football tailgate; stadium entrances; GameDay classic moments | betting shows |
| 93 | Miami Hurricanes Swagger | College Football | 1980s-2000s | Swagger | soon | 2001 Miami; Ed Reed; Portis; McGahee; wide right; Orange Bowl | 2001 Miami Hurricanes; Ed Reed Miami; Miami Hurricanes dynasty | recruiting gossip |
| 94 | USC Reggie Bush Era | College Football | 2003-2006 | Hollywood campus | soon | Reggie Bush; Leinart; Pete Carroll; 2004 title; Texas USC; Bush Push | USC Reggie Bush highlights; USC 2004; Texas USC Rose Bowl | sanctions debate-only clips |
| 95 | Texas Longhorn Classics | College Football | 1960s-2010s | Burnt orange | soon | Vince Young; Ricky Williams; Texas/OU; Colt McCoy; titles; rivalry wins | Texas Longhorns classics; Vince Young Rose Bowl; Texas OU classic | recruiting talk |

## 10. Compilation / Ambient Channels

| CH | Channel | Sport | Era | Vibe | Priority | Example moments / search themes | Ideal source phrases | Avoid |
|---|---|---|---|---|---|---|---|---|
| 96 | Random Sports Compilations | Multi-sport | 1980-present | Remote shuffle | next | catches; dunks; goals; hits; trick plays; Top 100s; weird endings | greatest sports moments compilation; random sports highlights; unbelievable sports plays | fake clips |
| 97 | Late Night Hoops | Basketball | 1980-present | After midnight | later | NBA late-night; streetball; ESPN recaps; classic dunks; smooth jumpers; reruns | late night basketball highlights; classic NBA mixtape; old NBA broadcast | music-only edits |
| 98 | Sports Bar Mix | Multi-sport | 1980-present | Eight TVs on | soon | multi-sport highlights; crowd reactions; walk-offs; buzzer beaters; hits; goals | sports bar highlights mix; best sports moments; multi sport classics | fake viral clips |
| 99 | Underdog Stories | Multi-sport | 1980-present | Against odds | later | Cinderellas; upsets; Miracle on Ice; Boise State; Leicester City; small-market titles | greatest sports underdog stories; biggest sports upsets; Cinderella highlights | documentary trailers only |
| 100 | GOAT Debate Channel | Multi-sport | 1990-present | Bar argument | later | Jordan/LeBron; Brady/Montana; Messi/Ronaldo; Serena; Tiger/Nicklaus; rankings | GOAT debate highlights sports; Jordan LeBron comparison; Brady Montana debate | hot takes without highlights |

## Connection To The Content Pipeline

This roadmap should feed the existing content workflow:

1. Choose a roadmap item from `data/channelRoadmap.ts`.
2. Use `CONTENT_RESEARCH_GUIDE.md` and `data/researchQueue.ts` to research candidate videos.
3. Save candidates into `data/intake/<channel-slug>-candidates.json`.
4. Review IDs, titles, quality scores, duplicate moments, and source quality.
5. Promote reviewed candidates with `npm run content:import-videos -- <file>`.
6. Verify playback in the browser.
7. Only then consider adding the channel to live `data/channels.ts`.

Until a channel is manually promoted, this plan is not live runtime data.

