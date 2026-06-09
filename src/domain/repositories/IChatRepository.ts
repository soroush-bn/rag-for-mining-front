import { Message } from '../entities/Chat';

export interface IChatRepository {
  sendMessage(message: string, attachments?: File[]): Promise<Message>;
  getChatHistory(): Promise<Message[]>;
}
