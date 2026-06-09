'use client';

import { Header } from '@/presentation/components/Header';
import { ChatWindow } from '@/presentation/components/ChatWindow';
import { ChatInput } from '@/presentation/components/ChatInput';
import { useChat } from '@/presentation/hooks/useChat';

export default function Home() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <main className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-xl">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
