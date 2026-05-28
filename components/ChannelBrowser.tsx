"use client";

import { useState } from "react";
import ChannelRow from "@/components/ChannelRow";
import ChannelPreview from "@/components/ChannelPreview";
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

export default function ChannelBrowser({ channels }: { channels: Channel[] }) {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);

  function handleTabChange(tab: string) {
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
    <div className="w-full max-w-6xl border border-[#151515]">
      <div className="flex flex-col lg:flex-row">
        {/* ── Left: channel guide ── */}
        <div className="lg:w-[420px] xl:w-[460px] flex-shrink-0">
          {/* Guide header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#090909] border-b border-[#141414]">
            <span className="text-[var(--phosphor-green)] phosphor-glow text-sm tracking-[0.3em]">
              ── CHANNEL GUIDE
            </span>
            <span className="text-[#1c1c1c] text-xs tracking-widest">
              {filtered.length}&nbsp;CH&nbsp;AVAILABLE
            </span>
          </div>

          {/* Category tabs */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-2 bg-[#080808] border-b border-[#111]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs tracking-[0.3em] whitespace-nowrap transition-colors cursor-pointer pb-px ${
                  activeTab === tab
                    ? "text-[var(--phosphor-green)] phosphor-glow border-b border-[var(--phosphor-green)]"
                    : "text-[#252525] hover:text-[#555]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Channel rows */}
          <div>
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
          <div className="px-4 py-2 border-t border-[#0d0d0d] bg-[#080808]">
            <p className="text-[#181818] text-xs tracking-[0.3em]">
              ▓▒░&nbsp;RETROSPORTTV.GE&nbsp;·&nbsp;SPORTS&nbsp;PACKAGE&nbsp;v1.0&nbsp;░▒▓
            </p>
          </div>
        </div>

        {/* ── Right: channel preview ── */}
        <div className="hidden lg:flex flex-1 flex-col border-l border-[#141414]">
          <ChannelPreview channel={activeChannel} />
        </div>
      </div>
    </div>
  );
}
