import Image from 'next/image';

export function Header() {
  return (
    <header className="relative w-full h-40 md:h-56 overflow-hidden border-b-[6px] border-amber-500 shadow-xl z-20 flex-shrink-0">
      <Image
        src="/assets/header.webp"
        alt="Mining Safety Operations"
        fill
        className="object-cover object-center scale-[1.02] hover:scale-100 transition-transform duration-[2000ms] ease-out"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            System Online
          </span>
        </div>
        <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-xl text-center">
          MINING SAFETY <span className="text-amber-400 font-black">ASSISTANT</span>
        </h1>
        <p className="text-slate-300 text-[11px] md:text-sm font-medium mt-1 tracking-wider uppercase opacity-90 max-w-xl text-center">
          AI-Powered Intelligence for Operational Safety & Compliance
        </p>
      </div>
    </header>
  );
}
