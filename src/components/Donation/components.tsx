import React, { useState } from 'react';
import { Copy, ExternalLink, Download, LinkIcon, Plus, X } from 'lucide-react';
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
    icon: '/images/DuitNow Transfer Apps Logo/1 mae.webp' 
  },
  { 
    name: 'CIMB OCTO', 
    appUrl: 'cimbclicks://', 
    iosAppUrl: 'cimbclicks://', 
    androidAppUrl: 'cimbclicks://', 
    webUrl: 'https://www.cimbclicks.com.my/clicks/',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/cimb-octo-my/id1591184221',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.cimb.cimbocto&hl=en',
    icon: '/images/DuitNow Transfer Apps Logo/2 cimb octo.webp' 
  },
  { 
    name: 'Touch n Go eWallet', 
    appUrl: 'tngew://', 
    iosAppUrl: 'tngew://', 
    androidAppUrl: 'tngew://', 
    webUrl: 'https://www.tngdigital.com.my/touch-n-go-ewallet',
    iosAppStoreUrl: 'https://apps.apple.com/my/app/touch-n-go-ewallet/id1344696702',
    androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.tngdigital.ewallet&hl=en',
    icon: '/images/DuitNow Transfer Apps Logo/3 tng ewallet.webp' 
  }
];

// Replace with dummy bank details
const ACCOUNT_NUMBER = '1234567890';
const BANK_NAME = 'Example Bank';

export const DuitNowTransfer: React.FC = () => {
  const [showAllApps, setShowAllApps] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
    
    // Track copy event
    ReactGA.event({
      action: 'donation_copy',
      category: 'engagement',
      label: type,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">DuitNow Transfer</h2>
      <p className="text-gray-300">
        Transfer directly to my bank account using these details:
      </p>
      
      <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Account Number</p>
          <div className="flex items-center justify-between">
            <p className="text-white font-medium">{ACCOUNT_NUMBER}</p>
            <button 
              onClick={() => handleCopy(ACCOUNT_NUMBER, 'account')}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
              aria-label="Copy account number"
            >
              {copiedText === 'account' ? (
                <span className="text-green-500 text-sm">Copied!</span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm mb-1">Bank</p>
          <p className="text-white font-medium">{BANK_NAME}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-gray-300 mb-3">Open your banking app:</p>
        <div className="grid grid-cols-3 gap-3">
          {BANK_APPS.slice(0, 3).map((app, index) => (
            <a
              key={index}
              href={isIOS ? app.iosAppUrl : isAndroid ? app.androidAppUrl : app.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
              onClick={() => {
                ReactGA.event({
                  action: 'donation_app_open',
                  category: 'engagement',
                  label: app.name,
                });
              }}
            >
              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center mb-2">
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>
              <span className="text-white text-xs text-center">{app.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== DuitNow QR Component =====
// Malaysian bank and eWallet apps for initial display
const MALAYSIAN_MAIN_APPS = [
  { name: 'MAE by Maybank', appUrl: 'maybank2u://', iosAppUrl: 'maybank2u://', androidAppUrl: 'maybank2u://', icon: '/images/DuitNow QR Malaysia Apps Logo/1 mae.webp', iosAppStoreUrl: 'https://apps.apple.com/my/app/mae-by-maybank2u/id1481028763', androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.maybank2u.life', webUrl: 'https://www.maybank2u.com.my/maybank2u/malaysia/en/personal/services/digital_banking/mae_by_maybank2u.page' },
  { name: 'CIMB OCTO', appUrl: 'cimbclicks://', iosAppUrl: 'cimbclicks://', androidAppUrl: 'cimbclicks://', icon: '/images/DuitNow QR Malaysia Apps Logo/2 cimb octo.webp', iosAppStoreUrl: 'https://apps.apple.com/my/app/cimb-octo-my/id1591184221', androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.cimb.cimbocto&hl=en', webUrl: 'https://www.cimb.com.my/en/personal/day-to-day-banking/digital-banking/cimb-clicks.html' },
  { name: 'Touch n Go eWallet', appUrl: 'tngew://', iosAppUrl: 'tngew://', androidAppUrl: 'tngew://', icon: '/images/DuitNow QR Malaysia Apps Logo/3 tng ewallet.webp', iosAppStoreUrl: 'https://apps.apple.com/my/app/touch-n-go-ewallet/id1344696702', androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=my.com.tngdigital.ewallet&hl=en', webUrl: 'https://www.tngdigital.com.my/touch-n-go-ewallet' }
];

// Define app type
interface PaymentApp {
  name: string;
  appUrl: string;
  iosAppUrl?: string;
  androidAppUrl?: string;
  icon: string;
  iosAppStoreUrl: string;
  androidPlayStoreUrl: string;
  webUrl: string;
}

// Define country names as a union type for type safety
type CountryName = 'Malaysia' | 'Cambodia' | 'Indonesia' | 'Philippines' | 'Mongolia' | 'South Korea' | 'Thailand';

// Define countries type with specific keys
interface CountryApps {
  [key: string]: PaymentApp[];
}

// International Payment Apps organized by country
const INTERNATIONAL_APPS_BY_COUNTRY: CountryApps = {
  'Cambodia': [
    { name: 'ABA Mobile', appUrl: 'aba://', iosAppUrl: 'aba://', androidAppUrl: 'aba://', icon: '/images/DuitNow QR International Apps Logo/1 aba.png', iosAppStoreUrl: 'https://apps.apple.com/kh/app/aba-mobile/id878030680', androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=kh.com.abapay&hl=en', webUrl: 'https://www.ababank.com/en/services/aba-mobile/' },
    { name: 'Wing Money', appUrl: 'wing://', iosAppUrl: 'wing://', androidAppUrl: 'wing://', icon: '/images/DuitNow QR International Apps Logo/2 wing.png', iosAppStoreUrl: 'https://apps.apple.com/kh/app/wing-money/id1444129359', androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.wingmoney.wingmobile&hl=en', webUrl: 'https://www.wingmoney.com/en/personal-banking/wing-app/' }
  ]
};

// Get all countries for the dropdown
const COUNTRIES = Object.keys(INTERNATIONAL_APPS_BY_COUNTRY).sort();

export const DuitNowQR: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Malaysia');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">DuitNow QR</h2>
      <p className="text-gray-300">
        Scan this QR code with your banking app or e-wallet to make a payment:
      </p>
      
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg">
          <img 
            src="/images/duitnow-qr-example.png" 
            alt="DuitNow QR Code" 
            className="w-64 h-64 object-contain"
            loading="eager"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-300 mb-3">Open your banking app:</p>
        <div className="grid grid-cols-3 gap-3">
          {MALAYSIAN_MAIN_APPS.map((app, index) => (
            <a
              key={index}
              href={isIOS ? app.iosAppUrl : isAndroid ? app.androidAppUrl : app.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
              onClick={() => {
                ReactGA.event({
                  action: 'donation_app_open',
                  category: 'engagement',
                  label: app.name,
                });
              }}
            >
              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center mb-2">
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>
              <span className="text-white text-xs text-center">{app.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== TNG eWallet Component =====
// TnG eWallet payment link - replaced with dummy link
const TNG_PAYMENT_LINK = 'https://example.com/tng-payment';

export const TNGEWallet: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Touch 'n Go eWallet</h2>
      <p className="text-gray-300">
        Pay directly using Touch 'n Go eWallet:
      </p>
      
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg">
          <img 
            src="/images/tng-qr-example.png" 
            alt="Touch 'n Go QR Code" 
            className="w-64 h-64 object-contain"
            loading="eager"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <a
          href={TNG_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-[#D10000] transition-colors"
          onClick={() => {
            ReactGA.event({
              action: 'donation_tng_link_click',
              category: 'engagement',
            });
          }}
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Open Touch 'n Go eWallet
        </a>
      </div>
    </div>
  );
};
