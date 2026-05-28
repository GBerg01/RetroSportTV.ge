import { getAllChannels } from "@/lib/channels";
import HomeHero from "@/components/HomeHero";
import ChannelBrowser from "@/components/ChannelBrowser";
import SportsTicker from "@/components/SportsTicker";

export default function Home() {
  const channels = getAllChannels();

  return (
    <main className="flex flex-col min-h-screen font-retro bg-[#0a0a0a]">
      {/* Full-width broadcast header */}
      <HomeHero channelCount={channels.length} />

      {/* Main content: two-column cable guide */}
      <div className="flex justify-center px-2 sm:px-4 xl:px-6 py-4 flex-1">
        <ChannelBrowser channels={channels} />
      </div>

      {/* Full-width ticker strip */}
      <SportsTicker channels={channels} />

      <footer className="py-4 text-center text-[#171717] text-base tracking-widest font-retro">
        ▓▒░ RETROSPORTTV.GE ░▒▓
      </footer>
    </main>
  );
}
