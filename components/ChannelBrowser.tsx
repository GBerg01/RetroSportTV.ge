"use client";

import { useState } from "react";
import ChannelRow from "@/components/ChannelRow";
import ChannelPreview from "@/components/ChannelPreview";
import type { Channel, ChannelCategory } from "@/lib/channels";

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

type ChannelTab = "ALL" | ChannelCategory;

export default function ChannelBrowser({ channels }: { channels: Channel[] }) {
  const [activeTab, setActiveTab] = useState<ChannelTab>("ALL");
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);

  function handleTabChange(tab: ChannelTab) {
    setActiveTab(tab);
    const next =
      tab === "ALL"
        ? channels
        : channels.filter((ch) => ch.categories?.includes(tab));
    if (next.length > 0) setActiveChannel(next[0]);
  }

  const filtered =
    activeTab === "ALL"
      ? channels
      : channels.filter((ch) => ch.categories?.includes(activeTab));

  return (
    <div className="w-full max-w-[1680px] border border-[#151515] bg-[#050505] shadow-[0_0_60px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col lg:flex-row">
        {/* ── Left: channel guide ── */}
        <div className="lg:basis-[74%] lg:max-w-[74%] flex-shrink-0">
          {/* Guide header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#090909] border-b border-[#141414]">
            <span className="text-[var(--phosphor-green)] phosphor-glow text-base tracking-[0.3em]">
              CHANNEL GUIDE
            </span>
            <span className="text-[#1c1c1c] text-xs tracking-widest">
              {filtered.length}&nbsp;CH&nbsp;AVAILABLE
            </span>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar px-3 sm:px-5 py-2 bg-[#080808] border-b border-[#111]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-sm tracking-[0.2em] whitespace-nowrap transition-colors cursor-pointer px-2 py-1 ${
                  activeTab === tab
                    ? "text-[var(--phosphor-green)] phosphor-glow bg-[#0a1a0a] border-b border-[var(--phosphor-green)]"
                    : "text-[#333] hover:text-[#666]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Channel rows */}
          <div className="bg-[#050505]">
            {filtered.length === 0 ? (
              <p className="px-6 py-8 text-[#222] text-sm tracking-[0.3em] text-center">
                NO CHANNELS IN THIS CATEGORY
              </p>
            ) : (
              filtered.map((ch) => (
                <ChannelRow
                  key={ch.id}
                  channel={ch}
                  isActive={activeChannel.id === ch.id}
                  onMouseEnter={() => setActiveChannel(ch)}
                />
              ))
            )}
          </div>

          {/* Guide footer */}
          <div className="px-4 sm:px-6 py-2 border-t border-[#0d0d0d] bg-[#080808]">
            <p className="text-[#181818] text-xs tracking-[0.3em]">
              ▓▒░&nbsp;RETROSPORTTV.GE&nbsp;·&nbsp;SPORTS&nbsp;PACKAGE&nbsp;v1.0&nbsp;░▒▓
            </p>
          </div>
        </div>

        {/* ── Right: channel preview ── */}
        <div className="hidden lg:block lg:basis-[26%] lg:max-w-[26%] border-l border-[#141414] bg-[#050505] sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto">
          <ChannelPreview channel={activeChannel} />
        </div>
      </div>
    </div>
  );
}
