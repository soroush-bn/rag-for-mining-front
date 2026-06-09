import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#f1f5f9]">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in duration-700">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
            👷
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-xl">Operational Safety Intelligence</h3>
            <p className="text-slate-500 max-w-xs mt-1 text-sm">
              Ask about protocols, hazard identification, or upload inspection documents for analysis.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full max-w-sm mt-4">
            {['"What are the ventilation requirements for Zone 4?"', '"Analyze this site image for PPE compliance"', '"Summary of latest safety regulations"'].map((q) => (
              <button key={q} className="text-left p-3 text-xs bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all text-slate-600 shadow-sm">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-start gap-3 ${
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm shadow-sm ${
            msg.role === 'user' ? 'bg-blue-600' : 'bg-amber-500'
          }`}>
            {msg.role === 'user' ? '👤' : '🤖'}
          </div>
          
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md border ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none border-blue-500'
                : 'bg-white text-slate-800 rounded-tl-none border-slate-100'
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{msg.content}</p>
            <div className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${
              msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
            }`}>
              {msg.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm animate-pulse shadow-sm">
            🤖
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-md">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
