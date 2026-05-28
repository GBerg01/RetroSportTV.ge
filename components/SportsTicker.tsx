import type { Channel } from "@/lib/channels";

const STATIC_ITEMS = [
  "◄ RETROSPORTTV.GE ►",
  "NO CABLE REQUIRED",
  "● SIGNAL: STRONG ●",
  "TUNE IN. ZONE OUT.",
  "◄ ON AIR — SPORTS HIGHLIGHTS ►",
  "BROADCASTING NOW",
  "ESPN CLASSIC IS GONE. WE AREN'T.",
];

export default function SportsTicker({ channels }: { channels: Channel[] }) {
  const channelItems = channels.flatMap((ch) => [
    `CH ${ch.channelNumber} ─ ${ch.name.toUpperCase()}`,
    `${ch.sport.toUpperCase()} ─ ${ch.era} ─ ${ch.vibe.toUpperCase()}`,
  ]);

  const items = [
    STATIC_ITEMS[0],
    ...channelItems.slice(0, 4),
    STATIC_ITEMS[1],
    STATIC_ITEMS[2],
    ...channelItems.slice(4),
    STATIC_ITEMS[3],
    STATIC_ITEMS[4],
    STATIC_ITEMS[5],
    STATIC_ITEMS[6],
  ];

  // Duplicate for seamless infinite scroll
  const displayItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-t border-[#141414] bg-[#060606] py-2 mt-10">
      <div className="ticker-track flex">
        {displayItems.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-5 font-retro text-[#2a2a2a] text-base tracking-widest"
          >
            <span className="text-[#1c1c1c]">◆</span>
            {"  "}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
