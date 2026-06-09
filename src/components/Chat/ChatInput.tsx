import React, { useState, useRef } from 'react';

interface Props {
  onSendMessage: (text: string, files: File[]) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((text.trim() || files.length > 0) && !disabled) {
      onSendMessage(text, files);
      setText('');
      setFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
    // Reset input to allow selecting same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      {files.length > 0 && (
        <div className="selected-files">
          {files.map((file, idx) => (
            <div key={idx} className="selected-file-badge">
              <span className="file-name" title={file.name}>
                {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
              </span>
              <button type="button" className="remove-file-btn" onClick={() => removeFile(idx)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="input-row">
        <button
          type="button"
          className="attach-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          title="Attach Image or PDF"
        >
          📎
        </button>
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <input
          type="text"
          className="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask about mining safety..."
          disabled={disabled}
        />
        <button 
          type="submit" 
          className="send-btn" 
          disabled={disabled || (!text.trim() && files.length === 0)}
        >
          Send
        </button>
      </div>
    </form>
  );
};
