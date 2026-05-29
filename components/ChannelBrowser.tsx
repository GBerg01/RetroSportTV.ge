"use client";

import { useState, useMemo } from "react";
import ChannelRow from "@/components/ChannelRow";
import ChannelPreview from "@/components/ChannelPreview";
import { useLocalStorage } from "@/hooks/useLocalStorage";
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

function applyFilters(
  channels: Channel[],
  tab: ChannelTab,
  showFavsOnly: boolean,
  favSlugs: string[],
  query: string
): Channel[] {
  let result =
    tab === "ALL" ? channels : channels.filter((ch) => ch.categories?.includes(tab));
  if (showFavsOnly) result = result.filter((ch) => favSlugs.includes(ch.slug));
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (ch) =>
        ch.name.toLowerCase().includes(q) ||
        ch.slug.toLowerCase().includes(q) ||
        ch.description.toLowerCase().includes(q) ||
        ch.categories?.some((c) => c.toLowerCase().includes(q)) ||
        ch.sport.toLowerCase().includes(q) ||
        ch.era.toLowerCase().includes(q)
    );
  }
  return result;
}

export default function ChannelBrowser({ channels }: { channels: Channel[] }) {
  const [activeTab, setActiveTab] = useState<ChannelTab>("ALL");
  const [activeChannelId, setActiveChannelId] = useState<string>(channels[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const [favSlugs, setFavSlugs] = useLocalStorage<string[]>("retro-tv-favorites", []);

  const filtered = useMemo(
    () => applyFilters(channels, activeTab, showFavsOnly, favSlugs, searchQuery),
    [channels, activeTab, showFavsOnly, favSlugs, searchQuery]
  );

  // Derive active channel — falls back to first visible channel if the hovered
  // channel is filtered out, without needing a sync effect.
  const activeChannel =
    filtered.find((ch) => ch.id === activeChannelId) ?? filtered[0] ?? channels[0];

  function toggleFavorite(slug: string) {
    setFavSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const emptyMessage = searchQuery.trim()
    ? "NO SIGNAL FOUND"
    : showFavsOnly
      ? "NO FAVORITES SAVED"
      : "NO CHANNELS IN THIS CATEGORY";

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

          {/* Search strip */}
          <div className="px-3 sm:px-5 py-3 bg-[#060606] border-b border-[#111]">
            <p className="text-[#2d5c2d] text-[9px] tracking-[0.5em] mb-2 select-none">SIGNAL SEARCH</p>
            <div className="flex items-center gap-3 border border-[#1d401d] bg-[#030803] px-3 py-2.5
                            focus-within:border-[#39ff14]
                            focus-within:shadow-[0_0_18px_rgba(57,255,20,0.13),inset_0_0_10px_rgba(57,255,20,0.05)]
                            transition-all duration-150">
              <span className="text-[#39ff14] text-[12px] flex-shrink-0 select-none opacity-50">▶</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CHANNELS..."
                className="flex-1 bg-transparent text-[#39ff14] text-[13px] tracking-[0.16em]
                           placeholder:text-[#3d6a3d] outline-none border-none font-retro uppercase min-w-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#3d6a3d] hover:text-[#39ff14] text-[11px] cursor-pointer flex-shrink-0 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category tabs + favorites toggle */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar px-3 sm:px-5 py-2 bg-[#080808] border-b border-[#111]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm tracking-[0.2em] whitespace-nowrap transition-colors cursor-pointer px-2 py-1 ${
                  activeTab === tab && !showFavsOnly
                    ? "text-[var(--phosphor-green)] phosphor-glow bg-[#0a1a0a] border-b border-[var(--phosphor-green)]"
                    : "text-[#333] hover:text-[#666]"
                }`}
              >
                {tab}
              </button>
            ))}
            <span className="text-[#1a1a1a] self-center px-1 select-none flex-shrink-0">|</span>
            <button
              onClick={() => setShowFavsOnly((v) => !v)}
              className={`text-sm tracking-[0.2em] whitespace-nowrap transition-colors cursor-pointer px-2 py-1 flex-shrink-0 ${
                showFavsOnly
                  ? "text-[#f5c842] bg-[#1a1500] border-b border-[#f5c842]"
                  : "text-[#555] hover:text-[#888]"
              }`}
            >
              ★&nbsp;FAV
            </button>
          </div>

          {/* Channel rows */}
          <div className="bg-[#050505]">
            {filtered.length === 0 ? (
              <p className="px-6 py-12 text-[#252525] text-sm tracking-[0.35em] text-center">
                {emptyMessage}
              </p>
            ) : (
              filtered.map((ch) => (
                <ChannelRow
                  key={ch.id}
                  channel={ch}
                  isActive={activeChannel.id === ch.id}
                  isFavorited={favSlugs.includes(ch.slug)}
                  onMouseEnter={() => setActiveChannelId(ch.id)}
                  onFavoriteToggle={() => toggleFavorite(ch.slug)}
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
