import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

type Props = {
  channel: Channel;
  isActive?: boolean;
  onMouseEnter?: () => void;
};

export default function ChannelRow({ channel, isActive = false, onMouseEnter }: Props) {
  const accent = channel.accentColor ?? "#39ff14";
  const categoryLabel = channel.categories?.[0] ?? "SPORTS";

  return (
    <Link
      href={`/channel/${channel.slug}`}
      onMouseEnter={onMouseEnter}
      className="group flex items-center gap-4 border-b border-[#0d0d0d] last:border-b-0
                 px-4 py-4 border-l-[3px] transition-colors duration-100"
      style={{
        borderLeftColor: isActive ? accent : "transparent",
        backgroundColor: isActive ? `${accent}0e` : "transparent",
      }}
    >
      {/* CH number badge */}
      <div
        className="flex flex-col items-center justify-center w-[54px] h-[54px] flex-shrink-0 border"
        style={{
          backgroundColor: `${accent}${isActive ? "22" : "0d"}`,
          borderColor: `${accent}${isActive ? "55" : "28"}`,
        }}
      >
        <span
          className="text-[9px] tracking-[0.25em] leading-none"
          style={{ color: `${accent}99` }}
        >
          CH
        </span>
        <span
          className="text-[22px] leading-tight tracking-tight"
          style={{ color: accent }}
        >
          {channel.channelNumber}
        </span>
      </div>

      {/* Logo */}
      <div className="flex-shrink-0 text-3xl leading-none">
        <ChannelLogo channel={channel} className="text-3xl leading-none" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Name + category badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[22px] sm:text-2xl tracking-wide leading-tight transition-colors"
            style={{ color: isActive ? "#ffffff" : "#cccccc" }}
          >
            {channel.name}
          </span>
          <span
            className="text-[9px] tracking-[0.2em] px-1.5 py-px border hidden sm:inline-block"
            style={{
              borderColor: `${accent}35`,
              color: `${accent}88`,
              backgroundColor: `${accent}0a`,
            }}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[11px] tracking-widest text-[#333]">{channel.sport}</span>
          <span className="text-[#1e1e1e]">·</span>
          <span className="text-[11px] tracking-widest text-[#333]">{channel.era}</span>
          <span className="text-[#1e1e1e]">·</span>
          <span
            className="text-[11px] tracking-widest transition-opacity"
            style={{
              color: "var(--phosphor-amber)",
              opacity: isActive ? 1 : 0.35,
            }}
          >
            {channel.vibe}
          </span>
        </div>
      </div>

      {/* TUNE IN */}
      <div className="flex-shrink-0 self-center hidden sm:block">
        <span
          className="text-sm tracking-[0.3em] whitespace-nowrap transition-colors"
          style={{ color: isActive ? accent : "#262626" }}
        >
          ▶&nbsp;TUNE&nbsp;IN
        </span>
      </div>
    </Link>
  );
}
