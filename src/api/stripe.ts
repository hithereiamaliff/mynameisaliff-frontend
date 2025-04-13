/**
 * Stripe API integration
 * This file contains functions to interact with the Stripe API
 */

// API endpoint for creating a payment intent
// In production, this will point to your Railway backend
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.example.com/api' // Your existing Railway backend
  : 'http://localhost:3001/api';

/**
 * Creates a payment intent on the server
 * @param amount Amount in cents
 * @param currency Currency code (default: 'myr')
 * @returns Promise with client secret
 */
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'myr'
): Promise<{ clientSecret: string }> => {
  try {
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount');
    }
    
    // Call the backend API
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount), // Ensure integer
        currency,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Test card numbers for Stripe
export const TEST_CARDS = {
  success: 'XXXX-XXXX-XXXX-XXXX', // Always succeeds
  decline: 'XXXX-XXXX-XXXX-XXXX', // Always declined
  authRequired: 'XXXX-XXXX-XXXX-XXXX', // Requires authentication
};

