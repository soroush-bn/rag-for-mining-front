import type { ChatMessageData } from '../types/chat';

const API_BASE_URL =
  'https://dbizguwv3aulyq7kudjjpvla6y0syaxc.lambda-url.ca-central-1.on.aws/api/v1/rag';

// Helper function to guess the modality based on the file extension/type
const guessModality = (file: File): string => {
  const type = file.type.toLowerCase();

  if (type.includes('pdf')) return 'pdf';
  if (type.includes('image')) return 'image';

  return 'text';
};

export const sendMessageToAPI = async (
  message: string,
  attachments?: File[]
): Promise<ChatMessageData> => {
  let responseContent = '';

  // Handle File Ingestion
  if (attachments && attachments.length > 0) {
    let successCount = 0;

    // The backend expects one file per request with a "modality" field.
    // We loop through and upload them individually.
    for (const file of attachments) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('modality', guessModality(file));

      try {
        const ingestRes = await fetch(`${API_BASE_URL}/ingest`, {
          method: 'POST',
          body: formData,
        });

        if (!ingestRes.ok) {
          throw new Error(`Ingest API error: ${ingestRes.status}`);
        }

        successCount++;
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
      }
    }

    if (successCount > 0) {
      responseContent += `Successfully uploaded ${successCount} file(s).\n\n`;
    } else {
      responseContent += `Failed to upload files.\n\n`;
    }
  }

  // Handle Text Query
  if (message.trim()) {
    try {
      const askRes = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query_text: message,
          image_url: null, // Optional in your backend, keeping it null if not provided
          top_k: 5,
        }),
      });

      if (!askRes.ok) {
        throw new Error(
          `Ask API error: ${askRes.status} ${askRes.statusText}`
        );
      }

      const data = await askRes.json();

      // Using the QueryResponse model: { answer: str, sources: List[Document] }
      responseContent += data.answer || 'No answer returned.';

      // Optional: If you want to show the sources used to answer the question
      // if (data.sources && data.sources.length > 0) {
      //   responseContent += `\n\n(Sources: ${data.sources.length} documents retrieved)`;
      // }
    } catch (err) {
      console.error('Ask query error:', err);
      responseContent += 'Failed to get an answer from the server.';
    }
  }

  // Fallback if neither condition really produced output
  if (!responseContent.trim()) {
    responseContent = 'Request completed.';
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: responseContent.trim(),
    timestamp: new Date(),
  };
};