import { IChatRepository } from '@/domain/repositories/IChatRepository';
import { Message } from '@/domain/entities/Chat';

export class ChatRepositoryImpl implements IChatRepository {
  // In a real scenario, we would inject an API client (e.g., Axios or Fetch wrapper)
  // For now, we mock the AWS backend response

  async sendMessage(content: string, attachments?: File[]): Promise<Message> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log attachments for debugging (since we are mocking)
    if (attachments && attachments.length > 0) {
      console.log(`Uploading ${attachments.length} files to AWS backend...`);
    }

    const assistantResponse: Message = {
      id: Math.random().toString(36).substring(7),
      content: `This is a mock response for your question: "${content}". I am the Mining Safety Assistant.`,
      role: 'assistant',
      createdAt: new Date(),
    };

    return assistantResponse;
  }

  async getChatHistory(): Promise<Message[]> {
    return [];
  }
}
