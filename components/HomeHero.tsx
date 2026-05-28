export default function HomeHero({ channelCount }: { channelCount: number }) {
  return (
    <header className="w-full border-b border-[#161616] bg-[#070707]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main header bar */}
        <div className="flex items-center justify-between py-3 gap-x-4">
          {/* Left: wordmark */}
          <div className="flex items-baseline gap-2 flex-shrink-0">
            <span className="text-[var(--phosphor-green)] phosphor-glow text-2xl sm:text-3xl tracking-wide power-on">
              RETROSPORTTV
              <span className="text-[var(--phosphor-amber)] amber-glow">.GE</span>
            </span>
            <span className="text-[#1a1a1a] text-xs tracking-widest hidden sm:inline">v1.0</span>
          </div>

          {/* Center: broadcast status fields — hidden on very small screens */}
          <div className="hidden md:flex items-center gap-4 text-xs tracking-widest">
            <span className="text-[#1e1e1e]">
              PKG <span className="text-[#2e2e2e] ml-1">SPORTS CLASSICS</span>
            </span>
            <span className="text-[#111]">|</span>
            <span className="text-[#1e1e1e]">
              CH <span className="text-[#2e2e2e] ml-1">{String(channelCount).padStart(2, "0")}</span>
            </span>
            <span className="text-[#111]">|</span>
            <span className="text-[var(--phosphor-amber)] opacity-60 tracking-widest">◄ ON AIR ►</span>
          </div>

          {/* Right: signal */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-[#222] text-xs tracking-[0.3em]">SIG</span>
            <span className="text-[var(--phosphor-green)] phosphor-glow text-xs tracking-[0.3em]">
              ●&nbsp;STRONG
            </span>
          </div>
        </div>

        {/* Sub-bar: boot line */}
        <div className="border-t border-[#111] py-1">
          <p className="text-[#1c1c1c] text-xs tracking-[0.3em]">
            {channelCount} CHANNELS ON AIR
            <span className="mx-2 text-[#131313]">·</span>
            NO CABLE REQUIRED
            <span className="ml-1 text-[var(--phosphor-green)] cursor">▌</span>
          </p>
        </div>
      </div>
    </header>
  );
}
