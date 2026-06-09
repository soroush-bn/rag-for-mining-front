import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900/50">
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-2 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-slate-100 font-bold text-3xl tracking-tight">How can I help you stay safe today?</h3>
              <p className="text-slate-400 max-w-lg mt-3 text-base leading-relaxed mx-auto">
                Upload images or safety manuals, and ask questions about mining safety protocols, equipment handling, or emergency procedures.
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
                className={`max-w-[85%] md:max-w-[75%] px-5 py-4 text-base leading-relaxed relative rounded-2xl shadow-sm ${
                  isUser
                    ? 'bg-amber-500 text-slate-900 rounded-tr-sm font-medium'
                    : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className={`text-xs mt-2 font-medium opacity-70 ${
                  isUser ? 'text-slate-900 text-right' : 'text-slate-400 text-left'
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
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700 px-5 py-4 shadow-sm">
              <div className="flex space-x-2 items-center h-6">
                <div className="w-2.5 h-2.5 bg-amber-500/70 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2.5 h-2.5 bg-amber-500/70 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2.5 h-2.5 bg-amber-500/70 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
