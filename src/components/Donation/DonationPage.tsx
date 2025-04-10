import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DuitNowTransfer, DuitNowQR, TNGEWallet } from './components';
import { DonationMethod } from './DonationModal';
import ReactGA from 'react-ga4';

interface DonationPageProps {
  defaultMethod?: DonationMethod;
}

const DonationPage: React.FC<DonationPageProps> = ({ defaultMethod }) => {
  const [selectedMethod, setSelectedMethod] = React.useState<DonationMethod | null>(
    defaultMethod || null
  );

  React.useEffect(() => {
    // Track page view
    ReactGA.event({
      action: 'donation_page_view',
      category: 'page_view',
    });
  }, []);

  const handleMethodSelect = (method: DonationMethod) => {
    setSelectedMethod(method);
    ReactGA.event({
      action: 'donation_method_select',
      category: 'engagement',
      label: method,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Support My Work</h1>
        <p className="text-gray-300 mb-8">
          Thank you for considering supporting my work! Your contribution helps me continue creating content and improving this website.
        </p>

        {selectedMethod === null ? (
          <div className="space-y-4">
            <button
              onClick={() => handleMethodSelect('duitnow-transfer')}
              className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors"
            >
              <h3 className="text-white font-medium mb-1">DuitNow Transfer</h3>
              <p className="text-gray-400 text-sm">Transfer directly to my bank account</p>
            </button>
            
            <button
              onClick={() => handleMethodSelect('duitnow-qr')}
              className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors"
            >
              <h3 className="text-white font-medium mb-1">DuitNow QR</h3>
              <p className="text-gray-400 text-sm">Scan QR code with your banking app</p>
            </button>
            
            <button
              onClick={() => handleMethodSelect('tng-ewallet')}
              className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-left transition-colors"
            >
              <h3 className="text-white font-medium mb-1">Touch 'n Go eWallet</h3>
              <p className="text-gray-400 text-sm">Pay via Touch 'n Go eWallet</p>
            </button>
          </div>
        ) : (
          <div>
            {selectedMethod === 'duitnow-transfer' && <DuitNowTransfer />}
            {selectedMethod === 'duitnow-qr' && <DuitNowQR />}
            {selectedMethod === 'tng-ewallet' && <TNGEWallet />}
            
            <div className="mt-8">
              <button
                onClick={() => setSelectedMethod(null)}
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
  );
};

export default DonationPage;
