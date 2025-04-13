// netlify/functions/create-payment-intent.js
const dotenv = require('dotenv');
const stripe = require('stripe');
dotenv.config();

exports.handler = async function(event, context) {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*', // Or restrict to your domains
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    // Get the Stripe secret key from environment variables
    const stripeSecretKey = process.env.YOUR_KEY_HERE;
    
    if (!stripeSecretKey) {
      console.error('Stripe secret key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Stripe secret key is not configured.' }),
      };
    }
    
    // Initialize Stripe with the secret key
    const stripeClient = stripe(stripeSecretKey);
    
    // Parse the request body
    const data = JSON.parse(event.body);
    const { amount, currency = 'myr', payment_method_types = ['card'] } = data;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }
    
    console.log(`Creating payment intent for ${amount} ${currency}`);
    
    // Extract payment method options if provided
    const { payment_method_options } = data;
    
    // Create the payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer
      currency,
      payment_method_types,
      metadata: {
        type: 'donation',
        source: 'website',
        amount_original: amount.toString(),
        date: new Date().toISOString(),
        timestamp: Date.now().toString() // Add timestamp to ensure uniqueness
      },
      payment_method_options, // Include Link options to clear cache if provided
      description: 'Donation to YourName'
    });
    
    console.log(`Created payment intent ${paymentIntent.id} for amount ${amount} with Link options:`, 
      payment_method_options ? 'provided' : 'not provided');
    
    // Return the client secret to the frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        paymentMethods: paymentIntent.payment_method_types || ['card']
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Failed to create payment intent' }),
    };
  }
};
