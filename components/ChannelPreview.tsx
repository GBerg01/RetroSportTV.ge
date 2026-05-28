import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

export default function ChannelPreview({ channel }: { channel: Channel }) {
  const thumbUrl = `https://img.youtube.com/vi/${channel.videos[0].id}/hqdefault.jpg`;
  const channelType = channel.categories?.[0]
    ? `${channel.categories[0]} CHANNEL`
    : "SPORTS CHANNEL";

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#070707] overflow-hidden">
      {/* Thumbnail — dark tinted background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${thumbUrl})`,
          opacity: 0.22,
        }}
      />

      {/* Layered dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(7,7,7,0.98) 0%, rgba(7,7,7,0.75) 45%, rgba(7,7,7,0.45) 100%)",
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* CRT frame — edge masking + vignette */}
      <div className="absolute inset-0 crt-frame pointer-events-none" />

      {/* Broadcast content */}
      <div className="absolute inset-0 flex flex-col p-6">
        {/* Top: channel type + signal indicator */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#222] text-xs tracking-[0.4em] uppercase mb-1">
              {channelType}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#282828] text-sm tracking-widest">
                CH {channel.channelNumber}
              </span>
              <span className="text-[#161616]">·</span>
              <span className="text-[#252525] text-xs tracking-widest uppercase">
                {channel.sport}
              </span>
              <span className="text-[#161616]">·</span>
              <span className="text-[#252525] text-xs tracking-widest">
                {channel.era}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[var(--phosphor-green)] phosphor-glow text-xs tracking-[0.25em]">
              ● SIGNAL ACQUIRED
            </p>
            <p className="text-[#1e1e1e] text-xs tracking-[0.3em] mt-1">ON AIR</p>
          </div>
        </div>

        {/* Center: channel identity */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <h2 className="text-[var(--phosphor-green)] phosphor-glow text-3xl xl:text-4xl tracking-wide leading-tight">
            <ChannelLogo channel={channel} className="mr-2" />
            {channel.name}
          </h2>
          <p className="text-[var(--phosphor-amber)] amber-glow text-lg tracking-widest mt-2">
            {channel.vibe}
          </p>
          <p className="text-[#2e2e2e] text-sm mt-3 leading-relaxed line-clamp-3">
            {channel.description}
          </p>
        </div>

        {/* Bottom: now airing + TUNE IN CTA */}
        <div>
          <p className="text-[#1c1c1c] text-xs tracking-[0.4em] mb-1">NOW AIRING</p>
          <p className="text-[#333] text-sm tracking-wide truncate mb-5">
            {channel.videos[0].title}
          </p>
          <Link
            href={`/channel/${channel.slug}`}
            className="block text-center py-3 text-lg tracking-[0.35em]
                       border border-[#252525] text-[#2a2a2a]
                       hover:border-[var(--phosphor-green)] hover:text-[var(--phosphor-green)]
                       hover:phosphor-glow transition-colors duration-150"
          >
            ▶ TUNE IN TO CH {channel.channelNumber}
          </Link>
        </div>
      </div>
    </div>
  );
}
