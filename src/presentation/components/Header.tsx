import Image from 'next/image';

export function Header() {
  return (
    <header className="relative w-full h-56 md:h-72 overflow-hidden shadow-2xl border-b-4 border-amber-500">
      <Image
        src="/assets/header.webp"
        alt="Mining Safety Header"
        fill
        className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8">
        <div className="bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2 tracking-widest shadow-sm">
          Safety First
        </div>
        <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter drop-shadow-lg text-center px-4">
          MINING SAFETY <span className="text-amber-400">ASSISTANT</span>
        </h1>
        <p className="text-gray-300 text-xs md:text-sm font-medium mt-1 tracking-wide uppercase opacity-90">
          Intelligent RAG-powered Safety Documentation
        </p>
      </div>
    </header>
  );
}
