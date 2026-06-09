import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>Welcome! Ask any mining safety questions here.</p>
        </div>
      )}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            <span className="text-[10px] opacity-70 mt-1 block">
              {msg.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
