"use client";

import { useState } from "react";
import Link from "next/link";
import type { Channel } from "@/lib/channels";

type Props = {
  channel: Channel;
  prevChannel: Channel;
  nextChannel: Channel;
};

export default function ChannelPlayer({ channel, prevChannel, nextChannel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = channel.videoIds.length;
  const videoId = channel.videoIds[currentIndex];

  function goNext() {
    setCurrentIndex((i) => (i + 1) % total);
  }

  function goShuffle() {
    // Pick any index other than the current one to guarantee a visible change
    const next = (currentIndex + 1 + Math.floor(Math.random() * (total - 1))) % total;
    setCurrentIndex(next);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 py-8 font-retro">
      {/* Back */}
      <div className="w-full max-w-4xl mb-4">
        <Link
          href="/"
          className="text-[#555] hover:text-[var(--phosphor-green)] text-xl tracking-widest transition-colors"
        >
          ◄ ALL CHANNELS
        </Link>
      </div>

      {/* Channel header */}
      <header className="w-full max-w-4xl mb-5">
        <div className="flex items-baseline gap-4 flex-wrap">
          <span className="text-[#555] text-2xl tracking-widest">CH {channel.channelNumber}</span>
          <h1 className="text-[var(--phosphor-green)] phosphor-glow text-5xl md:text-6xl tracking-wide">
            {channel.emoji} {channel.name}
          </h1>
        </div>
        <p className="text-[#777] text-xl mt-2 leading-snug">{channel.description}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-lg text-[#555]">
          <span>{channel.sport}</span>
          <span className="text-[#333]">·</span>
          <span>{channel.era}</span>
          <span className="text-[#333]">·</span>
          <span className="text-[var(--phosphor-amber)] amber-glow">{channel.vibe}</span>
        </div>
      </header>

      {/* CRT player */}
      <div className="w-full max-w-4xl">
        {/* Scanline + glow wrapper */}
        <div
          className="relative scanlines overflow-hidden rounded"
          style={{
            aspectRatio: "16 / 9",
            boxShadow: "0 0 40px rgba(57, 255, 20, 0.12), 0 0 80px rgba(57, 255, 20, 0.05)",
          }}
        >
          <iframe
            key={`${channel.slug}-${currentIndex}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${channel.name} — video ${currentIndex + 1} of ${total}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Video counter + status bar */}
        <div className="flex justify-between items-center mt-3 px-1">
          <span className="text-[var(--phosphor-green)] text-xl tracking-widest">
            VIDEO {currentIndex + 1} / {total}
          </span>
          <span className="text-[#444] text-lg tracking-widest">
            ● REC
          </span>
        </div>
      </div>

      {/* Controls */}
      <nav className="w-full max-w-4xl mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Prev channel */}
        <Link
          href={`/channel/${prevChannel.slug}`}
          className="flex flex-col items-center justify-center border border-[#2a2a2a] rounded p-4
                     hover:border-[var(--phosphor-amber)] hover:text-[var(--phosphor-amber)]
                     text-[#555] transition-colors text-center"
        >
          <span className="text-2xl">◄◄</span>
          <span className="text-base mt-1 tracking-wide">CH {prevChannel.channelNumber}</span>
          <span className="text-lg">{prevChannel.name}</span>
        </Link>

        {/* Next video */}
        <button
          onClick={goNext}
          className="flex flex-col items-center justify-center border border-[#2a2a2a] rounded p-4
                     hover:border-[var(--phosphor-green)] hover:text-[var(--phosphor-green)]
                     text-[#555] transition-colors cursor-pointer"
        >
          <span className="text-2xl">► NEXT</span>
          <span className="text-base mt-1 tracking-wide">VIDEO</span>
        </button>

        {/* Shuffle */}
        <button
          onClick={goShuffle}
          className="flex flex-col items-center justify-center border border-[#2a2a2a] rounded p-4
                     hover:border-[var(--phosphor-green)] hover:text-[var(--phosphor-green)]
                     text-[#555] transition-colors cursor-pointer"
        >
          <span className="text-2xl">⟳ SHUFFLE</span>
          <span className="text-base mt-1 tracking-wide">RANDOM</span>
        </button>

        {/* Next channel */}
        <Link
          href={`/channel/${nextChannel.slug}`}
          className="flex flex-col items-center justify-center border border-[#2a2a2a] rounded p-4
                     hover:border-[var(--phosphor-amber)] hover:text-[var(--phosphor-amber)]
                     text-[#555] transition-colors text-center"
        >
          <span className="text-2xl">►►</span>
          <span className="text-base mt-1 tracking-wide">CH {nextChannel.channelNumber}</span>
          <span className="text-lg">{nextChannel.name}</span>
        </Link>
      </nav>

      <footer className="mt-16 text-[#2a2a2a] text-xl tracking-widest">
        ▓▒░ RETROSPORTTV.GE ░▒▓
      </footer>
    </main>
  );
}
