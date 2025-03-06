export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Use Railway backend URL in production, local URL in development
    const apiUrl = 'YOUR_API_BACKEND_URL_HERE';

    console.log('Sending request to:', apiUrl);
    console.log('Message:', userMessage);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API request failed:', {
        status: response.status,
        statusText: response.statusText,
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
        stack: error.stack
      });
    }
    return 'I apologize, but I am currently experiencing technical difficulties. Please try again in a few moments.';
  }
}