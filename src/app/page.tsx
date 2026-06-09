'use client';

import { Header } from '@/presentation/components/Header';
import { ChatWindow } from '@/presentation/components/ChatWindow';
import { ChatInput } from '@/presentation/components/ChatInput';
import { useChat } from '@/presentation/hooks/useChat';

export default function Home() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <main className="flex flex-col h-screen bg-slate-950 font-sans selection:bg-amber-500/30 overflow-hidden">
      <Header />
      <section className="flex-1 flex flex-col min-h-0 relative">
        {/* Subtle Background Texture/Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-0" />
        
        {/* Main Chat Interface */}
        <div className="relative z-10 flex flex-col h-full">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
}
