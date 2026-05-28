import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import { getChannelArt } from "@/lib/channelArt";
import type { Channel } from "@/lib/channels";

export default function ChannelPreview({ channel }: { channel: Channel }) {
  const previewVideo = channel.videos[0];
  const thumbUrl = previewVideo
    ? `https://img.youtube.com/vi/${previewVideo.id}/hqdefault.jpg`
    : "";
  const channelType = channel.categories?.[0]
    ? `${channel.categories[0]} CHANNEL`
    : "SPORTS CHANNEL";
  const art = getChannelArt(channel);
  const accent = art.accent;
  const previewSrc = previewVideo
    ? `https://www.youtube.com/embed/${previewVideo.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&start=2`
    : "";

  return (
    <div className="flex h-full min-h-[560px] flex-col bg-[#050505] p-4 xl:p-5">
      <div
        className="relative overflow-hidden border bg-[#090909] shadow-[inset_0_0_28px_rgba(0,0,0,0.9),0_18px_55px_rgba(0,0,0,0.45)]"
        style={{ borderColor: `${accent}35` }}
      >
        <div className="flex items-center justify-between border-b border-[#151515] bg-[#060606] px-3 py-2">
          <span className="text-[10px] tracking-[0.34em]" style={{ color: accent }}>
            LIVE
          </span>
          <span className="text-[10px] tracking-[0.24em] text-[#333]">
            CH {channel.channelNumber}
          </span>
        </div>
        <div className="relative aspect-video overflow-hidden bg-black">
      {/* Accent color top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ backgroundColor: accent }} />

      {previewVideo ? (
        <>
          {/* Thumbnail fallback sits behind the muted preview while the iframe starts. */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${thumbUrl})`,
              opacity: 0.48,
            }}
          />
          <iframe
            key={`${channel.slug}-${previewVideo.id}`}
            className="absolute inset-0 h-full w-full pointer-events-none opacity-90"
            src={previewSrc}
            title={`${channel.name} preview`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${accent}26 0%, rgba(7,7,7,0.92) 55%, #070707 100%)`,
          }}
        />
      )}

      {/* Layered dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 46%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* CRT frame — edge masking + vignette */}
      <div className="absolute inset-0 crt-frame pointer-events-none" />
        </div>
      </div>

      {/* Broadcast content */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col border border-[#111] bg-[#080808] p-4">
        {/* Top: channel type + signal indicator */}
        <div className="flex items-start justify-between gap-4">
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
              ● SIGNAL
            </p>
            <p className="text-[#2a2a2a] text-xs tracking-[0.3em] mt-1">ON AIR</p>
          </div>
        </div>

        {/* Center: channel identity */}
        <div className="flex flex-1 flex-col justify-center py-4">
          <h2
            className="text-3xl xl:text-4xl tracking-wide leading-tight"
            style={{
              color: accent,
              textShadow: `0 0 12px ${accent}80, 0 0 30px ${accent}40`,
            }}
          >
            <ChannelLogo channel={channel} className="mr-2" />
            {channel.name}
          </h2>
          <p
            className="text-lg tracking-widest mt-2 uppercase"
            style={{ color: art.secondaryAccent, textShadow: `0 0 8px ${art.secondaryAccent}70` }}
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
            {previewVideo?.title ?? "SIGNAL PENDING"}
          </p>
          <Link
            href={`/channel/${channel.slug}`}
            className="accent-btn block text-center py-3 text-base tracking-[0.28em] border"
            style={{ "--btn-accent": accent } as React.CSSProperties}
          >
            ▶ TUNE IN TO CH {channel.channelNumber}
          </Link>
        </div>
      </div>
    </div>
  );
}
