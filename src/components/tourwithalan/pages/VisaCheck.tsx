import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { CreditCard, Search, ChevronDown, ExternalLink, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Portal } from '../components/Portal';
import { BackButton } from '../components/BackButton';
import { RestartButton } from '../components/RestartButton';

// List of visa-free countries with their allowed stay duration (in days)
const visaFreeCountries: Record<string, number> = {
  // 90 Days Visa-Free
  "Albania": 90, "Algeria": 90, "Argentina": 90, "Australia": 90, "Austria": 90,
  "Bahrain": 90, "Belgium": 90, "Bosnia and Herzegovina": 90, "Brazil": 90,
  "Bulgaria": 90, "Canada": 90, "Croatia": 90, "Cyprus": 90, "Czech Republic": 90,
  "Denmark": 90, "Egypt": 90, "Estonia": 90, "Finland": 90, "France": 90,
  "Germany": 90, "Greece": 90, "Hong Kong SAR": 90, "Hungary": 90, "Iceland": 90,
  "Ireland": 90, "Italy": 90, "Japan": 90, "Jordan": 90, "Kuwait": 90, "Latvia": 90,
  "Lebanon": 90, "Liechtenstein": 90, "Lithuania": 90, "Luxembourg": 90,
  "Maldives": 90, "Malta": 90, "Morocco": 90, "Netherlands": 90,
  "New Zealand": 90, "Norway": 90, "Oman": 90, "Peru": 90, "Poland": 90,
  "Portugal": 90, "Qatar": 90, "Romania": 90, "San Marino": 90,
  "Saudi Arabia": 90, "Slovakia": 90, "Slovenia": 90, "South Africa": 90,
  "South Korea": 90, "Spain": 90, "Sweden": 90, "Switzerland": 90, "Syria": 90,
  "Tunisia": 90, "Turkey": 90, "Turkmenistan": 90, "United Arab Emirates": 90,
  "United Kingdom": 90, "United States": 90, "Uruguay": 90, "Yemen": 90,

  // 30 Days Visa-Free
  "Antigua and Barbuda": 30, "Armenia": 30, "Azerbaijan": 30, "Bahamas": 30,
  "Barbados": 30, "Belarus": 30, "Belize": 30, "Benin": 30, "Bolivia": 30,
  "Botswana": 30, "Brunei": 30, "Cambodia": 30, "Cape Verde": 30, "Chad": 30,
  "Chile": 30, "China": 30, "Comoros": 30, "Costa Rica": 30, "Cuba": 30,
  "Dominica": 30, "Ecuador": 30, "Fiji": 30, "Gabon": 30, "Gambia": 30,
  "Georgia": 30, "Grenada": 30, "Guatemala": 30, "Guinea": 30, "Guyana": 30,
  "Haiti": 30, "Honduras": 30, "India": 30, "Indonesia": 30, "Iraq": 30,
  "Jamaica": 30, "Kazakhstan": 30, "Kenya": 30, "Kiribati": 30, "Laos": 30,
  "Lesotho": 30, "Macau SAR": 30, "North Macedonia": 30, "Madagascar": 30, "Malawi": 30,
  "Mauritania": 30, "Mauritius": 30, "Mexico": 30, "Moldova": 30, "Monaco": 30,
  "Mongolia": 30, "Namibia": 30, "Nauru": 30, "Nicaragua": 30, "Palestine": 30,
  "Panama": 30, "Papua New Guinea": 30, "Paraguay": 30, "Philippines": 30,
  "Russia": 30, "Senegal": 30, "Seychelles": 30, "Sierra Leone": 30,
  "Singapore": 30, "Solomon Islands": 30, "Somalia": 30, "Sudan": 30,
  "Suriname": 30, "Eswatini": 30, "Taiwan": 30, "Tajikistan": 30,
  "Tanzania": 30, "Thailand": 30, "Togo": 30, "Tonga": 30,
  "Trinidad and Tobago": 30, "Tuvalu": 30, "Uganda": 30, "Ukraine": 30,
  "Uzbekistan": 30, "Vanuatu": 30, "Vatican City": 30, "Venezuela": 30,
  "Vietnam": 30, "Zambia": 30, "Zimbabwe": 30,

  // 14 Days Visa-Free
  "Iran": 14, "Libya": 14
};

// Special notes for certain countries
const specialNotes: Record<string, string> = {
  "China": "Visa exemption until December 31, 2026",
  "India": "Visa exemption until December 31, 2026",
  "Hong Kong SAR": "Note: Hong Kong Certificate of Identity (C.I.) and Document of Identity (D.I.) holders require a visa. Please apply for eVisa at https://www.imi.gov.my/index.php/en/main-services/visa/evisa-en/",
  "Macau SAR": "Note: Holders of Macao Special Administrative Region Travel Permits are granted visa-free entry for 14 days regardless of their nationality."
};

// List of all countries (including those that require visa)
const countries = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
  "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Democratic Republic)",
  "Congo (Republic)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Equatorial Guinea", "Eritrea",
  "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong SAR", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Ivory Coast", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Macau SAR", "North Macedonia", "Madagascar", "Malawi", "Maldives",
  "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman",
  "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
  "Zimbabwe"
];

interface VisaCheckProps {
  onNext: () => void;
  onBack: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export function VisaCheck({ onNext, onBack, onRestart, onClose }: VisaCheckProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const getVisaStatus = () => {
    if (!selectedCountry) return null;
    
    const stayDuration = visaFreeCountries[selectedCountry];
    if (stayDuration) {
      return {
        status: 'visa-free',
        duration: stayDuration
      };
    }
    return {
      status: 'visa-required'
    };
  };

  const visaStatus = getVisaStatus();

  return (
    <Layout onClose={onClose}>
      <div className="text-center text-white p-4 md:p-8 max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <CreditCard className="w-8 h-8 mr-3" />
          <h1 className="text-2xl md:text-5xl font-bold">Visa Requirements</h1>
        </div>

        <div className="bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl mb-8 relative">
          <p className="text-sm md:text-lg text-gray-200 leading-relaxed mb-8 px-2">
            Check if you need a visa to enter Malaysia. Select your nationality below to see 
            the visa requirements for your country.
          </p>

          <div className="mb-8">
            <label className="block text-left text-lg mb-2 text-gray-200">
              Select your nationality:
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                ref={dropdownRef}
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-left flex items-center justify-between
                         hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                {selectedCountry || 'Choose a country'}
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <Portal targetRef={dropdownRef}>
                  <div className="bg-white rounded-lg shadow-xl max-h-96 overflow-auto">
                    <div className="sticky top-0 bg-white p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <button
                          key={country}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800
                                   transition-colors duration-200 cursor-pointer"
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
                </Portal>
              )}
            </div>
          </div>

          {selectedCountry && (
            <div className={`rounded-xl p-6 mb-8 animate-fade-in
              ${visaStatus?.status === 'visa-free' 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-yellow-500/20 border border-yellow-500/30'}`}
            >
              <h2 className="text-lg md:text-2xl font-bold mb-4 flex items-center justify-center gap-2 px-2">
                {visaStatus?.status === 'visa-free' 
                  ? '✈️ Visa-Free Entry' 
                  : '🛂 Visa Required'}
              </h2>
              
              {visaStatus?.status === 'visa-free' ? (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-sm md:text-lg px-2">
                    Good news! As a {selectedCountry} passport holder, you can enter Malaysia 
                    visa-free for up to <span className="font-bold">{visaStatus.duration} days</span>.
                  </p>
                  <div className="flex items-start text-left text-xs md:text-sm px-2">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    <p>
                      Ensure your passport has at least 6 months validity and blank pages. 
                      Entry is at the discretion of immigration officers.
                    </p>
                  </div>
                  {specialNotes[selectedCountry] && (
                    <div className="mt-4 bg-blue-500/20 border-2 border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-blue-100">
                        <strong>Important:</strong> {specialNotes[selectedCountry]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-sm md:text-lg px-2">
                    As a {selectedCountry} passport holder, you need to apply for a visa before 
                    traveling to Malaysia. Please apply through the official eVisa portal.
                  </p>
                  <div className="flex flex-col gap-4 px-2">
                  <a 
                    href="https://www.imi.gov.my/index.php/en/main-services/visa/evisa-en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary from-blue-500 to-blue-600 
                             hover:from-blue-400 hover:to-blue-500
                             text-base md:text-lg px-6 py-3 md:px-10 md:py-4"
                  >
                    Apply for eVisa
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>

                  <div className="space-y-4">
                    <div className="flex items-start text-left text-xs md:text-sm">
                      <AlertCircle className="w-5 h-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                      <p>
                        Apply at least 2 weeks before your planned travel date. Ensure all required 
                        documents are ready before starting your application.
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="text-xs md:text-sm text-gray-300 px-2">
            <p className="flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Information is subject to change. Updated as of 31 January 2025.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="btn-secondary bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-600/30"
          >
            Back
            <ArrowLeft className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={onNext}
            className={`btn-primary from-blue-500 to-blue-600 
                       hover:from-blue-400 hover:to-blue-500 
                       ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedCountry}
          >
            Next
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
}