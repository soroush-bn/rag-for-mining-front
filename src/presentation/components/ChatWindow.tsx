import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-amber-100/50 rounded-3xl flex items-center justify-center shadow-inner border border-amber-200/50 backdrop-blur-sm">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-slate-800 font-bold text-2xl tracking-tight">Operational Safety Intelligence</h3>
              <p className="text-slate-500 max-w-sm mt-2 text-sm leading-relaxed">
                Ask about safety protocols, hazard identification, or upload inspection documents for real-time analysis.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-6">
              {[
                { title: 'Ventilation requirements', desc: 'for Zone 4 deep excavation' },
                { title: 'Analyze site image', desc: 'for PPE compliance checking' },
                { title: 'Latest safety regulations', desc: 'summary for the current quarter' },
                { title: 'Emergency procedures', desc: 'in case of structural collapse' }
              ].map((q, i) => (
                <button key={i} className="text-left p-4 bg-white border border-slate-200 rounded-2xl hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="font-semibold text-slate-700 text-sm group-hover:text-amber-600 transition-colors">{q.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{q.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${
              msg.role === 'user' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white'
            }`}>
              {msg.role === 'user' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              )}
            </div>
            
            <div
              className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-amber-100 text-slate-800 rounded-tr-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium">{msg.content}</p>
              <div className={`text-[10px] mt-2 font-bold uppercase tracking-wider flex items-center ${
                msg.role === 'user' ? 'text-amber-600/60' : 'text-slate-400'
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
          <div className="flex items-start gap-4 animate-in fade-in zoom-in duration-300">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center shadow-sm">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl rounded-tl-sm px-6 py-5 shadow-sm">
              <div className="flex space-x-2.5">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
