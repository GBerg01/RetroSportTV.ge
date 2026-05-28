import ChannelProfileCard from "@/components/ChannelProfileCard";
import { getChannelArt } from "@/lib/channelArt";
import type { Channel } from "@/lib/channels";

export default function ChannelPreview({ channel }: { channel: Channel }) {
  const previewVideo = channel.videos[0];
  const thumbUrl = previewVideo
    ? `https://img.youtube.com/vi/${previewVideo.id}/hqdefault.jpg`
    : "";
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
          <div
            className="absolute top-0 left-0 right-0 h-[3px] z-10"
            style={{ backgroundColor: accent }}
          />

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

      <ChannelProfileCard channel={channel} featuredClipTitle={previewVideo?.title} />
    </div>
  );
}
