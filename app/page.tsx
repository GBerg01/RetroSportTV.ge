import Link from "next/link";
import { getAllChannels, type Channel } from "@/lib/channels";
import ChannelLogo from "@/components/ChannelLogo";

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/channel/${channel.slug}`}
      className="relative border border-[#333] bg-[#111] rounded p-5
                 hover:border-[var(--phosphor-green)] hover:bg-[#0d1a0d]
                 transition-colors duration-150 group block"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[#555] text-lg group-hover:text-[var(--phosphor-green)] transition-colors">
          CH {channel.channelNumber}
        </p>
        <div className="w-2 h-2 rounded-full bg-[#333] group-hover:bg-[var(--phosphor-green)] transition-colors" />
      </div>
      <ChannelLogo channel={channel} className="text-4xl" />
      <p className="text-[#e8e8e8] text-2xl mt-2 tracking-wide">{channel.name}</p>
      <p className="text-[#666] text-lg mt-1 leading-snug">{channel.description}</p>
      <div className="mt-3 flex gap-3 text-sm">
        <span className="text-[#444]">{channel.sport}</span>
        <span className="text-[#333]">·</span>
        <span className="text-[#444]">{channel.era}</span>
      </div>
    </Link>
  );
}

export default function Home() {
  const channels = getAllChannels();

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-12 font-retro">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-[var(--phosphor-amber)] amber-glow text-2xl tracking-widest mb-1">
          ◄ ON AIR ►
        </p>
        <h1 className="text-[var(--phosphor-green)] phosphor-glow text-7xl md:text-8xl tracking-tight leading-none">
          RETROSPORT<span className="text-[var(--phosphor-amber)] amber-glow">TV</span>
        </h1>
        <p className="text-[var(--phosphor-amber)] amber-glow text-3xl tracking-widest mt-1">
          .GE
        </p>
        <p className="text-[#888] text-2xl mt-4 tracking-wide">
          Channel-surf the greatest sports moments
        </p>
      </header>

      {/* Channel grid */}
      <section className="w-full max-w-4xl">
        <p className="text-[var(--phosphor-green)] text-xl tracking-widest mb-6 text-center">
          ── SELECT A CHANNEL ──
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
        <p className="text-[#333] text-lg text-center mt-6 tracking-widest">
          {channels.length} CHANNELS AVAILABLE
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-[#444] text-xl tracking-widest">
        <p>▓▒░ RETROSPORTTV.GE ░▒▓</p>
        <p className="mt-1 text-lg">No cable required.</p>
      </footer>
    </main>
  );
}
