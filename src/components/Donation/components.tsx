import React, { useState } from 'react';
import { Copy, ExternalLink, Download, LinkIcon } from 'lucide-react';
import { ImageDownloader } from '../ImageDownloader';
import ReactGA from 'react-ga4';

// Device detection utilities
const detectUserAgent = (userAgent: string) => {
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(typeof window !== 'undefined' && (window as any).MSStream);
  const isAndroid = /Android/i.test(userAgent);
  return { isMobile, isIOS, isAndroid };
};

// Safe browser detection that works with SSR
const getDeviceInfo = () => {
  if (typeof navigator === 'undefined') {
    return { isMobile: false, isIOS: false, isAndroid: false };
  }
  return detectUserAgent(navigator.userAgent);
};

const { isMobile, isIOS, isAndroid } = getDeviceInfo();

// ===== DuitNow Transfer Component =====
// Bank apps commonly used in Malaysia
// Enhanced bank apps data with device-specific URLs
const BANK_APPS = [
  { 
    name: 'MAE', 
    appUrl: 'maeapp://', 
    iosAppUrl: 'maeapp://', 
    iosAppStoreUrl: 'https://apps.apple.com/my/app/mae-by-maybank2u/id1481028763',
    androidAppUrl: 'maeapp://',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.maybank2u.life',
    webUrl: 'https://www.maybank2u.com.my/home/m2u/common/login.do',
    icon: '/images/banks/mae.png' 
  },
  { 
    name: 'CIMB', 
    appUrl: 'cimbclicks://', 
    webUrl: 'https://www.cimbclicks.com.my/clicks/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/cimb-clicks-malaysia/id328803038',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.cimbmalaysia',
    icon: '/images/banks/cimb.png' 
  },
  { 
    name: 'Public Bank', 
    appUrl: 'pbb://', 
    webUrl: 'https://www2.pbebank.com/myIBK/apppbb/servlet/BxxxServlet',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/pb-engage-my/id1477321804',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.pbebank.engage.android',
    icon: '/images/banks/publicbank.png' 
  },
  { 
    name: 'RHB', 
    appUrl: 'rhb://', 
    webUrl: 'https://logon.rhb.com.my/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/rhb-mobile-banking/id1405829991',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.rhbgroup.rhbmobileapp',
    icon: '/images/banks/rhb.png' 
  },
  { 
    name: 'Hong Leong Bank', 
    appUrl: 'hlb://', 
    webUrl: 'https://s.hongleongconnect.my/rib/app/fo/login',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/hlb-connect/id1457489341',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.hongleongconnect.rib',
    icon: '/images/banks/hongleong.png' 
  },
  { 
    name: 'Bank Islam', 
    appUrl: 'bankislam://', 
    webUrl: 'https://www.bankislam.biz/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/go-by-bank-islam/id1276775911',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.bankislam.gobi',
    icon: '/images/banks/bankislam.png' 
  },
  { 
    name: 'AmBank', 
    appUrl: 'ambank://', 
    webUrl: 'https://amaccess.ambankgroup.com/AmAccessWeb/AmAccess/login.jsp',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/ambank-malaysia/id1459130651',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.ambank.ambankonline',
    icon: '/images/banks/ambank.png' 
  },
  { 
    name: 'Bank Rakyat', 
    appUrl: 'bankrakyat://', 
    webUrl: 'https://www2.irakyat.com.my/personal/common/login.do',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/irakyat/id1119723840',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.bankrakyat.irakyat',
    icon: '/images/banks/bankrakyat.png' 
  },
  { 
    name: 'Alliance Bank', 
    appUrl: 'alliancebank://', 
    webUrl: 'https://www.allianceonline.com.my/personal/common/login.do',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/alliance-bank-mobile/id1457918406',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.alliancebank.mobile',
    icon: '/images/banks/alliance.png' 
  },
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

  // Device detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isAndroid = /android/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid || /Mobi|Android/i.test(navigator.userAgent);
  
  const openBankApp = (appUrl: string, bankName: string) => {
    // Track the event first in case the user leaves the page
    ReactGA.event({
      action: 'open_bank_app',
      category: 'donation',
      label: bankName,
    });
    
    // Find the bank app details
    const bankApp = BANK_APPS.find(app => app.name === bankName);
    if (!bankApp) {
      // If bank not found in our list, just copy the account number
      copyAccountNumber();
      alert(`Account number copied! Open your ${bankName} app manually and paste the account number.`);
      return;
    }
    
    // Different behavior based on device type
    if (isMobile) {
      // For mobile devices, try to open the app or direct to app store
      const confirmed = window.confirm(`Would you like to open the ${bankName} app or download it if not installed?`);
      
      if (confirmed) {
        let appUrlToUse = appUrl;
        let appStoreUrl = '';
        
        // Set appropriate URLs based on device type
        if (isIOS && bankApp.iosAppUrl) {
          appUrlToUse = bankApp.iosAppUrl;
          appStoreUrl = bankApp.iosAppStoreUrl || '';
        } else if (isAndroid && bankApp.androidAppUrl) {
          appUrlToUse = bankApp.androidAppUrl;
          appStoreUrl = bankApp.androidPlayStoreUrl || '';
        }
        
        // If we have an app store URL, go directly there
        if (appStoreUrl) {
          window.location.href = appStoreUrl;
          return;
        }
        
        // If no app store URL but we have an app URL, try to open it
        if (appUrlToUse) {
          try {
            window.location.href = appUrlToUse;
          } catch (e) {
            // If that fails, copy the account number
            copyAccountNumber();
            alert(`Could not open ${bankName} app. Account number copied to clipboard.`);
          }
        } else {
          // No URLs available, just copy the account number
          copyAccountNumber();
          alert(`Account number copied! Open your ${bankName} app manually and paste the account number.`);
        }
      }
    } else {
      // For desktop devices, direct to the online banking website
      if (bankApp.webUrl) {
        const confirmed = window.confirm(`Would you like to open the ${bankName} online banking website?`);
        
        if (confirmed) {
          // Open in a new tab
          window.open(bankApp.webUrl, '_blank');
          
          // Also copy the account number for convenience
          copyAccountNumber();
          alert(`Account number copied! You can now paste it in the ${bankName} online banking website.`);
        }
      } else {
        // No web URL available, just copy the account number
        copyAccountNumber();
        alert(`Account number copied! Please open your online banking website manually and paste the account number.`);
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
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center mb-3">
          <img 
            src="/images/DuitNow Logos/DuitNow1.jpg" 
            alt="DuitNow Transfer" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-white">
          DuitNow Transfer
        </h2>
      </div>

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
  { name: 'MAE', appUrl: 'maeapp://', icon: '/images/wallets/mae.png', category: 'Malaysian eWallet' },
  
  // International Payment Apps
  { name: 'PayPal', appUrl: 'paypal://', icon: '/images/wallets/paypal.png', category: 'International' },
  { name: 'Wise', appUrl: 'wise://', icon: '/images/wallets/wise.png', category: 'International' },
  { name: 'Revolut', appUrl: 'revolut://', icon: '/images/wallets/revolut.png', category: 'International' },
  
  // Other
  { name: 'Other App', appUrl: '', icon: '/images/wallets/other.png', category: 'Other' },
];

// DuitNow QR code image URL - using local file from public directory
const QR_CODE_URL = '/images/Maybank QRPayBiz (DuitNow).jpg';

export const DuitNowQR: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);



  const openPaymentApp = (appUrl: string, appName: string) => {
    // Track the event
    ReactGA.event({
      action: 'open_payment_app',
      category: 'donation',
      label: appName,
    });
    
    // Find the app details if it's in our bank apps list
    const appDetails = BANK_APPS.find(app => app.name === appName);
    
    // For mobile devices
    if (isMobile) {
      if (appDetails) {
        // If we have app store links, use those instead of trying to open the app
        if (isIOS && appDetails.iosAppStoreUrl) {
          window.location.href = appDetails.iosAppStoreUrl;
          return;
        } else if (isAndroid && appDetails.androidPlayStoreUrl) {
          window.location.href = appDetails.androidPlayStoreUrl;
          return;
        }
      }
      
      // If no app store links or not in our list, try the direct app URL
      if (appUrl) {
        window.location.href = appUrl;
      }
    } else {
      // For desktop, open web URL if available
      if (appDetails && appDetails.webUrl) {
        window.open(appDetails.webUrl, '_blank');
      } else {
        // No web URL, show instructions
        alert(`Please use your mobile device to scan the QR code with the ${appName} app.`);
      }
    }
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
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center mb-3">
          <img 
            src="/images/DuitNow Logos/DuitNow-QR-Logo_FA2.png" 
            alt="DuitNow QR" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-white">
          DuitNow QR
        </h2>
      </div>

      {currentStep === 1 ? (
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
            <div className="mb-4">
              <ImageDownloader 
                imageUrl={QR_CODE_URL} 
                className="w-48 h-48 object-contain"
                alt="DuitNow QR Code"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  // Track the event with Google Analytics
                  ReactGA.event({
                    action: 'download_duitnow_qr',
                    category: 'donation',
                  });
                  
                  // Create a download link
                  const downloadLink = document.createElement('a');
                  downloadLink.href = QR_CODE_URL;
                  downloadLink.download = 'DuitNow-QR-Code.jpg';
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                }}
                className="py-2 px-4 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Save QR Code
              </button>
              <button
                onClick={() => window.open(QR_CODE_URL, '_blank')}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View QR Code
              </button>
            </div>
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
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center mb-3">
          <img 
            src="/images/Touch_'n_Go_eWallet.png" 
            alt="Touch 'n Go eWallet" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Touch 'n Go eWallet
        </h2>
      </div>
      
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
        
        <div className="bg-gray-800/50 p-3 rounded-lg flex items-center space-x-2">
          <LinkIcon className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          <p className="text-gray-300 break-all text-xs">{TNG_PAYMENT_LINK}</p>
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
