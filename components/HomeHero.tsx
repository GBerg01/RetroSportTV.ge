export default function HomeHero({ channelCount }: { channelCount: number }) {
  return (
    <header className="w-full max-w-4xl mb-8">
      {/* Broadcast control-room status bar */}
      <div
        className="flex flex-wrap justify-between items-center gap-x-6 gap-y-1
                   px-4 py-2 mb-8 border border-[#181818] bg-[#080808]
                   text-sm tracking-widest"
      >
        <span className="text-[#2a2a2a]">
          RETROSPORTTV.GE
          <span className="text-[#1e1e1e] mx-2">·</span>
          v1.0
        </span>
        <span className="text-[#222]">
          PKG:<span className="text-[#3a3a3a] ml-1">SPORTS CLASSICS</span>
        </span>
        <span className="text-[#222]">
          CH:<span className="text-[#3a3a3a] ml-1">{String(channelCount).padStart(2, "0")}</span>
        </span>
        <span className="text-[#222]">
          SIG:<span className="text-[var(--phosphor-green)] phosphor-glow ml-1">STRONG</span>
        </span>
      </div>

      {/* Wordmark */}
      <div className="text-center">
        <p className="text-[var(--phosphor-amber)] amber-glow text-xl tracking-[0.5em] mb-3">
          ◄ ON AIR ►
        </p>
        <h1
          className="text-[var(--phosphor-green)] phosphor-glow
                     text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none power-on"
        >
          RETRO<wbr />SPORT
          <span className="text-[var(--phosphor-amber)] amber-glow">TV</span>
        </h1>
        <p className="text-[var(--phosphor-amber)] amber-glow text-4xl tracking-[0.6em] mt-1">
          .GE
        </p>
      </div>

      {/* Boot line */}
      <p className="text-center text-[#2e2e2e] text-xl tracking-[0.25em] mt-7">
        {channelCount} CHANNELS ON AIR
        <span className="mx-3 text-[#1c1c1c]">·</span>
        NO CABLE REQUIRED
        <span className="ml-1 text-[var(--phosphor-green)] cursor">▌</span>
      </p>
    </header>
  );
}
