import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import { getChannelArt } from "@/lib/channelArt";
import type { Channel } from "@/lib/channels";

type Props = {
  channel: Channel;
  isActive?: boolean;
  isFavorited?: boolean;
  onMouseEnter?: () => void;
  onFavoriteToggle?: () => void;
};

export default function ChannelRow({ channel, isActive = false, isFavorited = false, onMouseEnter, onFavoriteToggle }: Props) {
  const art = getChannelArt(channel);
  const accent = art.accent;
  const categoryLabel = channel.categories?.[0] ?? "SPORTS";
  const hasCustomRowArt = Boolean(art.rowBackgroundUrl);

  return (
    <Link
      href={`/channel/${channel.slug}`}
      onMouseEnter={onMouseEnter}
      className="group relative isolate flex min-h-[106px] items-stretch gap-4 overflow-hidden border-b border-[#111] last:border-b-0
                 px-3 py-3 sm:px-5 sm:py-4 border-l-[5px] transition-[filter,transform,border-color] duration-150
                 hover:brightness-125"
      style={{
        borderLeftColor: isActive ? accent : "transparent",
        background: art.background,
        backgroundSize: hasCustomRowArt ? "cover, auto, auto, auto, auto" : undefined,
        backgroundPosition: hasCustomRowArt ? "center" : undefined,
        filter: isActive
          ? "brightness(1.22) saturate(1.16)"
          : hasCustomRowArt
            ? "brightness(1.02) saturate(1.08)"
            : "brightness(0.82) saturate(0.92)",
      }}
    >
      <div
        className="absolute inset-0 -z-10 transition-opacity group-hover:opacity-95"
        style={{
          opacity: hasCustomRowArt ? 0.34 : 0.7,
          background: hasCustomRowArt
            ? `linear-gradient(90deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.18) 44%, transparent 72%, ${accent}18 100%)`
            : `linear-gradient(90deg, rgba(0,0,0,0.25), transparent 48%, ${accent}12)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px opacity-80"
        style={{
          background: hasCustomRowArt
            ? `linear-gradient(90deg, transparent, ${art.secondaryAccent}80, transparent)`
            : "transparent",
        }}
      />
      <div
        className="absolute -right-6 top-1/2 -z-10 hidden -translate-y-1/2 select-none text-[92px] leading-none opacity-[0.08] blur-[0.2px] sm:block xl:text-[118px]"
        style={{ color: art.secondaryAccent }}
      >
        {art.graphicLabel}
      </div>

      {/* CH number badge */}
      <div
        className="flex w-[76px] flex-shrink-0 flex-col items-center justify-center border sm:w-[88px]"
        style={{
          backgroundColor: `${accent}${isActive ? "26" : "16"}`,
          borderColor: `${accent}${isActive ? "55" : "28"}`,
          boxShadow: isActive ? `inset 0 0 22px ${accent}24, 0 0 18px ${accent}14` : "none",
        }}
      >
        <span
          className="text-[10px] tracking-[0.3em] leading-none"
          style={{ color: `${accent}99` }}
        >
          CH
        </span>
        <span
          className="text-[26px] sm:text-[30px] leading-tight tracking-tight"
          style={{ color: accent }}
        >
          {channel.channelNumber}
        </span>
      </div>

      {/* Logo */}
      <div
        className="hidden w-[84px] flex-shrink-0 items-center justify-center border bg-black/20 text-4xl leading-none sm:flex"
        style={{
          borderColor: `${art.secondaryAccent}33`,
          color: art.secondaryAccent,
        }}
      >
        <ChannelLogo channel={channel} className="max-h-12 max-w-12 text-4xl leading-none" />
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        {/* Name + category badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[27px] sm:text-[34px] xl:text-[38px] tracking-wide leading-none transition-colors"
            style={{ color: isActive ? "#ffffff" : "#cccccc" }}
          >
            {channel.name}
          </span>
          <span
            className="text-[10px] tracking-[0.24em] px-2 py-1 border hidden sm:inline-block"
            style={{
              borderColor: `${accent}50`,
              color: isActive ? accent : `${accent}99`,
              backgroundColor: `${accent}12`,
            }}
          >
            {categoryLabel}
          </span>
          {hasCustomRowArt ? (
            <span
              className="hidden border bg-black/25 px-2 py-1 text-[10px] tracking-[0.22em] sm:inline-block"
              style={{
                borderColor: `${art.secondaryAccent}55`,
                color: art.secondaryAccent,
              }}
            >
              ART LOCKED
            </span>
          ) : null}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[12px] tracking-widest text-[#777] uppercase">{channel.sport}</span>
          <span className="text-[#333]">/</span>
          <span className="text-[12px] tracking-widest text-[#666] uppercase">{channel.era}</span>
          <span className="text-[#333]">/</span>
          <span
            className="text-[12px] tracking-widest uppercase transition-opacity"
            style={{
              color: art.secondaryAccent,
              opacity: isActive ? 1 : 0.72,
            }}
          >
            {channel.vibe}
          </span>
        </div>
        <p className="mt-2 hidden max-w-[760px] truncate text-[13px] tracking-wide text-[#585858] md:block">
          {channel.description}
        </p>
      </div>

      {/* Favorite toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFavoriteToggle?.();
        }}
        className="group/fav flex-shrink-0 self-center cursor-pointer px-1 sm:px-2"
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <span
          className="flex items-center justify-center border text-[16px] leading-none w-9 h-9 transition-all duration-150"
          style={
            isFavorited
              ? {
                  borderColor: "#f5c84270",
                  color: "#f5c842",
                  backgroundColor: "#f5c84218",
                  textShadow: "0 0 10px #f5c84299",
                }
              : {
                  borderColor: "rgba(255,255,255,0.10)",
                  color: "#555",
                  backgroundColor: "rgba(0,0,0,0.18)",
                }
          }
        >
          ★
        </span>
      </button>

      {/* TUNE IN */}
      <div className="hidden flex-shrink-0 self-center md:block">
        <span
          className="border px-3 py-2 text-sm tracking-[0.3em] whitespace-nowrap transition-colors"
          style={{
            borderColor: isActive ? `${accent}70` : "rgba(255,255,255,0.08)",
            color: isActive ? accent : "#4b4b4b",
            backgroundColor: isActive ? `${accent}12` : "rgba(0,0,0,0.18)",
          }}
        >
          ▶&nbsp;TUNE&nbsp;IN
        </span>
      </div>
    </Link>
  );
}
