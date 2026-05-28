export default function HomeHero({ channelCount }: { channelCount: number }) {
  return (
    <header className="w-full max-w-4xl mb-10">
      {/* System status bar */}
      <div className="flex justify-between items-center px-4 py-2 mb-8
                      border border-[#1c1c1c] bg-[#0d0d0d] text-lg tracking-widest">
        <span className="text-[#333]">RETROSPORTTV.GE v1.0</span>
        <span className="text-[#333]">
          SIG:<span className="text-[var(--phosphor-green)] phosphor-glow ml-1">STRONG</span>
        </span>
      </div>

      {/* Main wordmark */}
      <div className="text-center">
        <p className="text-[var(--phosphor-amber)] amber-glow text-xl tracking-[0.5em] mb-3">
          ◄ ON AIR ►
        </p>
        <h1 className="text-[var(--phosphor-green)] phosphor-glow
                       text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none power-on">
          RETRO<wbr />SPORT
          <span className="text-[var(--phosphor-amber)] amber-glow">TV</span>
        </h1>
        <p className="text-[var(--phosphor-amber)] amber-glow text-4xl tracking-[0.6em] mt-1">
          .GE
        </p>
      </div>

      {/* Boot status line */}
      <p className="text-center text-[#3a3a3a] text-xl tracking-[0.25em] mt-7">
        {channelCount} CHANNELS ON AIR
        <span className="mx-4 text-[#222]">·</span>
        NO CABLE REQUIRED
        <span className="ml-1 text-[var(--phosphor-green)] cursor">▌</span>
      </p>
    </header>
  );
}
