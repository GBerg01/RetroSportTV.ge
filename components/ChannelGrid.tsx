import ChannelCard from "@/components/ChannelCard";
import type { Channel } from "@/lib/channels";

export default function ChannelGrid({ channels }: { channels: Channel[] }) {
  return (
    <section className="w-full max-w-4xl">
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-[#1a1a1a]" />
        <p className="text-[var(--phosphor-green)] text-xl tracking-[0.35em] phosphor-glow">
          CHANNEL GUIDE
        </p>
        <div className="flex-1 h-px bg-[#1a1a1a]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
