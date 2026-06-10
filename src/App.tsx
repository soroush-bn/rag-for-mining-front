import { useState } from 'react';
import { Header } from './components/Header/Header';
import { ChatWindow } from './components/Chat/ChatWindow';
import { ChatInput } from './components/Chat/ChatInput';
import { AboutModal } from './components/About/AboutModal';
import type { ChatMessageData, Attachment } from './types/chat';
import { sendMessageToAPI } from './services/api';
import './App.css';

function App() {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string, files: File[]) => {
    // Convert files to attachment previews
    const attachments: Attachment[] = files.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      type: f.type.startsWith('image/') ? 'image' : 'pdf',
      url: URL.createObjectURL(f)
    }));

    // Create user message
    const userMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      attachments: attachments.length > 0 ? attachments : undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Send to backend and get response
      const responseMsg = await sendMessageToAPI(text, files);
      setMessages(prev => [...prev, responseMsg]);
    } catch (error) {
      console.error("Error communicating with API:", error);
      // Fallback message so the user sees something went wrong
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error communicating with the server.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <div className="input-area">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>
      <AboutModal />
    </div>
  );
}

export default App;
