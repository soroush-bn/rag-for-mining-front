'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/domain/entities/Chat';
import { SendMessageUseCase } from '@/application/use-cases/SendMessage';
import { ChatRepositoryImpl } from '@/infrastructure/repositories/ChatRepositoryImpl';

// Dependency Injection (simplified for this example)
const chatRepo = new ChatRepositoryImpl();
const sendMessageUseCase = new SendMessageUseCase(chatRepo);

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string, attachments?: File[]) => {
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content,
      role: 'user',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageUseCase.execute(content, attachments);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error in UI (e.g., show a toast)
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
