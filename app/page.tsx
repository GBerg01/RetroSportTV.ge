import { getAllChannels } from "@/lib/channels";
import HomeHero from "@/components/HomeHero";
import ChannelGrid from "@/components/ChannelGrid";

export default function Home() {
  const channels = getAllChannels();

  return (
    <main className="flex flex-col items-center min-h-screen px-4 sm:px-6 py-10 font-retro">
      <HomeHero channelCount={channels.length} />
      <ChannelGrid channels={channels} />
      <footer className="mt-16 text-[#222] text-xl tracking-widest text-center">
        <p>▓▒░ RETROSPORTTV.GE ░▒▓</p>
      </footer>
    </main>
  );
}
