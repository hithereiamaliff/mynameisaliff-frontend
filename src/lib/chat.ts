// Function to send chat messages to the backend
export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Use Railway backend URL since we want to test the Railway configuration
    const apiUrl = 'https://your-backend-url.example.com/api/chat';

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
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content || "I apologize, but I'm having trouble generating a response. Could you please try again?";
  } catch (error) {
    console.error('Error in chat:', error);
    return 'I apologize, but I am currently experiencing technical difficulties. Please try again in a few moments.';
  }
}
