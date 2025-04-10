import React, { useState } from 'react';
import { Copy, ExternalLink, Download } from 'lucide-react';
import ReactGA from 'react-ga4';

// ===== DuitNow Transfer Component =====
// Bank apps commonly used in Malaysia
const BANK_APPS = [
  { name: 'Maybank', appUrl: 'maybank2u://', icon: '/images/banks/maybank.png' },
  { name: 'CIMB', appUrl: 'cimbclicks://', icon: '/images/banks/cimb.png' },
  { name: 'Public Bank', appUrl: 'pbb://', icon: '/images/banks/publicbank.png' },
  { name: 'RHB', appUrl: 'rhb://', icon: '/images/banks/rhb.png' },
  { name: 'Hong Leong Bank', appUrl: 'hlb://', icon: '/images/banks/hongleong.png' },
  { name: 'Bank Islam', appUrl: 'bankislam://', icon: '/images/banks/bankislam.png' },
  { name: 'AmBank', appUrl: 'ambank://', icon: '/images/banks/ambank.png' },
  { name: 'Bank Rakyat', appUrl: 'bankrakyat://', icon: '/images/banks/bankrakyat.png' },
  { name: 'Alliance Bank', appUrl: 'alliancebank://', icon: '/images/banks/alliance.png' },
  { name: 'Other Bank App', appUrl: '', icon: '/images/banks/other.png' },
];

// Replace with your actual bank details
const ACCOUNT_NUMBER = '1234567890';
const BANK_NAME = 'Maybank';

export const DuitNowTransfer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const copyAccountNumber = async () => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = ACCOUNT_NUMBER;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Select and copy the text
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      
      // Remove the textarea
      document.body.removeChild(textArea);
      
      // Update UI
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track event
      ReactGA.event({
        action: 'copy_account_number',
        category: 'donation',
      });
    } catch (err) {
      console.error('Failed to copy account number:', err);
    }
  };

  const openBankApp = (appUrl: string, bankName: string) => {
    // Track the event first in case the user leaves the page
    ReactGA.event({
      action: 'open_bank_app',
      category: 'donation',
      label: bankName,
    });
    
    if (appUrl) {
      // Ask for confirmation before redirecting
      const confirmed = window.confirm(`This will attempt to open the ${bankName} app. Continue?`);
      
      if (confirmed) {
        // Create an invisible iframe to try opening the app without navigating away
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Set a timeout to detect if app opening failed
        const timeoutId = setTimeout(() => {
          // If we're still here after timeout, app didn't open
          document.body.removeChild(iframe);
          
          // Offer fallback options
          const useFallback = window.confirm(
            `Could not open ${bankName} app. Would you like to:
            - Copy the account number and open your banking app manually
            - Continue with another payment method`
          );
          
          if (useFallback) {
            // Copy account number automatically as a convenience
            copyAccountNumber();
            alert(`Account number copied! Open your ${bankName} app manually and paste the account number.`);
          }
        }, 2000);
        
        // Try to open the app
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.location.href = appUrl;
          }
        } catch (e) {
          clearTimeout(timeoutId);
          document.body.removeChild(iframe);
          alert(`Could not open ${bankName} app. Please try another method.`);
        }
      }
    }
  };

  const nextStep = () => {
    setCurrentStep(2);
    ReactGA.event({
      action: 'duitnow_transfer_next_step',
      category: 'donation',
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        DuitNow Transfer
      </h2>

      {currentStep === 1 ? (
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-300 mb-2">Bank Name</p>
            <p className="text-white font-medium">{BANK_NAME}</p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-300 mb-2">Account Number</p>
            <div className="flex items-center">
              <p className="text-white font-medium flex-1">{ACCOUNT_NUMBER}</p>
              <button 
                onClick={copyAccountNumber}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                aria-label="Copy account number"
              >
                <Copy className="h-5 w-5 text-yellow-500" />
              </button>
            </div>
            {copied && (
              <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>
            )}
          </div>
          
          <button
            onClick={nextStep}
            className="w-full py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Next: Choose Your Bank App
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-300 mb-4">
            Select your bank app below to open it directly. Once opened, proceed with the transfer using the account details.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {BANK_APPS.map((bank) => (
              <button
                key={bank.name}
                onClick={() => openBankApp(bank.appUrl, bank.name)}
                className="p-3 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                  {bank.icon ? (
                    <img src={bank.icon} alt={bank.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <ExternalLink className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
                <span className="text-white text-sm">{bank.name}</span>
              </button>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm mt-4">
            If your bank app doesn't open automatically, please open it manually and use the account details to complete your transfer.
          </p>
        </div>
      )}
    </div>
  );
};

// ===== DuitNow QR Component =====
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

// DuitNow QR code image URL
const QR_CODE_URL = 'https://mynameisaliff.s3.ap-southeast-1.amazonaws.com/Maybank+QRPayBiz+(DuitNow).jpg';

export const DuitNowQR: React.FC = () => {
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

// ===== TNG eWallet Component =====
// TnG eWallet payment link
const TNG_PAYMENT_LINK = 'https://payment.tngdigital.com.my/sc/bDLnHCnYGq';

export const TNGEWallet: React.FC = () => {
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
