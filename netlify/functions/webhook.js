// netlify/functions/webhook.js
const dotenv = require('dotenv');
const stripe = require('stripe');
dotenv.config();

exports.handler = async function(event, context) {
  // Get the Stripe secret key and webhook secret from environment variables
  const stripeSecretKey = process.env.YOUR_KEY_HERE;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!stripeSecretKey) {
    console.error('Stripe secret key not found in environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe secret key is not configured.' }),
    };
  }
  
  // Initialize Stripe with the secret key
  const stripeClient = stripe(stripeSecretKey);
  
  try {
    // Get the signature from the headers
    const signature = event.headers['stripe-signature'];
    
    let stripeEvent;
    
    // Skip signature verification if webhook secret is not set (development mode)
    if (!webhookSecret) {
      console.log('Webhook secret not set, skipping signature verification');
      stripeEvent = JSON.parse(event.body);
    } else {
      // Verify the signature
      try {
        stripeEvent = stripeClient.webhooks.constructEvent(
          event.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
        };
      }
    }
    
    // Handle different event types
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        // Handle successful payment (e.g., update database, send confirmation email)
        break;
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = stripeEvent.data.object;
        console.log('Payment failed:', failedPaymentIntent.id);
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`);
    }
    
    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process webhook' }),
    };
  }
};
