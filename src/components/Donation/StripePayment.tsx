import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
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
        // Fallback to direct URL (dummy URL for public repo)
        'https://example-backend.com/api/stripe-config',
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
            break;
          }
        } catch (err) {
          console.log(`Failed to fetch from ${endpoint}:`, err);
        }
      }
      
      if (!response || !response.ok) {
        throw new Error('Could not fetch Stripe configuration');
      }
      
      const { publishableKey } = await response.json();
      
      // For public repository, use a dummy key
      const safePublishableKey = 'pk_test_dummy_key_for_public_repo';
      
      // Initialize Stripe
      const stripePromise = loadStripe(safePublishableKey);
      setStripePromise(stripePromise);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Stripe configuration:', error);
      setError('Could not load payment processor. Please try again later.');
      setIsLoading(false);
    }
  };
  
  // Fetch Stripe key on component mount
  useEffect(() => {
    fetchPublishableKey();
  }, []);
  
  // Handle amount selection
  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setIsCustom(false);
    
    // Track amount selection
    ReactGA.event({
      action: 'donation_amount_select',
      category: 'engagement',
      label: selectedAmount.toString(),
    });
  };
  
  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      
      // Track custom amount entry
      if (value.length > 0) {
        ReactGA.event({
          action: 'donation_custom_amount',
          category: 'engagement',
        });
      }
    }
  };
  
  // Toggle custom amount input
  const toggleCustomAmount = () => {
    setIsCustom(!isCustom);
    if (!isCustom) {
      setCustomAmount('');
    }
  };
  
  // Proceed to payment after selecting amount
  const handleProceedToPayment = () => {
    if (isCustom && (!customAmount || parseFloat(customAmount) <= 0)) {
      setError('Please enter a valid amount');
      return;
    }
    
    setAmountSelected(true);
    
    // Track proceed to payment
    ReactGA.event({
      action: 'donation_proceed_to_payment',
      category: 'engagement',
      label: isCustom ? customAmount : amount.toString(),
    });
  };
  
  // Go back to amount selection
  const handleBackToAmountSelection = () => {
    setAmountSelected(false);
    setError(null);
  };
  
  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchPublishableKey}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  if (!amountSelected) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Credit/Debit Card</h2>
        <p className="text-gray-300">
          Select an amount to donate:
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {DONATION_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountSelect(amt)}
              className={`p-3 rounded-lg transition-colors ${
                !isCustom && amount === amt
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-800/50 text-white hover:bg-gray-800/70'
              }`}
            >
              RM {amt}
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <button
            onClick={toggleCustomAmount}
            className={`w-full p-3 rounded-lg transition-colors ${
              isCustom
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-800/50 text-white hover:bg-gray-800/70'
            }`}
          >
            Custom Amount
          </button>
          
          {isCustom && (
            <div className="mt-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  RM
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className="w-full p-3 pl-10 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleProceedToPayment}
            className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Payment Details</h2>
        <div className="text-yellow-500 font-medium">
          RM {isCustom ? customAmount : amount}
        </div>
      </div>
      
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm 
            initialAmount={isCustom ? parseFloat(customAmount) : amount}
            isCustomAmount={isCustom}
            customAmountValue={customAmount}
          />
        </Elements>
      )}
      
      <button
        onClick={handleBackToAmountSelection}
        className="text-gray-400 hover:text-white transition-colors"
      >
        Change amount
      </button>
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
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  // Card element styling
  const cardElementOptions = {
    style: {
      base: {
        color: '#fff',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  
  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        // Define multiple potential API endpoints in order of preference
        const apiEndpoints = [
          // Primary backend URL from environment variable
          `${import.meta.env.VITE_BACKEND_URL || ''}/api/create-payment-intent`,
          // Netlify Functions direct path
          '/.netlify/functions/create-payment-intent',
          // Netlify redirected path
          '/api/create-payment-intent',
          // Fallback to direct URL (dummy URL for public repo)
          'https://example-backend.com/api/create-payment-intent',
          // Local development
          'http://localhost:3001/api/create-payment-intent'
        ];
        
        // Try each endpoint until one works
        let response = null;
        
        for (const endpoint of apiEndpoints) {
          try {
            console.log(`Attempting to create payment intent from: ${endpoint}`);
            response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                amount: isCustomAmount ? parseFloat(customAmountValue) : initialAmount,
                currency: 'myr'
              }),
            });
            
            if (response.ok) {
              break;
            }
          } catch (err) {
            console.log(`Failed to create payment intent from ${endpoint}:`, err);
          }
        }
        
        if (!response || !response.ok) {
          throw new Error('Could not create payment intent');
        }
        
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setPaymentError('Could not initialize payment. Please try again later.');
      }
    };
    
    createPaymentIntent();
  }, [initialAmount, isCustomAmount, customAmountValue]);
  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      // Confirm card payment directly
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Donation to Example',
          },
        },
      });
      
      if (result.error) {
        console.error('Payment error:', result.error);
        setPaymentError(result.error.message || 'An error occurred during payment processing');
        
        // Track payment error
        ReactGA.event({
          action: 'donation_payment_error',
          category: 'engagement',
          label: result.error.message || 'Unknown error',
        });
      } else if (result.paymentIntent?.status === 'succeeded') {
        setPaymentSuccess(true);
        
        // Track successful payment
        ReactGA.event({
          action: 'donation_payment_success',
          category: 'engagement',
          label: isCustomAmount ? customAmountValue : initialAmount.toString(),
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
      
      // Track payment error
      ReactGA.event({
        action: 'donation_payment_error',
        category: 'engagement',
        label: 'Unexpected error',
      });
    }
    
    setIsProcessing(false);
  };
  
  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 mb-4">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          <style jsx>{`
            .checkmark {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: block;
              stroke-width: 2;
              stroke: #4BB543;
              stroke-miterlimit: 10;
              box-shadow: inset 0px 0px 0px #4BB543;
              animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
              stroke-dasharray: 166;
              stroke-dashoffset: 166;
              stroke-width: 2;
              stroke-miterlimit: 10;
              stroke: #4BB543;
              fill: none;
              animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
              transform-origin: 50% 50%;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
            }
            @keyframes stroke {
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes scale {
              0%, 100% {
                transform: none;
              }
              50% {
                transform: scale3d(1.1, 1.1, 1);
              }
            }
            @keyframes fill {
              100% {
                box-shadow: inset 0px 0px 0px 30px #4BB54300;
              }
            }
          `}</style>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">
          Your donation has been processed successfully.
        </p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">
          Card Details
        </label>
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      
      {paymentError && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
          {paymentError}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className={`w-full p-3 rounded-lg transition-colors ${
          !stripe || isProcessing || !clientSecret
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
        }`}
      >
        {isProcessing ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay RM ${isCustomAmount ? customAmountValue : initialAmount}`
        )}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Secure payment powered by Stripe
        </p>
      </div>
    </form>
  );
};

// Use the existing CheckoutForm component
// Main component that wraps everything
const StripePayment: React.FC = () => {
  return <StripeWrapper />;
};

export default StripePayment;
