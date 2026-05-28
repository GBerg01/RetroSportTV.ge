import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

type Props = {
  channel: Channel;
  isActive?: boolean;
  onMouseEnter?: () => void;
};

export default function ChannelRow({ channel, isActive = false, onMouseEnter }: Props) {
  const channelType = channel.categories?.[0]
    ? `${channel.categories[0]} CH`
    : "SPORTS CH";

  return (
    <Link
      href={`/channel/${channel.slug}`}
      onMouseEnter={onMouseEnter}
      className={`group flex items-start gap-0 border-b border-[#0f0f0f] last:border-b-0
                 px-4 py-3 border-l-2 transition-colors duration-150
                 ${isActive
                   ? "bg-[#0d1a0d] border-l-[var(--phosphor-green)]"
                   : "bg-[#0a0a0a] border-l-transparent hover:bg-[#0d160d] hover:border-l-[var(--phosphor-green)]"
                 }`}
    >
      {/* CH number */}
      <div className="w-14 flex-shrink-0 pt-0.5">
        <span className={`text-base tracking-widest transition-colors ${
          isActive
            ? "text-[var(--phosphor-green)]"
            : "text-[#2a2a2a] group-hover:text-[var(--phosphor-green)]"
        }`}>
          CH {channel.channelNumber}
        </span>
      </div>

      {/* Logo */}
      <div className="w-8 flex-shrink-0 pt-0.5">
        <ChannelLogo channel={channel} className="text-xl leading-none" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={`text-lg tracking-wide transition-colors ${
            isActive ? "text-white" : "text-[#d0d0d0] group-hover:text-white"
          }`}>
            {channel.name}
          </span>
          <span className="text-[#1e1e1e] text-xs tracking-widest hidden sm:inline">
            {channelType}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap hidden sm:flex">
          <span className="text-[#252525] text-xs tracking-widest">{channel.sport}</span>
          <span className="text-[#161616]">·</span>
          <span className="text-[#252525] text-xs tracking-widest">{channel.era}</span>
          <span className="text-[#161616]">·</span>
          <span className={`text-xs tracking-widest transition-opacity ${
            isActive
              ? "text-[var(--phosphor-amber)] opacity-100"
              : "text-[var(--phosphor-amber)] opacity-30 group-hover:opacity-100"
          }`}>
            {channel.vibe}
          </span>
        </div>
      </div>

      {/* TUNE IN */}
      <div className="flex-shrink-0 self-center">
        <span className={`text-sm tracking-widest transition-colors whitespace-nowrap ${
          isActive
            ? "text-[var(--phosphor-green)]"
            : "text-[#1a1a1a] group-hover:text-[var(--phosphor-green)]"
        }`}>
          ▶ TUNE IN
        </span>
      </div>
    </Link>
  );
}
