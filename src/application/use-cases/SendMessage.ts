import { IChatRepository } from '@/domain/repositories/IChatRepository';
import { Message } from '@/domain/entities/Chat';

export class SendMessageUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute(content: string, attachments?: File[]): Promise<Message> {
    if (!content.trim() && (!attachments || attachments.length === 0)) {
      throw new Error('Message content or attachments are required');
    }
    return this.chatRepository.sendMessage(content, attachments);
  }
}
