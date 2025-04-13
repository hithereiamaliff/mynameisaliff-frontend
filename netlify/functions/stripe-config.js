// netlify/functions/stripe-config.js
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async function(event, context) {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*', // Or restrict to your domains
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' }),
    };
  }

  try {
    // Get the publishable key from environment variables
    // Netlify environment variables are set in the Netlify UI
    const publishableKey = process.env.YOUR_KEY_HERE || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Stripe publishable key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Stripe publishable key is not configured.' }),
      };
    }
    
    // Return the publishable key
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ publishableKey }),
    };
  } catch (error) {
    console.error('Error in stripe-config function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve Stripe configuration' }),
    };
  }
};
