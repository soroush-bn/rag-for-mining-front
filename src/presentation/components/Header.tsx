'use client';

export function Header() {
  return (
    <header className="relative w-full h-44 md:h-64 overflow-hidden border-b-4 border-amber-500 shadow-2xl z-30 flex-shrink-0 bg-slate-900">
      {/* Background Image with Fallback Color */}
      <img
        src="/assets/header.jpg"
        alt="Mining Safety Operations"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.7] contrast-[1.1]"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      
      {/* Overlay Gradients for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3 bg-amber-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/20">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-amber-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            Safety Core Online
          </span>
        </div>
        
        <h1 className="text-white text-4xl md:text-6xl font-black tracking-tighter drop-shadow-2xl leading-none">
          MINING <span className="text-amber-500">SAFETY</span>
          <br />
          <span className="text-slate-300 text-3xl md:text-5xl">RAG ASSISTANT</span>
        </h1>
        
        <p className="text-slate-300 text-sm md:text-base font-bold mt-4 tracking-wide uppercase opacity-80 border-l-2 border-amber-500 pl-4 max-w-lg">
          Intelligent Real-time Protocol Retrieval & Document Analysis System
        </p>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 p-8 hidden lg:block">
        <div className="text-right border-r-2 border-amber-500/30 pr-4">
          <p className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest">Sector-7 Compliance</p>
          <p className="text-white/20 text-xs font-mono">v1.0.42-STABLE</p>
        </div>
      </div>
    </header>
  );
}
