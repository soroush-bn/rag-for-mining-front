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
    <div className="bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 p-4 md:p-6 sticky bottom-0 z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {/* Attachment Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-1">
            {attachments.map((file, index) => (
              <div key={index} className="bg-slate-800 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs flex items-center shadow-md text-slate-200 animate-in fade-in zoom-in duration-300">
                <span className="truncate max-w-[150px] font-medium">{file.name}</span>
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
        
        {/* Action Buttons Layer */}
        <div className="flex flex-wrap gap-3 px-1">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-500 rounded-full border border-slate-700 hover:border-amber-500/50 transition-all text-sm font-semibold shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Upload Image
          </button>
          
          <button
            type="button"
            onClick={() => pdfInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-500 rounded-full border border-slate-700 hover:border-amber-500/50 transition-all text-sm font-semibold shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Upload PDF
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 items-stretch sm:items-end w-full">
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

          <div className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-3xl focus-within:border-amber-500/50 transition-all px-4 py-2 shadow-inner">
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
              placeholder="Type your safety question here..."
              className="w-full resize-none bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none min-h-[44px] max-h-40 text-lg leading-relaxed py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || (!content.trim() && attachments.length === 0)}
            className="h-[60px] px-8 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-3xl disabled:bg-slate-800 disabled:text-slate-600 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95 uppercase tracking-wider"
          >
            <span>Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </form>
        
        <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-50">
          Mining Safety Compliance Assistant v1.0
        </p>
      </div>
    </div>
  );
}
