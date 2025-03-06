const handleSendMessage = async (message) => {
  try {
    const response = await fetch('YOUR_API_BACKEND_URL_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    // Process AI response...
  } catch (error) {
    console.error('Chat error:', error);
  }
}; 