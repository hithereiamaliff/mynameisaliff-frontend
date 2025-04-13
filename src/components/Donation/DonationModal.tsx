import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { DuitNowTransfer, DuitNowQR, TNGEWallet } from './components';
import ReactGA from 'react-ga4';
import { hasFeatureFlag, FEATURE_FLAGS } from '../../utils/featureFlags';
import StripePayment from './StripePayment';

export type DonationMethod = 'duitnow-transfer' | 'duitnow-qr' | 'tng-ewallet' | 'stripe';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<DonationMethod | null>(null);
  const [showStripe, setShowStripe] = useState<boolean>(false);
  
  // Check if Stripe feature flag is enabled
  useEffect(() => {
    setShowStripe(hasFeatureFlag(FEATURE_FLAGS.STRIPE_PAYMENT));
  }, []);

  // Track modal open event
  React.useEffect(() => {
    if (isOpen) {
      ReactGA.event({
        action: 'donation_modal_open',
        category: 'engagement',
      });
    }
  }, [isOpen]);

  const handleMethodSelect = (method: DonationMethod) => {
    setSelectedMethod(method);
    ReactGA.event({
      action: 'donation_method_select',
      category: 'engagement',
      label: method,
    });
  };

  const handleBack = () => {
    setSelectedMethod(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Support My Work</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {selectedMethod === null ? (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">
                Thank you for considering supporting my work! Your contribution helps me to continue creating better digital experiences for people like you and me.
              </p>
              
              <button
                onClick={() => handleMethodSelect('duitnow-transfer')}
                className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors flex items-center"
              >
                <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                  <img 
                    src="/images/DuitNow Logos/DuitNow1.jpg" 
                    alt="DuitNow Transfer" 
                    className="max-w-full max-h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">DuitNow Transfer</h3>
                  <p className="text-gray-400 text-sm">Transfer directly to my bank account</p>
                </div>
                <ArrowRight className="h-5 w-5 text-yellow-500" />
              </button>
              
              <button
                onClick={() => handleMethodSelect('duitnow-qr')}
                className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors flex items-center"
              >
                <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                  <img 
                    src="/images/DuitNow%20Logos/DuitNowQR.png" 
                    alt="DuitNow QR" 
                    className="max-w-full max-h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">DuitNow QR</h3>
                  <p className="text-gray-400 text-sm">Scan QR code with your banking app</p>
                </div>
                <ArrowRight className="h-5 w-5 text-yellow-500" />
              </button>
              
              <button
                onClick={() => handleMethodSelect('tng-ewallet')}
                className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors flex items-center"
              >
                <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                  <img 
                    src="/images/Touch_'n_Go_eWallet.png" 
                    alt="Touch 'n Go eWallet" 
                    className="max-w-full max-h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">Touch 'n Go eWallet</h3>
                  <p className="text-gray-400 text-sm">Pay via Touch 'n Go eWallet</p>
                </div>
                <ArrowRight className="h-5 w-5 text-yellow-500" />
              </button>
              
              {showStripe && (
                <button
                  onClick={() => handleMethodSelect('stripe')}
                  className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors flex items-center"
                >
                  <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" fill="#1F2937"/>
                      <path d="M18 11C18.5523 11 19 10.5523 19 10C19 9.44772 18.5523 9 18 9C17.4477 9 17 9.44772 17 10C17 10.5523 17.4477 11 18 11Z" fill="#1F2937"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Credit/Debit Card</h3>
                    <p className="text-gray-400 text-sm">Pay with Visa or Mastercard</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-yellow-500" />
                </button>
              )}
            </div>
          ) : (
            <div>
              {selectedMethod === 'duitnow-transfer' && <DuitNowTransfer />}
              {selectedMethod === 'duitnow-qr' && <DuitNowQR />}
              {selectedMethod === 'tng-ewallet' && <TNGEWallet />}
              {selectedMethod === 'stripe' && showStripe && <StripePayment />}
              
              <div className="mt-6">
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to payment methods
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonationModal;
