import React, { useEffect, useRef } from 'react';
import type { ChatMessageData } from '../../types/chat';
import { ChatMessage } from './ChatMessage';

interface Props {
  messages: ChatMessageData[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<Props> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>Welcome! Ask a question or upload a document to get started.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="loading-indicator">
              <span>Assistant is typing...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
