import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

export default function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/channel/${channel.slug}`}
      className="group flex flex-col border border-[#1e1e1e] bg-[#0d0d0d] rounded overflow-hidden
                 hover:border-[var(--phosphor-green)] transition-colors duration-150"
    >
      {/* Channel number strip */}
      <div className="flex items-center justify-between px-4 py-2
                      bg-[#111] border-b border-[#1a1a1a]
                      group-hover:bg-[#0a160a] group-hover:border-[#1a3a1a]
                      transition-colors">
        <span className="text-[#3a3a3a] text-base tracking-[0.3em]
                         group-hover:text-[var(--phosphor-green)] transition-colors">
          CH {channel.channelNumber}
        </span>
        <span className="text-[#252525] text-sm tracking-widest uppercase">
          {channel.sport}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-4">
        <div className="flex items-start gap-3">
          <ChannelLogo channel={channel} className="max-h-8 max-w-8 text-3xl leading-none flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[#d8d8d8] text-xl leading-tight tracking-wide truncate">
              {channel.name}
            </p>
            <p className="text-[#484848] text-base mt-1 leading-snug line-clamp-2">
              {channel.description}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 text-sm tracking-widest">
          <span className="text-[#333]">{channel.era}</span>
          <span className="text-[#222]">·</span>
          <span className="text-[var(--phosphor-amber)] opacity-70
                           group-hover:opacity-100 transition-opacity">
            {channel.vibe}
          </span>
        </div>
      </div>

      {/* Tune-in footer */}
      <div className="px-4 py-2 border-t border-[#141414]
                      text-[#282828] text-sm tracking-[0.3em]
                      group-hover:text-[var(--phosphor-green)] group-hover:border-[#1a3a1a]
                      transition-colors">
        ▶ TUNE IN
      </div>
    </Link>
  );
}
