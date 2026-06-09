import type { ChatMessageData } from '../types/chat';

// Simulated latency for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const dummyResponses = [
  "According to Newfoundland mining safety regulations, workers must wear appropriate high-visibility clothing and hard hats at all times.",
  "When operating heavy machinery near the pit edge, ensure a spotter is present and the safety berm is intact as per section 4.2.",
  "If you suspect a gas leak in an underground shaft, evacuate immediately and trigger the emergency alarm. Do not attempt to investigate.",
  "The provided document outlines the mandatory quarterly safety training schedule for all site personnel.",
  "For handling explosives, refer to the provincial guidelines. Only certified blasters are authorized to connect and detonate charges."
];

export const sendMessageToMockAPI = async (
  _message: string,
  attachments?: File[]
): Promise<ChatMessageData> => {
  // Simulate network delay
  await delay(1500 + Math.random() * 1000);

  // Pick a random response
  const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];

  // Formulate response
  let responseContent = randomResponse;
  
  if (attachments && attachments.length > 0) {
    const fileNames = attachments.map(f => f.name).join(', ');
    responseContent = `I have received your files: ${fileNames}. ` + responseContent;
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: responseContent,
    timestamp: new Date()
  };
};
