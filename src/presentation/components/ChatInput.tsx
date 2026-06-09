'use client';

import { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/60 p-3 sticky bottom-0 z-10 pb-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full pl-12 mb-2">
            {attachments.map((file, index) => (
              <div key={index} className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm text-gray-700">
                <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                <button 
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                  aria-label="Remove attachment"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-end w-full space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mb-1 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors flex-shrink-0"
            title="Add Media or Document"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
            multiple
            className="hidden"
          />

          <div className="flex-1 bg-white border border-gray-300 rounded-[24px] focus-within:border-[#007AFF] shadow-sm flex items-end px-3 py-1.5 transition-colors">
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
              placeholder="iMessage"
              className="flex-1 resize-none bg-transparent px-2 py-1 text-black placeholder-gray-400 focus:outline-none min-h-[32px] max-h-32 text-[15px] leading-tight"
            />
            <button
              type="submit"
              disabled={isLoading || (!content.trim() && attachments.length === 0)}
              className="mb-0.5 ml-2 p-1.5 bg-[#007AFF] text-white rounded-full disabled:bg-gray-200 disabled:text-white transition-colors w-8 h-8 flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-4 h-4 translate-y-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
