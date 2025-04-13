import React from 'react';
import { ExternalLink } from 'lucide-react';
import ReactGA from 'react-ga4';

// Replace with your actual TnG eWallet payment link
const TNG_PAYMENT_LINK = 'https://payment.tngdigital.com.my/sc/YOUR_PAYMENT_CODE';

const TNGEWallet: React.FC = () => {
  const openTNGLink = () => {
    window.open(TNG_PAYMENT_LINK, '_blank');
    
    ReactGA.event({
      action: 'open_tng_payment',
      category: 'donation',
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        Touch 'n Go eWallet
      </h2>
      
      <div className="space-y-6">
        <p className="text-gray-300">
          Click the button below to open the Touch 'n Go eWallet payment page. You'll be redirected to complete your payment.
        </p>
        
        <button
          onClick={openTNGLink}
          className="w-full py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Open TnG eWallet Payment
        </button>
        
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-white font-medium mb-2">Payment Link:</p>
          <p className="text-gray-300 break-all text-sm">{TNG_PAYMENT_LINK}</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg border border-yellow-700/30">
          <p className="text-yellow-500 text-sm">
            Important: Please verify that the payment link matches exactly what's shown above. For security, only proceed if the URL is correct.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TNGEWallet;

