'use client';

import { Header } from '@/presentation/components/Header';
import { ChatWindow } from '@/presentation/components/ChatWindow';
import { ChatInput } from '@/presentation/components/ChatInput';
import { useChat } from '@/presentation/hooks/useChat';

export default function Home() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <main className="flex flex-col h-screen bg-slate-50 font-sans">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden relative z-0 shadow-inner">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <div className="bg-gradient-to-t from-slate-50 to-transparent h-6 absolute bottom-[88px] w-full pointer-events-none z-10" />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
