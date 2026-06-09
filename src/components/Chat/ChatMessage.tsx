import React from 'react';
import type { ChatMessageData } from '../../types/chat';

interface Props {
  message: ChatMessageData;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`chat-message-container ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="chat-bubble">
        {message.content && <p className="message-content">{message.content}</p>}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="message-attachments">
            {message.attachments.map((att) => (
              <div key={att.id} className="attachment-preview">
                {att.type === 'image' ? (
                  <img src={att.url} alt={att.name} className="attachment-image" />
                ) : (
                  <div className="attachment-pdf">📄 {att.name}</div>
                )}
              </div>
            ))}
          </div>
        )}
        <span className="message-timestamp">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
