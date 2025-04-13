import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, MapPin, Download } from 'lucide-react';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSPORT_STEPS = [
  {
    title: "Community Volunteer at Moovit",
    content: "As a Community Volunteer for Moovit, I focused on enhancing the accuracy and reliability of public transport data within Malaysia.\n\nI regularly contributed by fact-checking and updating timetables, routes, and other crucial transport information in the Moovit database, ensuring that users had access to the most up-to-date details for their journeys.",
    image: "https://images.unsplash.com/photo-XXXXXXXXXXXX-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Areas Covered",
    content: "I make use of the data from public transport providers like Rapid Penang, Rapid Kuantan, and Perak Transit, making sure that route changes and schedule updates are accurately reflected in the app.\n\nMy work helped improve the app's functionality, making public transport more accessible and easier to navigate for users across Malaysia.",
    areas: [
      {
        city: "Penang",
        provider: "Rapid Penang"
      },
      {
        city: "Ipoh",
        provider: "Perak Transit"
      },
      {
        city: "Kuantan",
        provider: "Rapid Kuantan"
      }
    ],
    image: "https://images.unsplash.com/photo-XXXXXXXXXXXX-194d4455a60c?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Personal Experience",
    content: "My contributions to Moovit are backed by extensive personal experience as a frequent user of public transportation in Malaysia. For about 7 years, I've relied on Rapid Penang buses and KTM trains for my daily commute.\n\nThis firsthand experience helps me understand the challenges and needs of public transport users, making my contributions to Moovit more meaningful and practical.",
    image: "https://images.unsplash.com/photo-XXXXXXXXXXXX-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Try Moovit Today",
    content: "Ready to make your public transport journey easier? Download Moovit now and experience hassle-free navigation across Malaysia's public transport network.",
    nextButtonText: "One More Thing",
    stores: [
      {
        name: "App Store",
        url: "https://apps.apple.com/us/app/moovit-transit-map-tracker/id498477945",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
      },
      {
        name: "Play Store",
        url: "https://play.google.com/store/apps/details?id=com.tranzmate&hl=en",
        icon: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      }
    ],
    guide: {
      text: "Need help getting started? Download our quick guide:",
      url: "https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/Public+Transportation/Start+Taking+Public+Transport+with+Moovit+-+Free+PDF-min.pdf"
    },
    image: "https://images.unsplash.com/photo-XXXXXXXXXXXX-b35492cc74b4?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Ask Me About Rapid Penang",
    content: "I've developed a chatbot that can answer your questions about Rapid Penang based on my personal experience using the Rapid Penang bus.\n\nYou can ask about:\n• General information about Rapid Penang bus network 🚍\n• Tips for using the bus system 🚶🏻\n• Basic route information 🗺\n\nNOTE: For real-time information like bus arrivals, locations, and specific route recommendations, please use the Moovit app instead (just press the Back button below to download).",
    chatbotUrl: "https://pgbusapp.your-website-name.co.uk",
    image: "https://images.unsplash.com/photo-XXXXXXXXXXXX-e93688616381?auto=format&fit=crop&q=80&w=2000"
  }
];

export function TransportModal({ isOpen, onClose }: TransportModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TRANSPORT_STEPS[currentStep];
  const isLastStep = currentStep === TRANSPORT_STEPS.length - 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh]">
        <button
          onClick={onClose}
          className="fixed top-3 right-3 p-2 bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors z-10 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative h-24 sm:h-32 overflow-hidden hidden md:block">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {TRANSPORT_STEPS.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-yellow-500 w-8' 
                      : 'bg-gray-700 w-4'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {currentStep + 1} of {TRANSPORT_STEPS.length}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {step.title}
          </h2>
          
          <div className="text-gray-300 space-y-6">
            <div className="leading-relaxed whitespace-pre-wrap">{step.content}</div>
            
            {step.areas && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
                {step.areas.map((area, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
                    <MapPin className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="font-medium text-white mb-1">{area.city}</div>
                    <div className="text-sm text-gray-400">{area.provider}</div>
                  </div>
                ))}
              </div>
            )}

            {step.stores && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  {step.stores.map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                    >
                      <img
                        src={store.icon}
                        alt={`Download on ${store.name}`}
                        className="h-12 sm:h-14"
                      />
                    </a>
                  ))}
                </div>
                
                {step.guide && (
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <p className="mb-4">{step.guide.text}</p>
                    <a
                      href={step.guide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                    >
                      Download Guide
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-6 border-t border-gray-800 pt-4">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            {isLastStep ? (
              <div className="flex gap-2">
                <a
                  href={step.chatbotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Try the Chatbot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Close
                  <X className="ml-2 h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                {step.nextButtonText || "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
