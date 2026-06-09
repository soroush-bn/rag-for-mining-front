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
    <div className="border-t border-gray-200 bg-white p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((file, index) => (
            <div key={index} className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center">
              <span className="truncate max-w-[100px]">{file.name}</span>
              <button 
                onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                className="ml-1 text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex space-x-1 mb-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center border border-gray-200"
            title="Upload Image"
          >
            <span className="text-xl">🖼️</span>
          </button>
          <button
            type="button"
            onClick={() => pdfInputRef.current?.click()}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center border border-gray-200"
            title="Upload PDF"
          >
            <span className="text-xl">📄</span>
          </button>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
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
          placeholder="Ask a safety question..."
          className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] max-h-32"
        />

        <button
          type="submit"
          disabled={isLoading || (!content.trim() && attachments.length === 0)}
          className="mb-1 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-10 h-10 flex items-center justify-center shadow-md"
        >
          <span className="text-xl">✈️</span>
        </button>
      </form>
    </div>
  );
}
