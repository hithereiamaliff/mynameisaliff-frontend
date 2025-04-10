import React, { useState } from 'react';
import { Copy, ExternalLink, Download, LinkIcon, Plus, X } from 'lucide-react';
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
  // First 6 apps (will be shown initially)
  { 
    name: 'MAE by Maybank', 
    appUrl: 'maeapp://', 
    iosAppUrl: 'maeapp://', 
    iosAppStoreUrl: 'https://apps.apple.com/my/app/mae-by-maybank2u/id1481028763',
    androidAppUrl: 'maeapp://',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.maybank2u.life',
    webUrl: 'https://www.maybank2u.com.my/home/m2u/common/login.do',
    icon: '/images/banks/mae.png' 
  },
  { 
    name: 'CIMB OCTO', 
    appUrl: 'cimbclicks://', 
    webUrl: 'https://www.cimbclicks.com.my/clicks/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/cimb-clicks-malaysia/id328803038',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.cimbmalaysia',
    icon: '/images/banks/cimb.png' 
  },
  { 
    name: 'Touch n Go eWallet', 
    appUrl: 'tngew://', 
    webUrl: 'https://www.tngdigital.com.my/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/touch-n-go-ewallet/id1344696702',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.tngdigital.ewallet',
    icon: '/images/wallets/tng.png' 
  },
  { 
    name: 'RHB Bank', 
    appUrl: 'rhb://', 
    webUrl: 'https://logon.rhb.com.my/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/rhb-mobile-banking/id1405829991',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.rhbgroup.rhbmobileapp',
    icon: '/images/banks/rhb.png' 
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
    name: 'HSBC', 
    appUrl: 'hsbc://', 
    webUrl: 'https://www.hsbc.com.my/ways-to-bank/online-banking/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/hsbc-malaysia/id1472163288',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.hsbc.hsbcmalaysia',
    icon: '/images/banks/hsbc.png' 
  },

  // Additional banks (shown after clicking "View More Apps")
  { 
    name: 'AEON Bank', 
    appUrl: 'aeon://', 
    webUrl: 'https://www.aeoncredit.com.my/aeon-internet-banking',
    icon: '/images/banks/aeon.png' 
  },
  { 
    name: 'Affin Bank', 
    appUrl: 'affin://', 
    webUrl: 'https://rib.affinbank.com.my/affinribweb/html/index.html',
    icon: '/images/banks/affin.png' 
  },
  { 
    name: 'Agro Bank', 
    appUrl: 'agrobank://', 
    webUrl: 'https://www.agrobank.com.my/home/personal-banking/online-banking/',
    icon: '/images/banks/agrobank.png' 
  },
  { 
    name: 'Alliance Bank', 
    appUrl: 'alliancebank://', 
    webUrl: 'https://www.allianceonline.com.my/personal/common/login.do',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/alliance-bank-mobile/id1457918406',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.alliancebank.mobile',
    icon: '/images/banks/alliance.png' 
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
    name: 'AmBank Islamic', 
    appUrl: 'ambankislamic://', 
    webUrl: 'https://amaccess.ambankgroup.com/AmAccessWeb/AmAccess/login.jsp',
    icon: '/images/banks/ambank.png' 
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
    name: 'Bank Muamalat', 
    appUrl: 'muamalat://', 
    webUrl: 'https://www.muamalat.com.my/consumer-banking/online-banking/',
    icon: '/images/banks/muamalat.png' 
  },
  { 
    name: 'Boost', 
    appUrl: 'boost://', 
    webUrl: 'https://www.myboost.com.my/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/boost-online-payment-wallet/id1272178489',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.myboost.www',
    icon: '/images/wallets/boost.png' 
  },
  { 
    name: 'Boost Bank', 
    appUrl: 'boostbank://', 
    webUrl: 'https://www.boostbank.com.my/',
    icon: '/images/wallets/boost.png' 
  },
  { 
    name: 'BSN', 
    appUrl: 'bsn://', 
    webUrl: 'https://www.mybsn.com.my/mybsn/',
    icon: '/images/banks/bsn.png' 
  },
  { 
    name: 'Citibank', 
    appUrl: 'citibank://', 
    webUrl: 'https://www.citibank.com.my/MYGCB/JSO/username/signon/flow.action',
    icon: '/images/banks/citibank.png' 
  },
  { 
    name: 'Kayaaku', 
    appUrl: 'kayaaku://', 
    webUrl: 'https://www.kayaaku.my/',
    icon: '/images/banks/kayaaku.png' 
  },
  { 
    name: 'GXBank', 
    appUrl: 'gxbank://', 
    webUrl: 'https://www.gxbank.com.my/',
    icon: '/images/banks/gxbank.png' 
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
    name: 'Merchantrade Money', 
    appUrl: 'merchantrade://', 
    webUrl: 'https://www.merchantrademoney.com/',
    icon: '/images/wallets/merchantrade.png' 
  },
  { 
    name: 'OCBC', 
    appUrl: 'ocbc://', 
    webUrl: 'https://internet.ocbc.com.my/internet-banking/',
    icon: '/images/banks/ocbc.png' 
  },
  { 
    name: 'ShopeePay', 
    appUrl: 'shopeepay://', 
    webUrl: 'https://shopee.com.my/shopeepay-my',
    icon: '/images/wallets/shopeepay.png' 
  },
  { 
    name: 'Standard Chartered', 
    appUrl: 'sc://', 
    webUrl: 'https://retail.sc.com/my/nfs/login.htm',
    icon: '/images/banks/standardchartered.png' 
  },
  { 
    name: 'UOB', 
    appUrl: 'uob://', 
    webUrl: 'https://pib.uob.com.my/PIBLogin/Public/processPreCapture.do?keyId=lpc',
    icon: '/images/banks/uob.png' 
  },
];

// Replace with your actual bank details
const ACCOUNT_NUMBER = '557054644003';
const BANK_NAME = 'Maybank';

export const DuitNowTransfer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllApps, setShowAllApps] = useState(false);

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
            {(showAllApps ? BANK_APPS : BANK_APPS.slice(0, 6)).map((bank) => (
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
            
            {!showAllApps && BANK_APPS.length > 6 && (
              <button
                onClick={() => {
                  setShowAllApps(true);
                  ReactGA.event({
                    action: 'view_more_bank_apps',
                    category: 'donation',
                  });
                }}
                className="col-span-2 mt-2 p-3 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors flex items-center justify-center"
              >
                <span className="text-yellow-500 font-medium">View More Apps</span>
              </button>
            )}
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
// Malaysian bank and eWallet apps for initial display
const MALAYSIAN_MAIN_APPS = [
  { name: 'MAE by Maybank', appUrl: 'maybank2u://', icon: '/images/banks/mae.png' },
  { name: 'CIMB OCTO', appUrl: 'cimbclicks://', icon: '/images/banks/cimb.png' },
  { name: 'Touch n Go eWallet', appUrl: 'tngew://', icon: '/images/wallets/tng.png' },
  { name: 'Public Bank', appUrl: 'pbb://', icon: '/images/banks/publicbank.png' },
  { name: 'GrabPay', appUrl: 'grab://', icon: '/images/wallets/grabpay.png' },
];

// Additional Malaysian bank and eWallet apps for the modal
const MALAYSIAN_ADDITIONAL_APPS = [
  { name: 'AEON Bank', appUrl: 'aeon://', icon: '/images/banks/aeon.png' },
  { name: 'Affin Bank', appUrl: 'affin://', icon: '/images/banks/affin.png' },
  { name: 'Agro Bank', appUrl: 'agrobank://', icon: '/images/banks/agrobank.png' },
  { name: 'Alliance Bank', appUrl: 'alliancebank://', icon: '/images/banks/alliance.png' },
  { name: 'AmBank', appUrl: 'ambank://', icon: '/images/banks/ambank.png' },
  { name: 'Bank Islam', appUrl: 'bankislam://', icon: '/images/banks/bankislam.png' },
  { name: 'Bank Muamalat', appUrl: 'muamalat://', icon: '/images/banks/muamalat.png' },
  { name: 'Bank Rakyat', appUrl: 'bankrakyat://', icon: '/images/banks/bankrakyat.png' },
  { name: 'RHB Bank', appUrl: 'rhb://', icon: '/images/banks/rhb.png' },
  { name: 'BigPay', appUrl: 'bigpay://', icon: '/images/wallets/bigpay.png' },
  { name: 'Boost', appUrl: 'boost://', icon: '/images/wallets/boost.png' },
  { name: 'GXBank', appUrl: 'gxbank://', icon: '/images/banks/gxbank.png' },
  { name: 'Hong Leong Bank', appUrl: 'hlb://', icon: '/images/banks/hongleong.png' },
  { name: 'HSBC', appUrl: 'hsbc://', icon: '/images/banks/hsbc.png' },
  { name: 'Merchantrade Money', appUrl: 'merchantrade://', icon: '/images/wallets/merchantrade.png' },
  { name: 'OCBC', appUrl: 'ocbc://', icon: '/images/banks/ocbc.png' },
  { name: 'Setel', appUrl: 'setel://', icon: '/images/wallets/setel.png' },
  { name: 'S Pay Global', appUrl: 'spay://', icon: '/images/wallets/spay.png' },
  { name: 'ShopeePay', appUrl: 'shopeepay://', icon: '/images/wallets/shopeepay.png' },
  { name: 'Standard Chartered', appUrl: 'sc://', icon: '/images/banks/standardchartered.png' },
  { name: 'UOB', appUrl: 'uob://', icon: '/images/banks/uob.png' },
];

// Define app type
type PaymentApp = {
  name: string;
  appUrl: string;
  icon: string;
};

// Define country names as a union type for type safety
type CountryName = 'China' | 'Hong Kong' | 'Indonesia' | 'Philippines' | 'Mongolia' | 'Macau' | 'Singapore' | 'South Korea' | 'Thailand';

// Define countries type with specific keys
type CountryApps = {
  [country in CountryName]: PaymentApp[];
};

// International Payment Apps organized by country
const INTERNATIONAL_APPS_BY_COUNTRY: CountryApps = {
  'China': [
    { name: 'Alipay', appUrl: 'alipay://', icon: '/images/wallets/alipay.png' },
  ],
  'Hong Kong': [
    { name: 'AlipayHK', appUrl: 'alipayhk://', icon: '/images/wallets/alipayhk.png' },
  ],
  'Indonesia': [
    { name: 'Bank Sinarmas', appUrl: 'banksinarmas://', icon: '/images/banks/sinarmas.png' },
    { name: 'DANA', appUrl: 'dana://', icon: '/images/wallets/dana.png' },
    { name: 'Bank Permata', appUrl: 'permata://', icon: '/images/banks/permata.png' },
    { name: 'Bank CIMB Niaga', appUrl: 'cimbniaga://', icon: '/images/banks/cimbniaga.png' },
    { name: 'Bank Pembangunan Daerah (BPD) Bali', appUrl: 'bpdbali://', icon: '/images/banks/bpdbali.png' },
    { name: 'Bank Syariah Indonesia', appUrl: 'bsi://', icon: '/images/banks/bsi.png' },
    { name: 'LinkAja', appUrl: 'linkaja://', icon: '/images/wallets/linkaja.png' },
    { name: 'Bank Central Asia', appUrl: 'bca://', icon: '/images/banks/bca.png' },
    { name: 'Ottocash', appUrl: 'ottocash://', icon: '/images/wallets/ottocash.png' },
    { name: 'Bank Mega', appUrl: 'bankmega://', icon: '/images/banks/mega.png' },
  ],
  'Philippines': [
    { name: 'HelloMoney by AUB', appUrl: 'hellomoney://', icon: '/images/wallets/hellomoney.png' },
    { name: 'Gcash', appUrl: 'gcash://', icon: '/images/wallets/gcash.png' },
  ],
  'Mongolia': [
    { name: 'Hipay', appUrl: 'hipay://', icon: '/images/wallets/hipay.png' },
  ],
  'Macau': [
    { name: 'MPay', appUrl: 'mpay://', icon: '/images/wallets/mpay.png' },
  ],
  'Singapore': [
    { name: 'DBS PayLah!', appUrl: 'paylah://', icon: '/images/wallets/paylah.png' },
    { name: 'OCBC Digital', appUrl: 'ocbcdigital://', icon: '/images/banks/ocbcsg.png' },
    { name: 'UOB TMRW', appUrl: 'uobtmrw://', icon: '/images/banks/uobsg.png' },
    { name: 'Standard Chartered', appUrl: 'scsg://', icon: '/images/banks/scsg.png' },
  ],
  'South Korea': [
    { name: 'Naver Pay', appUrl: 'naverpay://', icon: '/images/wallets/naverpay.png' },
    { name: 'Toss Pay', appUrl: 'tosspay://', icon: '/images/wallets/tosspay.png' },
  ],
  'Thailand': [
    { name: 'TrueMoney', appUrl: 'truemoney://', icon: '/images/wallets/truemoney.png' },
    { name: 'Bangkok Bank', appUrl: 'bangkokbank://', icon: '/images/banks/bangkokbank.png' },
    { name: 'Krungthai Bank', appUrl: 'krungthai://', icon: '/images/banks/krungthai.png' },
    { name: 'Krungsri', appUrl: 'krungsri://', icon: '/images/banks/krungsri.png' },
    { name: 'CIMB Thai', appUrl: 'cimbthai://', icon: '/images/banks/cimbthai.png' },
  ],
};

// Get all countries for the dropdown
const COUNTRIES = Object.keys(INTERNATIONAL_APPS_BY_COUNTRY).sort();

// DuitNow QR code image URL - using local file from public directory
const QR_CODE_URL = '/images/Maybank QRPayBiz (DuitNow).jpg';

export const DuitNowQR: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryName | ''>('');

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

  const openMoreAppsModal = () => {
    setShowModal(true);
    ReactGA.event({
      action: 'view_more_malaysian_apps',
      category: 'donation',
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
          
          {/* Malaysian Apps Section */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Malaysian Bank/eWallet Apps</h3>
            <div className="grid grid-cols-3 gap-3">
              {MALAYSIAN_MAIN_APPS.map((app) => (
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
              
              {/* View More Apps Button */}
              <button
                onClick={openMoreAppsModal}
                className="p-3 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors flex flex-col items-center"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-yellow-500" />
                </div>
                <span className="text-white text-xs text-center">View More Apps</span>
              </button>
            </div>
          </div>
          
          {/* International Apps Section */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">International Payment Apps</h3>
            
            {/* Country Dropdown */}
            <div className="mb-4">
              <label htmlFor="country-select" className="block text-sm font-medium text-gray-300 mb-2">
                Select your country:
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCountry(value === '' ? '' : value as CountryName);
                  if (value) {
                    ReactGA.event({
                      action: 'select_international_country',
                      category: 'donation',
                      label: e.target.value,
                    });
                  }
                }}
                className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-700"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Apps for Selected Country */}
            <div className="grid grid-cols-3 gap-3">
              {selectedCountry && INTERNATIONAL_APPS_BY_COUNTRY[selectedCountry]?.map((app: PaymentApp) => (
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
          
          <p className="text-gray-400 text-sm mt-4">
            If your app doesn't open automatically, please open it manually and use the QR scanner to scan the saved QR code.
          </p>
          
          {/* Modal for Additional Malaysian Apps */}
          {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">More Malaysian Apps</h3>
                  <button 
                    onClick={closeModal}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors flex items-center justify-center"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {MALAYSIAN_ADDITIONAL_APPS.map((app) => (
                    <button
                      key={app.name}
                      onClick={() => {
                        openPaymentApp(app.appUrl, app.name);
                        closeModal();
                      }}
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
            </div>
          )}
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
