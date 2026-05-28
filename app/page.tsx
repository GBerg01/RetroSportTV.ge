const PLACEHOLDER_CHANNELS = [
  { number: "01", name: "NBA 2000s", emoji: "🏀", description: "Best plays 2000–2009" },
  { number: "02", name: "Kobe TV", emoji: "🐍", description: "Mamba highlights" },
  { number: "03", name: "NFL Big Hits", emoji: "🏈", description: "Biggest tackles & plays" },
  { number: "04", name: "Boston Classics", emoji: "🍀", description: "Celtics, Patriots, Sox" },
  { number: "05", name: "MJ Moments", emoji: "🐐", description: "Michael Jordan greatest" },
  { number: "06", name: "Soccer Goals", emoji: "⚽", description: "Iconic international goals" },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-12 font-retro">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-[var(--phosphor-amber)] amber-glow text-2xl tracking-widest mb-1">
          ◄ ON AIR ►
        </p>
        <h1 className="text-[var(--phosphor-green)] phosphor-glow text-7xl md:text-8xl tracking-tight leading-none">
          RETROSPORT<span className="text-[var(--phosphor-amber)] amber-glow">TV</span>
        </h1>
        <p className="text-[var(--phosphor-amber)] amber-glow text-3xl tracking-widest mt-1">
          .GE
        </p>
        <p className="text-[#888] text-2xl mt-4 tracking-wide">
          Channel-surf the greatest sports moments
        </p>
      </header>

      {/* Channel grid */}
      <section className="w-full max-w-4xl">
        <p className="text-[var(--phosphor-green)] text-xl tracking-widest mb-6 text-center">
          ── SELECT A CHANNEL ──
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLACEHOLDER_CHANNELS.map((ch) => (
            <div
              key={ch.number}
              className="relative border border-[#333] bg-[#111] rounded p-5 cursor-pointer
                         hover:border-[var(--phosphor-green)] hover:bg-[#0d1a0d]
                         transition-colors duration-150 group"
            >
              <p className="text-[#555] text-lg group-hover:text-[var(--phosphor-green)] transition-colors">
                CH {ch.number}
              </p>
              <p className="text-4xl mt-1">{ch.emoji}</p>
              <p className="text-[#e8e8e8] text-2xl mt-2 tracking-wide group-hover:phosphor-glow">
                {ch.name}
              </p>
              <p className="text-[#666] text-lg mt-1">{ch.description}</p>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#333] group-hover:bg-[var(--phosphor-green)] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-[#444] text-xl tracking-widest">
        <p>▓▒░ RETROSPORTTV.GE ░▒▓</p>
        <p className="mt-1 text-lg">No cable required.</p>
      </footer>
    </main>
  );
}
