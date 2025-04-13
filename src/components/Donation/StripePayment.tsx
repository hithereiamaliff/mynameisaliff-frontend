import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';

// Create a wrapper component to handle the Stripe initialization and amount selection
const StripeWrapper: React.FC = () => {
  // Donation amounts in MYR
  const DONATION_AMOUNTS: number[] = [10, 25, 50, 100];
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  
  // Amount selection states
  const [amount, setAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [amountSelected, setAmountSelected] = useState<boolean>(false);
  
  // Fetch Stripe publishable key from backend
  const fetchPublishableKey = async () => {
    setIsLoading(true);
    try {
      // Define multiple potential API endpoints in order of preference
      const apiEndpoints = [
        // Primary backend URL from environment variable
        `${import.meta.env.VITE_BACKEND_URL || ''}/api/stripe-config`, 
        // Netlify Functions direct path
        '/.netlify/functions/stripe-config',
        // Netlify redirected path
        '/api/stripe-config',
        // Fallback to Railway direct URL
        'https://your-backend-url.example.com/api/stripe-config',
        // Local development
        'http://localhost:3001/api/stripe-config'
      ];
      
      // Try each endpoint until one works
      let response = null;
      
      for (const endpoint of apiEndpoints) {
        try {
          console.log(`Attempting to fetch Stripe config from: ${endpoint}`);
          response = await fetch(endpoint);
          if (response.ok) {
            console.log(`Successfully connected to: ${endpoint}`);
            break; // Exit the loop if successful
          }
        } catch (err) {
          console.warn(`Failed to connect to ${endpoint}:`, err);
          // Continue to the next endpoint
        }
      }
      
      // If no endpoint worked
      if (!response || !response.ok) {
        throw new Error('Failed to fetch Stripe configuration from all available endpoints.');
      }
      
      const { publishableKey } = await response.json();
      
      if (!publishableKey) {
        throw new Error('Stripe publishable key not available');
      }
      
      console.log('Successfully retrieved Stripe publishable key');
      setStripePromise(loadStripe(publishableKey));
    } catch (err: any) {
      console.error('Error fetching Stripe config:', err);
      setError('Error connecting to payment service. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle amount selection
  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setIsCustom(false);
    setCustomAmount('');
    setAmountSelected(true);
    
    // Only fetch Stripe key after amount is selected
    fetchPublishableKey();

    ReactGA.event({
      action: 'stripe_amount_select',
      category: 'donation',
      value: selectedAmount,
    });
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(value);
    setIsCustom(true);

    ReactGA.event({
      action: 'stripe_custom_amount',
      category: 'donation',
    });
  };

  // Handle custom amount submission
  const handleCustomAmountSubmit = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      setAmountSelected(true);
      // Only fetch Stripe key after amount is selected
      fetchPublishableKey();
    }
  };

  // Reset amount selection to choose a different amount
  const handleChangeAmount = () => {
    setAmountSelected(false);
    setStripePromise(null);
    setError(null);
  };

  // If amount not selected yet, show amount selection UI
  if (!amountSelected) {
    return (
      <div className="p-6 bg-gray-900 border border-yellow-700/30 rounded-lg max-w-md mx-auto my-10">
        <h2 className="text-2xl font-bold text-white mb-4">Select Donation Amount</h2>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {DONATION_AMOUNTS.map((donationAmount: number) => (
            <button
              key={donationAmount}
              onClick={() => handleAmountSelect(donationAmount)}
              className={`py-2 px-4 rounded-md text-white font-medium
                bg-yellow-700 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            >
              RM{donationAmount}
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-3">
            Or enter Custom Amount (MYR) below
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter amount"
              className="w-full sm:flex-1 p-2 border rounded-md sm:rounded-r-none focus:ring-yellow-500 focus:border-yellow-500 bg-gray-800 text-white border-gray-700"
            />
            <button
              onClick={handleCustomAmountSubmit}
              disabled={!customAmount || parseFloat(customAmount) <= 0}
              className={`w-full sm:w-auto py-2 px-4 rounded-md sm:rounded-l-none text-white font-medium
                ${(!customAmount || parseFloat(customAmount) <= 0)
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-yellow-700 hover:bg-yellow-600'}
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 border border-yellow-700/30 rounded-lg max-w-md mx-auto my-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Donation: RM{isCustom ? customAmount : amount}
          </h2>
          <button
            onClick={handleChangeAmount}
            className="text-sm text-yellow-500 hover:text-yellow-400"
          >
            Change amount
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-4">Loading Payment System</h3>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-yellow-700 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-yellow-700 rounded-full animate-pulse delay-150"></div>
          <div className="w-4 h-4 bg-yellow-700 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    );
  }

  if (error || !stripePromise) {
    return (
      <div className="p-6 bg-gray-900 border border-red-700/30 rounded-lg max-w-md mx-auto my-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Donation: RM{isCustom ? customAmount : amount}
          </h2>
          <button
            onClick={handleChangeAmount}
            className="text-sm text-yellow-500 hover:text-yellow-400"
          >
            Change amount
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-4">Payment System Error</h3>
        <p className="text-red-400">{error || 'Stripe could not be initialized. Please try again later.'}</p>
        <p className="text-gray-400 mt-4">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 border border-yellow-700/30 rounded-lg max-w-md mx-auto my-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          Donation: RM{isCustom ? customAmount : amount}
        </h2>
        <button
          onClick={handleChangeAmount}
          className="text-sm text-yellow-500 hover:text-yellow-400"
        >
          Change amount
        </button>
      </div>
      
      <Elements stripe={stripePromise}>
        <StripePaymentForm 
          initialAmount={isCustom ? parseFloat(customAmount) : amount} 
          isCustomAmount={isCustom}
          customAmountValue={customAmount}
        />
      </Elements>
    </div>
  );
};

// The checkout form component that handles payment processing
interface StripePaymentFormProps {
  initialAmount: number;
  isCustomAmount: boolean;
  customAmountValue: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ 
  initialAmount, 
  isCustomAmount, 
  customAmountValue 
}) => {
  const [amount] = useState<number>(initialAmount);
  const [customAmount] = useState<string>(customAmountValue);
  const [isCustom] = useState<boolean>(isCustomAmount);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState<boolean>(false);


  const stripe = useStripe();
  const elements = useElements();

  // Set up Payment Request for Apple Pay / Google Pay
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'MY',
        currency: 'myr',
        total: {
          label: 'Donation to YourName',
          amount: isCustom ? parseFloat(customAmount || '0') * 100 : amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: false,
      });
      
      // Check if Payment Request is available (Apple Pay / Google Pay)
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr as any);
          setCanMakePayment(true);
          
          // Track that Apple Pay / Google Pay is available
          ReactGA.event({
            action: 'express_checkout_available',
            category: 'donation',
          });
        }
      });
      
      // Handle payment method creation
      pr.on('paymentmethod', async (e) => {
        if (!clientSecret) {
          e.complete('fail');
          setPaymentError('Payment session expired. Please try again.');
          return;
        }
        
        const { error: confirmError, paymentIntent } = 
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: e.paymentMethod.id,
          }, { handleActions: false });

        if (confirmError) {
          e.complete('fail');
          setPaymentError(confirmError.message || 'Payment failed');
        } else if (paymentIntent.status === 'requires_action') {
          e.complete('success');
          // Handle 3D Secure authentication if needed
          const { error, paymentIntent: updatedIntent } = await stripe.confirmCardPayment(clientSecret);
          
          if (error) {
            setPaymentError(error.message || 'Payment authentication failed');
          } else if (updatedIntent.status === 'succeeded') {
            setPaymentSuccess(true);
            ReactGA.event({
              action: 'express_checkout_success',
              category: 'donation',
              value: isCustom ? parseFloat(customAmount) : amount,
            });
          }
        } else if (paymentIntent.status === 'succeeded') {
          e.complete('success');
          setPaymentSuccess(true);
          ReactGA.event({
            action: 'express_checkout_success',
            category: 'donation',
            value: isCustom ? parseFloat(customAmount) : amount,
          });
        } else {
          e.complete('fail');
          setPaymentError('Payment failed. Please try again.');
        }
      });
    }
  }, [stripe, amount, customAmount, isCustom, clientSecret]);
  
  // Create PaymentIntent when amount changes
  useEffect(() => {
    // Clear previous payment intent when amount changes
    // This ensures we get a fresh payment intent with the new amount
    if (clientSecret) {
      console.log('Amount changed, clearing previous payment intent');
      setClientSecret('');
      
      // Force a slight delay before creating a new payment intent
      // This helps ensure Link properly refreshes with the new amount
      setTimeout(() => {
        createPaymentIntent();
      }, 100);
      
      return; // Exit early to avoid creating payment intent twice
    }
    
    const createPaymentIntent = async () => {
      try {
        // Get the actual amount to charge
        const chargeAmount = isCustom ? parseFloat(customAmount) : amount;

        // Skip if amount is invalid
        if (isNaN(chargeAmount) || chargeAmount <= 0) {
          return;
        }

        // Define multiple potential API endpoints in order of preference
        const apiEndpoints = [
          // Primary backend URL from environment
          `${import.meta.env.VITE_BACKEND_URL || ''}/api/create-payment-intent`,
          // Netlify Functions direct path
          '/.netlify/functions/create-payment-intent',
          // Netlify redirected path
          '/api/create-payment-intent',
          // Fallback to Railway direct URL
          'https://your-backend-url.example.com/api/create-payment-intent',
          // Local development
          'http://localhost:3001/api/create-payment-intent'
        ];
        
        console.log('Creating payment intent for amount:', chargeAmount, 'MYR', 'with timestamp:', Date.now());
        
        // Create the request payload
        const payload = {
          amount: Math.round(chargeAmount * 100), // Convert to cents
          currency: 'myr',
          // Include all supported payment methods
          payment_method_types: ['card', 'link'],
          // Add metadata for better tracking
          metadata: {
            source: 'website_donation',
            amount_original: chargeAmount.toString(),
            timestamp: Date.now().toString() // Add timestamp to ensure uniqueness
          },
          // Force Link to clear its cache
          payment_method_options: {
            link: {
              persistent_token: null // This forces Link to clear its cache
            }
          }
        };
        
        console.log('Payment intent payload:', payload);
        
        // Try each endpoint until one works
        let response = null;
        let responseText = '';
        let lastError = null;
        
        for (const apiUrl of apiEndpoints) {
          try {
            console.log(`Attempting to create payment intent using: ${apiUrl}`);
            response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
            
            responseText = await response.text();
            console.log(`Response from ${apiUrl}:`, responseText);
            
            if (response.ok) {
              console.log(`Successfully created payment intent using: ${apiUrl}`);
              break; // Exit the loop if successful
            }
          } catch (error) {
            lastError = error;
            console.warn(`Failed to connect to ${apiUrl}:`, error);
            // Continue to next endpoint
          }
        }
        
        // If no endpoint worked
        if (!response || !response.ok) {
          throw new Error(lastError ? (lastError as Error).message : 'Failed to create payment intent with all available endpoints.');
        }
        
        // Parse the successful response
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Payment intent created successfully:', data);
          console.log('New client secret (first 10 chars):', data.clientSecret.substring(0, 10));
          
          // Set the client secret which will trigger the Elements to refresh
          setClientSecret(data.clientSecret);
          
          // Log that Link should refresh with the new amount
          console.log('Link should now refresh with new amount:', chargeAmount, 'MYR');
        } catch (e) {
          console.error('Error parsing success response:', e);
          throw new Error('Invalid response from server');
        }
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        // Provide more detailed error information
        let errorMessage = 'An error occurred while setting up the payment. Please try again.';
        
        if (error.message) {
          errorMessage = error.message;
          // Log additional details for debugging
          console.error('Error details:', JSON.stringify(error, null, 2));
        }
        
        setPaymentError(errorMessage);
      }
    };

    // Only create payment intent if we have a valid amount
    if ((isCustom && customAmount && parseFloat(customAmount) > 0) || (!isCustom && amount > 0)) {
      createPaymentIntent();
    }
  }, [amount, customAmount, isCustom]);

  // Update payment request amount when it changes
  useEffect(() => {
    if (paymentRequest && stripe) {
      // Calculate the current amount in cents
      const currentAmountInCents = isCustom && customAmount
        ? Math.round(parseFloat(customAmount) * 100)
        : amount * 100;
      
      // Only update if the amount is valid
      if (!isNaN(currentAmountInCents) && currentAmountInCents > 0) {
        console.log('Updating payment request amount to:', isCustom ? customAmount : amount, 'MYR');
        
        // Update the payment request object with the new amount
        paymentRequest.update({
          total: {
            label: 'Donation to YourName',
            amount: currentAmountInCents,
          }
        });
      }
    }
  }, [amount, customAmount, isCustom, paymentRequest, stripe]);

  // No longer need amount selection handler in this component

  // No longer need custom amount handler in this component

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js hasn't loaded yet or we don't have a client secret
      return;
    }

    // Get the actual amount to charge
    const chargeAmount = isCustom ? parseFloat(customAmount) : amount;

    // Validate amount
    if (isNaN(chargeAmount) || chargeAmount <= 0) {
      setPaymentError('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      console.log('Confirming payment with client secret:', clientSecret.substring(0, 10) + '...');
      
      // Confirm card payment directly
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Donation to YourName',
          },
        },
      });
      
      console.log('Payment confirmation result:', result);
      
      const { error, paymentIntent } = result;

      if (error) {
        throw new Error(error.message || 'An error occurred while processing your payment');
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Track successful payment
        ReactGA.event({
          action: 'stripe_payment_success',
          category: 'donation',
          value: chargeAmount,
        });

        setPaymentSuccess(true);
      } else {
        throw new Error('Payment was not completed. Please try again.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'An error occurred while processing your payment. Please try again.');

      ReactGA.event({
        action: 'stripe_payment_error',
        category: 'donation',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!paymentSuccess ? (
        <>


          {/* Express Checkout - Move this BEFORE Card Details */}
          {canMakePayment && paymentRequest && (
            <div className="mt-6">
              <p className="text-white font-medium mb-2">Express Checkout</p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <PaymentRequestButtonElement
                  options={{
                    paymentRequest,
                    style: {
                      paymentRequestButton: {
                        theme: 'dark',
                        height: '48px',
                      },
                    },
                  }}
                />
              </div>
              <div className="text-center text-gray-400 text-sm mt-2">or enter your card details below</div>
            </div>
          )}

          {/* Card Element - Now comes AFTER Express Checkout */}
          <div className="mt-6">
            <p className="text-white font-medium mb-2">Card Details</p>
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#f9fafb',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                      iconColor: '#f9fafb',
                    },
                    invalid: {
                      color: '#ef4444',
                      iconColor: '#ef4444',
                    },
                  },
                  hidePostalCode: true,
                }}
                onChange={(e) => {
                  setIsCardComplete(e.complete);
                }}
              />
            </div>
          </div>
          
          {/* Display payment errors */}
          {paymentError && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {paymentError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || !elements || isProcessing || !clientSecret || !isCardComplete}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${(!stripe || !elements || isProcessing || !clientSecret || !isCardComplete) 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-yellow-700 hover:bg-yellow-600 text-white'}`}
          >
            {isProcessing ? 'Processing...' : `Donate RM${isCustom ? parseFloat(customAmount || '0').toFixed(2) : amount}`}
          </button>

          {/* Secure Payment Notice */}
          <div className="mt-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="text-yellow-500 text-xs font-medium mb-1">Secure Payment</p>
            <p className="text-gray-400 text-xs">
              All payments are processed securely through Stripe. Your card details are never stored on our servers.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: 0,
                  animation: 'checkmarkDraw 1s ease-in-out',
                }}
              />
            </svg>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes checkmarkDraw {
              0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
              100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
            }
          `}} />
          <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300">
            Your donation has been processed successfully. Your support means a lot!
          </p>
        </div>
      )}
    </form>
  );
};

// Use the existing CheckoutForm component
// Main component that wraps everything
const StripePayment: React.FC = () => {
  return <StripeWrapper />;
};

export default StripePayment;
