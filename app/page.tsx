import { getAllChannels } from "@/lib/channels";
import HomeHero from "@/components/HomeHero";
import ChannelGuide from "@/components/ChannelGuide";
import SportsTicker from "@/components/SportsTicker";

export default function Home() {
  const channels = getAllChannels();

  return (
    <main className="flex flex-col min-h-screen font-retro">
      {/* Centered content column */}
      <div className="flex flex-col items-center px-4 sm:px-6 py-10">
        <HomeHero channelCount={channels.length} />
        <ChannelGuide channels={channels} />
      </div>

      {/* Full-width ticker strip */}
      <SportsTicker channels={channels} />

      <footer className="mt-auto py-6 text-center text-[#1e1e1e] text-xl tracking-widest">
        ▓▒░ RETROSPORTTV.GE ░▒▓
      </footer>
    </main>
  );
}
