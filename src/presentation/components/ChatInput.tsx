'use client';

import { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && attachments.length === 0) return;
    
    onSendMessage(content, attachments);
    setContent('');
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/80 p-4 sticky bottom-0 z-10 pb-8">
      <div className="max-w-4xl mx-auto flex flex-col">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full mb-3 px-2">
            {attachments.map((file, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-sm flex items-center shadow-md text-slate-200">
                <span className="truncate max-w-[200px] font-medium">{file.name}</span>
                <button 
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  className="ml-2 text-slate-400 hover:text-red-400 transition-colors focus:outline-none"
                  aria-label="Remove attachment"
                  type="button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative flex items-end w-full bg-slate-800 border border-slate-700 rounded-2xl shadow-lg focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/20 transition-all p-1.5">
          <div className="flex flex-row items-center h-full mb-0.5 ml-1">
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-700/50 rounded-xl transition-all focus:outline-none"
              title="Upload Image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
            
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-700/50 rounded-xl transition-all focus:outline-none"
              title="Upload PDF"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
          
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />

          <input
            type="file"
            ref={pdfInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            multiple
            className="hidden"
          />

          <div className="flex-1 w-full flex items-end ml-2 py-1 relative">
            <textarea
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask a question about mining safety..."
              className="flex-1 w-full resize-none bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none min-h-[36px] max-h-40 text-[15px] leading-relaxed py-1.5 px-2"
            />
          </div>

          <div className="mb-1 mr-1">
             <button
              type="submit"
              disabled={isLoading || (!content.trim() && attachments.length === 0)}
              className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl disabled:bg-slate-800 disabled:text-slate-600 transition-all flex items-center justify-center h-[36px] w-[36px] shadow-sm"
            >
              <svg className="w-5 h-5 translate-x-[-1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m-7 7l7-7 7 7"></path>
              </svg>
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className="text-xs text-slate-500 font-medium">Mining Safety Assistant can make mistakes. Consider verifying important information.</p>
        </div>
      </div>
    </div>
  );
}
