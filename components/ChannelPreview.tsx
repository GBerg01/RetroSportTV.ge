import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

export default function ChannelPreview({ channel }: { channel: Channel }) {
  const thumbUrl = `https://img.youtube.com/vi/${channel.videos[0].id}/hqdefault.jpg`;
  const channelType = channel.categories?.[0]
    ? `${channel.categories[0]} CHANNEL`
    : "SPORTS CHANNEL";
  const accent = channel.accentColor ?? "#39ff14";

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#070707] overflow-hidden">
      {/* Accent color top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ backgroundColor: accent }} />

      {/* Thumbnail — more visible at 35% */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${thumbUrl})`,
          opacity: 0.35,
        }}
      />

      {/* Layered dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(7,7,7,0.98) 0%, rgba(7,7,7,0.7) 40%, rgba(7,7,7,0.4) 100%)",
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* CRT frame — edge masking + vignette */}
      <div className="absolute inset-0 crt-frame pointer-events-none" />

      {/* Broadcast content */}
      <div className="absolute inset-0 flex flex-col p-6 pt-7">
        {/* Top: channel type + signal indicator */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: `${accent}55` }}>
              {channelType}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#444] text-sm tracking-widest">
                CH {channel.channelNumber}
              </span>
              <span className="text-[#222]">·</span>
              <span className="text-[#383838] text-xs tracking-widest uppercase">
                {channel.sport}
              </span>
              <span className="text-[#222]">·</span>
              <span className="text-[#383838] text-xs tracking-widest">
                {channel.era}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-[0.25em]" style={{ color: accent }}>
              ● SIGNAL ACQUIRED
            </p>
            <p className="text-[#2a2a2a] text-xs tracking-[0.3em] mt-1">ON AIR</p>
          </div>
        </div>

        {/* Center: channel identity */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <h2
            className="text-4xl xl:text-5xl tracking-wide leading-tight"
            style={{
              color: accent,
              textShadow: `0 0 12px ${accent}80, 0 0 30px ${accent}40`,
            }}
          >
            <ChannelLogo channel={channel} className="mr-2" />
            {channel.name}
          </h2>
          <p
            className="text-xl tracking-widest mt-2"
            style={{ color: "var(--phosphor-amber)", textShadow: "0 0 8px var(--phosphor-amber), 0 0 20px rgba(255,176,0,0.4)" }}
          >
            {channel.vibe}
          </p>
          <p className="text-[#444] text-sm mt-4 leading-relaxed line-clamp-3">
            {channel.description}
          </p>
        </div>

        {/* Bottom: now airing + TUNE IN CTA */}
        <div>
          <p className="text-[#2a2a2a] text-xs tracking-[0.4em] mb-1">NOW AIRING</p>
          <p className="text-[#444] text-sm tracking-wide truncate mb-5">
            {channel.videos[0].title}
          </p>
          <Link
            href={`/channel/${channel.slug}`}
            className="accent-btn block text-center py-3 text-lg tracking-[0.35em] border"
            style={{ "--btn-accent": accent } as React.CSSProperties}
          >
            ▶ TUNE IN TO CH {channel.channelNumber}
          </Link>
        </div>
      </div>
    </div>
  );
}
