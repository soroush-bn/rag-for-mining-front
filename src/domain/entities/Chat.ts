export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  role: Role;
  createdAt: Date;
  attachments?: string[]; // URLs or identifiers for images/PDFs
}

export interface ChatSession {
  id: string;
  messages: Message[];
}
