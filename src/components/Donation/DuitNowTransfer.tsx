import React, { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import ReactGA from 'react-ga4';

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
const ACCOUNT_NUMBER = 'XXXXXXXXXXXX';
const BANK_NAME = 'Maybank';

const DuitNowTransfer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    ReactGA.event({
      action: 'copy_account_number',
      category: 'donation',
    });
  };

  const openBankApp = (appUrl: string, bankName: string) => {
    if (appUrl) {
      window.location.href = appUrl;
    }
    
    ReactGA.event({
      action: 'open_bank_app',
      category: 'donation',
      label: bankName,
    });
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
          
          <div className="mt-4 space-y-2">
            <p className="text-gray-400 text-sm">
              <span className="font-medium text-yellow-500">On Mobile:</span> If your bank app doesn't open automatically, please open it manually and use the account details to complete your transfer.
            </p>
            <p className="text-gray-400 text-sm">
              <span className="font-medium text-yellow-500">On Desktop:</span> These buttons are optimized for mobile devices. If you're on a desktop computer, please log in to your online banking portal and use the account details above to make your transfer.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuitNowTransfer;
