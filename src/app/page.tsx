'use client';

import { Header } from '@/presentation/components/Header';
import { ChatWindow } from '@/presentation/components/ChatWindow';
import { ChatInput } from '@/presentation/components/ChatInput';
import { useChat } from '@/presentation/hooks/useChat';

export default function Home() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <main className="flex flex-col h-screen bg-slate-950 font-sans selection:bg-amber-500/30">
      <Header />
      <section className="flex-1 flex flex-col min-h-0 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </section>
    </main>
  );
}
