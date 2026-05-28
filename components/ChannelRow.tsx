import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import type { Channel } from "@/lib/channels";

export default function ChannelRow({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/channel/${channel.slug}`}
      className="group flex items-start gap-0 border-b border-[#111] last:border-b-0
                 px-4 py-4 bg-[#0a0a0a]
                 hover:bg-[#0c150c]
                 border-l-2 border-l-transparent hover:border-l-[var(--phosphor-green)]
                 transition-colors duration-150"
    >
      {/* CH number — fixed column */}
      <div className="w-16 flex-shrink-0 pt-1">
        <span className="text-[#2a2a2a] text-lg tracking-widest
                         group-hover:text-[var(--phosphor-green)] transition-colors">
          CH {channel.channelNumber}
        </span>
      </div>

      {/* Logo */}
      <div className="w-9 flex-shrink-0 pt-1">
        <ChannelLogo channel={channel} className="text-2xl leading-none" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-baseline gap-x-3 flex-wrap leading-snug">
          <span className="text-[#d8d8d8] text-xl tracking-wide
                           group-hover:text-white transition-colors">
            {channel.name}
          </span>
          <span className="text-[#2a2a2a] text-sm tracking-widest hidden sm:inline">
            {channel.sport} · {channel.era}
          </span>
          <span className="text-[var(--phosphor-amber)] text-sm tracking-widest
                           opacity-40 group-hover:opacity-100 transition-opacity hidden sm:inline">
            {channel.vibe}
          </span>
        </div>
        <p className="text-[#282828] text-base mt-1 leading-snug truncate
                      group-hover:text-[#3e3e3e] transition-colors hidden sm:block">
          {channel.description}
        </p>
        {/* Mobile meta — show below name on small screens */}
        <p className="text-[#2a2a2a] text-sm tracking-widest mt-0.5 sm:hidden">
          {channel.sport} · {channel.era}
        </p>
      </div>

      {/* TUNE IN — right rail */}
      <div className="flex-shrink-0 self-center">
        <span className="text-[#1c1c1c] text-lg tracking-widest
                         group-hover:text-[var(--phosphor-green)] transition-colors whitespace-nowrap">
          ▶ TUNE IN
        </span>
      </div>
    </Link>
  );
}
