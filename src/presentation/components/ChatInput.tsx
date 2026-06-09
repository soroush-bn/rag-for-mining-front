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
    <div className="bg-slate-800/95 backdrop-blur-lg border-t border-slate-700/60 p-4 sticky bottom-0 z-10 pb-6">
      <div className="max-w-4xl mx-auto flex flex-col">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full mb-3">
            {attachments.map((file, index) => (
              <div key={index} className="bg-slate-700 border border-slate-600 px-3 py-1.5 rounded-lg text-sm flex items-center shadow-sm text-slate-200">
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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-3 w-full">
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors border border-slate-600 text-sm font-medium flex-1 sm:flex-none justify-center whitespace-nowrap"
              title="Upload Image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="hidden sm:inline">Image</span>
            </button>
            
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors border border-slate-600 text-sm font-medium flex-1 sm:flex-none justify-center whitespace-nowrap"
              title="Upload PDF"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span className="hidden sm:inline">PDF</span>
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

          <div className="flex-1 w-full bg-slate-900 border border-slate-600 rounded-xl focus-within:border-amber-500 shadow-sm flex items-end px-3 py-2 transition-colors">
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
              placeholder="Ask about safety protocols, regulations..."
              className="flex-1 resize-none bg-transparent px-2 text-slate-100 placeholder-slate-400 focus:outline-none min-h-[24px] max-h-32 text-base leading-relaxed py-1"
            />
            <button
              type="submit"
              disabled={isLoading || (!content.trim() && attachments.length === 0)}
              className="ml-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg disabled:bg-slate-700 disabled:text-slate-500 transition-colors flex items-center justify-center flex-shrink-0"
            >
              Send
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
