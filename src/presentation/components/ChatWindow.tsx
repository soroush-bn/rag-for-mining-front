import { Message } from '@/domain/entities/Chat';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-2">
                 <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-slate-100 font-bold text-3xl md:text-4xl tracking-tight">Mining Safety Intelligence</h3>
              <p className="text-slate-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                Your dedicated AI assistant for safety protocols, document analysis, and emergency guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {[
                { title: 'Emergency Response', desc: 'What are the steps for a chemical spill?' },
                { title: 'Safety Equipment', desc: 'Check the maintenance schedule for SCSRs' },
                { title: 'Regulations', desc: 'Summary of MSHA Part 48 training requirements' },
                { title: 'Site Protocols', desc: 'Review the blasting safety checklist' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800 hover:border-amber-500/30 transition-all text-left group cursor-pointer shadow-sm">
                  <h4 className="font-bold text-amber-500/90 text-sm mb-1 group-hover:text-amber-500 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="w-full space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] px-5 py-4 text-[15px] md:text-base leading-relaxed relative rounded-2xl shadow-md ${
                    isUser
                      ? 'bg-amber-500 text-slate-900 rounded-tr-sm font-medium'
                      : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className={`text-[10px] md:text-xs mt-2.5 font-semibold opacity-60 tracking-wider ${
                    isUser ? 'text-slate-900 text-right' : 'text-slate-400 text-left uppercase'
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
              <div className="bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700/50 px-5 py-4 shadow-sm">
                <div className="flex space-x-2 items-center h-5">
                  <div className="w-2 h-2 bg-amber-500/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-amber-500/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-amber-500/60 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
