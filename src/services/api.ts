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
          let errorMsg = `Ingest error ${ingestRes.status}`;
          try {
            const errData = await ingestRes.json();
            if (errData.detail) errorMsg += `: ${JSON.stringify(errData.detail)}`;
          } catch(e) {}
          throw new Error(errorMsg);
        }

        successCount++;
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        responseContent += `Failed to upload ${file.name}: ${err instanceof Error ? err.message : String(err)}\n\n`;
      }
    }

    if (successCount > 0) {
      responseContent += `Successfully uploaded ${successCount} file(s).\n\n`;
    }
  }

  // Handle Text Query
  if (message.trim()) {
    try {
      const askRes = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query_text: message,
          top_k: 5,
        }),
      });

      if (!askRes.ok) {
        let errorDetail = '';
        try {
          const errorData = await askRes.json();
          if (errorData.detail) {
             errorDetail = JSON.stringify(errorData.detail, null, 2);
          }
        } catch (e) {
          // not json
        }
        
        throw new Error(
          `Ask API error: ${askRes.status} ${askRes.statusText}${errorDetail ? `\nValidation Details: ${errorDetail}` : ''}`
        );
      }

      // Try parsing JSON safely. Sometimes servers return 200 OK but an empty body or non-JSON text
      try {
        const textData = await askRes.text();
        if (textData) {
          try {
            const data = JSON.parse(textData);
            responseContent += data.answer || JSON.stringify(data);
          } catch (jsonErr) {
             // It wasn't JSON, just use the raw text
             responseContent += textData;
          }
        } else {
           responseContent += "Server returned an empty successful response.";
        }
      } catch (readErr) {
         console.error('Error reading response body:', readErr);
         responseContent += "Request succeeded, but the browser could not read the response body.";
      }

    } catch (err) {
      console.error('Ask query error:', err);
      responseContent += `Error: ${err instanceof Error ? err.message : 'Failed to communicate with server.'}`;
    }
  }

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