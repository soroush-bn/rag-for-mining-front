import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white">
      <div className="max-w-3xl mx-auto space-y-4 flex flex-col">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-10 h-10 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-black font-semibold text-2xl tracking-tight">iMessage</h3>
              <p className="text-gray-500 max-w-sm mt-1 text-[15px] leading-relaxed">
                Start a conversation with the Mining Safety RAG System.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed relative ${
                  isUser
                    ? 'bg-[#007AFF] text-white rounded-[20px] rounded-br-[4px]'
                    : 'bg-[#E9E9EB] text-black rounded-[20px] rounded-bl-[4px]'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className={`text-[10px] mt-1 font-medium ${
                  isUser ? 'text-blue-200 text-right' : 'text-gray-500 text-left'
                }`}>
                  {msg.createdAt.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        
        {isLoading && (
          <div className="flex w-full justify-start animate-in fade-in zoom-in duration-300">
            <div className="bg-[#E9E9EB] rounded-[20px] rounded-bl-[4px] px-4 py-3.5">
              <div className="flex space-x-1.5 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
