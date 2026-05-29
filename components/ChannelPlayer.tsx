"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { Channel } from "@/lib/channels";
import ChannelLogo from "@/components/ChannelLogo";

// Minimal YT IFrame API surface we use
interface YTPlayer {
  loadVideoById(opts: { videoId: string; startSeconds?: number }): void;
  destroy(): void;
}
declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        config: {
          videoId?: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, number | string>;
          events?: { onStateChange?: (e: { data: number }) => void };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = { channel: Channel; prevChannel: Channel; nextChannel: Channel };

export default function ChannelPlayer({ channel, prevChannel, nextChannel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialRef = useRef(true);

  // Refs so event handlers always see latest values without re-creating.
  // channel is static SSG data — totalRef/videosRef only need initialization.
  // currentIndexRef syncs via effect below to stay current without reading during render.
  const totalRef = useRef(channel.videos.length);
  const videosRef = useRef(channel.videos);
  const currentIndexRef = useRef(currentIndex);

  const goNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % totalRef.current),
    []
  );

  const goShuffle = useCallback(() => {
    const ci = currentIndexRef.current;
    const t = totalRef.current;
    const next = (ci + 1 + Math.floor(Math.random() * (t - 1))) % t;
    setCurrentIndex(next);
  }, []);

  // Keep currentIndexRef in sync for use inside stable callbacks
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Show overlay on activity, auto-hide after 3 s
  const resetHideTimer = useCallback(() => {
    setShowOverlay(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
  }, []);

  // Lock body scroll + start initial auto-hide timer (showOverlay starts true)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    hideTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
    return () => {
      document.body.style.overflow = "";
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Initialize YouTube IFrame API
  useEffect(() => {
    let destroyed = false;

    function initPlayer() {
      if (destroyed || !playerDivRef.current) return;
      playerRef.current = new window.YT!.Player(playerDivRef.current, {
        videoId: videosRef.current[0].id,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          start: 2,
          controls: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === 0) goNext(); // 0 = ENDED
          },
        },
      });
    }

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [goNext]);

  // On index change: flash then load new video
  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      return;
    }
    setIsFlashing(true);
    const t1 = setTimeout(() => {
      playerRef.current?.loadVideoById({
        videoId: videosRef.current[currentIndex].id,
        startSeconds: 2,
      });
    }, 150);
    const t2 = setTimeout(() => setIsFlashing(false), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentIndex]);

  const video = channel.videos[currentIndex];
  const total = channel.videos.length;

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ cursor: showOverlay ? "default" : "none" }}
      onMouseMove={resetHideTimer}
    >
      {/* YouTube player */}
      <div className="absolute inset-0">
        <div ref={playerDivRef} className="w-full h-full" />
      </div>

      {/* Transparent layer — keeps iframe from capturing clicks and pausing */}
      <div className="absolute inset-0 z-10" onClick={resetHideTimer} />

      {/* CRT frame: scanlines + edge masking + vignette — integrates iframe into the TV environment */}
      <div className="absolute inset-0 z-20 pointer-events-none scanlines crt-frame" />

      {/* Channel-change flash */}
      {isFlashing && (
        <div className="absolute inset-0 z-30 pointer-events-none tv-cut" />
      )}

      {/* ── Top overlay: channel identity ── */}
      <div
        className={`absolute top-0 left-0 right-0 z-40 px-6 pt-5 pb-20
          bg-gradient-to-b from-black/75 via-black/25 to-transparent
          pointer-events-none transition-opacity duration-500
          ${showOverlay ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[#666] text-2xl tracking-widest font-retro">
            CH {channel.channelNumber}
          </span>
          <h1 className="text-[var(--phosphor-green)] phosphor-glow text-4xl md:text-5xl tracking-wide font-retro">
            <ChannelLogo channel={channel} className="max-h-10 max-w-10 mr-2" />
            {channel.name}
          </h1>
          <span className="text-[var(--phosphor-amber)] amber-glow text-xl font-retro">
            {channel.vibe}
          </span>
        </div>
      </div>

      {/* ── Bottom overlay: now playing + controls ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-40 px-6 pb-5 pt-20
          bg-gradient-to-t from-black/80 via-black/30 to-transparent
          transition-opacity duration-500
          ${showOverlay ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-[#777] text-lg font-retro tracking-wide mb-3 truncate pointer-events-none">
          <span className="text-[#444]">NOW PLAYING  </span>
          {video.title}
          <span className="text-[#3a3a3a] ml-4">
            {currentIndex + 1} / {total}
          </span>
        </p>

        <nav className="flex items-center gap-5 flex-wrap pointer-events-auto">
          <Link
            href="/"
            className="text-[#3a3a3a] hover:text-[#666] font-retro text-xl tracking-widest transition-colors"
          >
            ◄ MENU
          </Link>
          <span className="text-[#222]">|</span>
          <Link
            href={`/channel/${prevChannel.slug}`}
            className="text-[#555] hover:text-[var(--phosphor-amber)] font-retro text-xl tracking-widest transition-colors"
          >
            ◄◄ CH {prevChannel.channelNumber}
          </Link>
          <button
            onClick={goNext}
            className="text-[#555] hover:text-[var(--phosphor-green)] font-retro text-xl tracking-widest transition-colors cursor-pointer"
          >
            ► NEXT
          </button>
          <button
            onClick={goShuffle}
            className="text-[#555] hover:text-[var(--phosphor-green)] font-retro text-xl tracking-widest transition-colors cursor-pointer"
          >
            ⟳ SHUFFLE
          </button>
          <Link
            href={`/channel/${nextChannel.slug}`}
            className="text-[#555] hover:text-[var(--phosphor-amber)] font-retro text-xl tracking-widest transition-colors"
          >
            CH {nextChannel.channelNumber} ►►
          </Link>
        </nav>
      </div>
    </div>
  );
}
