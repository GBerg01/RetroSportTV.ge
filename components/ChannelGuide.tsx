"use client";

import { useState } from "react";
import ChannelRow from "@/components/ChannelRow";
import type { Channel } from "@/lib/channels";

const TABS = [
  "ALL",
  "PLAYERS",
  "ERAS",
  "TEAMS",
  "CHAOS",
  "CLASSICS",
  "COLLEGE",
  "GOLF",
] as const;

export default function ChannelGuide({ channels }: { channels: Channel[] }) {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filtered =
    activeTab === "ALL"
      ? channels
      : channels.filter((ch) => ch.categories?.includes(activeTab));

  return (
    <section className="w-full max-w-4xl">
      {/* Guide header */}
      <div className="flex items-center gap-0 mb-0 border border-[#151515] bg-[#090909] px-4 py-2">
        <span className="text-[var(--phosphor-green)] phosphor-glow text-lg tracking-[0.3em]">
          ── CHANNEL GUIDE
        </span>
        <span className="ml-auto text-[#222] text-base tracking-widest">
          {filtered.length} CH AVAILABLE
        </span>
      </div>

      {/* Category tabs */}
      <div
        className="flex gap-5 overflow-x-auto no-scrollbar
                   border-x border-b border-[#151515] bg-[#070707]
                   px-4 py-2 mb-0"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-base tracking-widest whitespace-nowrap transition-colors cursor-pointer pb-px ${
              activeTab === tab
                ? "text-[var(--phosphor-green)] phosphor-glow border-b border-[var(--phosphor-green)]"
                : "text-[#2a2a2a] hover:text-[#555]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Channel rows */}
      <div className="border-x border-b border-[#151515]">
        {filtered.length === 0 ? (
          <p className="px-6 py-10 text-[#2a2a2a] text-xl tracking-[0.3em] text-center">
            NO CHANNELS IN THIS CATEGORY
          </p>
        ) : (
          filtered.map((ch) => <ChannelRow key={ch.id} channel={ch} />)
        )}
      </div>
    </section>
  );
}
