export async function getChatResponse(messages: { text: string; isUser: boolean; timestamp: Date }[]): Promise<string> {
  try {
    // Use environment variable with fallback to production URL
    const apiUrl = import.meta.env.VITE_API_URL || 'https://mynameisaliff-backend-production.up.railway.app/api/chat';

    console.log('Using API URL:', apiUrl);
    console.log('Environment variables:', {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      NODE_ENV: import.meta.env.NODE_ENV
    });
    
    // Convert messages to OpenAI format
    const formattedMessages = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));

    console.log('Messages:', formattedMessages);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ messages: formattedMessages })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API request failed:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        errorData
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response:', data);
    return data.content || "I apologize, but I'm having trouble generating a response. Could you please try again?";
  } catch (error) {
    console.error('Error from API:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        url: import.meta.env.VITE_API_URL
      });
    }
    return 'I apologize, but I am currently experiencing technical difficulties. Please try again in a few moments.';
  }
}