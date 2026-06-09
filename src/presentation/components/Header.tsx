import Image from 'next/image';

export function Header() {
  return (
    <header className="relative w-full h-48 md:h-64 overflow-hidden shadow-lg">
      <Image
        src="/assets/header.webp"
        alt="Mining Safety Header"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
          Mining Safety Assistant
        </h1>
      </div>
    </header>
  );
}
