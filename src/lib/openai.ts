export async function getChatResponse(messages: { text: string; isUser: boolean; timestamp: Date }[]): Promise<string> {
  try {
    // Use current window location for development, fallback to production URL
    const apiUrl = import.meta.env.MODE === 'development' 
      ? `${window.location.protocol}//${window.location.hostname}:3001/api/chat`
      : 'https://your-backend-url.example.com/api/chat';

    console.log('Using API URL:', apiUrl);
    console.log('Environment variables:', {
      MODE: import.meta.env.MODE
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
