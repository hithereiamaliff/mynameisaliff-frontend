import React, { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import ReactGA from 'react-ga4';

// Bank and eWallet apps for QR scanning (including non-Malaysian ones)
const PAYMENT_APPS = [
  // Malaysian Banks
  { name: 'Maybank', appUrl: 'maybank2u://', icon: '/images/banks/maybank.png', category: 'Malaysian Bank' },
  { name: 'CIMB', appUrl: 'cimbclicks://', icon: '/images/banks/cimb.png', category: 'Malaysian Bank' },
  { name: 'Public Bank', appUrl: 'pbb://', icon: '/images/banks/publicbank.png', category: 'Malaysian Bank' },
  { name: 'RHB', appUrl: 'rhb://', icon: '/images/banks/rhb.png', category: 'Malaysian Bank' },
  { name: 'Hong Leong Bank', appUrl: 'hlb://', icon: '/images/banks/hongleong.png', category: 'Malaysian Bank' },
  
  // Malaysian eWallets
  { name: 'Touch n Go', appUrl: 'tngew://', icon: '/images/wallets/tng.png', category: 'Malaysian eWallet' },
  { name: 'Boost', appUrl: 'boost://', icon: '/images/wallets/boost.png', category: 'Malaysian eWallet' },
  { name: 'GrabPay', appUrl: 'grab://', icon: '/images/wallets/grabpay.png', category: 'Malaysian eWallet' },
  { name: 'MAE', appUrl: 'mae://', icon: '/images/wallets/mae.png', category: 'Malaysian eWallet' },
  
  // International Payment Apps
  { name: 'PayPal', appUrl: 'paypal://', icon: '/images/wallets/paypal.png', category: 'International' },
  { name: 'Wise', appUrl: 'wise://', icon: '/images/wallets/wise.png', category: 'International' },
  { name: 'Revolut', appUrl: 'revolut://', icon: '/images/wallets/revolut.png', category: 'International' },
  
  // Other
  { name: 'Other App', appUrl: '', icon: '/images/wallets/other.png', category: 'Other' },
];

// Replace with your actual QR code image URL
const QR_CODE_URL = 'https://example.com/duitnow-qr.png';

const DuitNowQR: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const downloadQR = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = QR_CODE_URL;
    link.download = 'duitnow-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    ReactGA.event({
      action: 'download_duitnow_qr',
      category: 'donation',
    });
  };

  const openPaymentApp = (appUrl: string, appName: string) => {
    if (appUrl) {
      window.location.href = appUrl;
    }
    
    ReactGA.event({
      action: 'open_payment_app',
      category: 'donation',
      label: appName,
    });
  };

  const nextStep = () => {
    setCurrentStep(2);
    ReactGA.event({
      action: 'duitnow_qr_next_step',
      category: 'donation',
    });
  };

  // Group apps by category
  const groupedApps = PAYMENT_APPS.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof PAYMENT_APPS>);

  // Order of categories
  const categoryOrder = ['Malaysian Bank', 'Malaysian eWallet', 'International', 'Other'];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        DuitNow QR
      </h2>

      {currentStep === 1 ? (
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
            <img 
              src={QR_CODE_URL} 
              alt="DuitNow QR Code" 
              className="w-48 h-48 object-contain mb-4"
            />
            <button
              onClick={downloadQR}
              className="py-2 px-4 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Save QR Code
            </button>
          </div>
          
          <p className="text-gray-300 text-sm">
            Save this QR code to your device, then use your banking or e-wallet app to scan it.
          </p>
          
          <button
            onClick={nextStep}
            className="w-full py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Next: Open Payment App
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-300 mb-4">
            Select your payment app below to open it directly. Once opened, use the QR scanner feature to scan the QR code you saved.
          </p>
          
          {categoryOrder.map(category => (
            groupedApps[category] && (
              <div key={category} className="mb-6">
                <h3 className="text-white font-medium mb-3">{category}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {groupedApps[category].map((app) => (
                    <button
                      key={app.name}
                      onClick={() => openPaymentApp(app.appUrl, app.name)}
                      className="p-3 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors flex flex-col items-center"
                    >
                      <div className="w-10 h-10 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                        {app.icon ? (
                          <img src={app.icon} alt={app.name} className="w-6 h-6 object-contain" />
                        ) : (
                          <ExternalLink className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <span className="text-white text-xs text-center">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
          
          <p className="text-gray-400 text-sm mt-4">
            If your app doesn't open automatically, please open it manually and use the QR scanner to scan the saved QR code.
          </p>
        </div>
      )}
    </div>
  );
};

export default DuitNowQR;
