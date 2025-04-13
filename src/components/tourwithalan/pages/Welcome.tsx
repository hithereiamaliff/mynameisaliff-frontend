import React from 'react';
import { Layout } from '../components/Layout';
import { ArrowRight, Heart } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
  onClose: () => void;
}

export function Welcome({ onNext, onClose }: WelcomeProps) {
  return (
    <Layout onClose={onClose}>
      <div className="text-center text-white p-4 md:p-8 max-w-2xl">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <span className="text-2xl md:text-3xl mr-2">🇲🇾</span>
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 animate-pulse mx-2" />
          <span className="text-2xl md:text-3xl ml-2">🇲🇾</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-red-500 via-yellow-300 to-blue-600 text-transparent bg-clip-text animate-gradient">
            Selamat Datang ke Malaysia!
          </span> 
          🇲🇾
          <span className="block text-sm font-normal text-white mt-1">
            (Welcome to Malaysia!)
          </span>
        </h2>
        
        <div className="bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-yellow-400">
            Hi there! I'm your friendly Malaysian local, ready to help you prepare for your journey to our beautiful country! 
            You can call me <span className="text-yellow-600 font-medium">YourName</span> 😄.
          </h2>

          <div className="space-y-4 text-base md:text-xl text-gray-200">
            <p>
              Before you embark on your Malaysian adventure, let me help you with two essential things:
            </p>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Check if you need a visa 🛂</li>
              <li>Submit your Malaysia Digital Arrival Card (MDAC) ✈️</li>
            </ul>
            
            <p className="text-sm text-gray-200 italic">
              Note: MDAC must be submitted within 3 days before your arrival
            </p>
          </div>
        </div>
        
        <button 
          onClick={onNext}
          className="btn-primary from-yellow-500 to-orange-500 
                    hover:from-yellow-400 hover:to-orange-400
                    transform transition-transform hover:scale-105"
        >
          Let's Check Your Visa Requirements
          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </Layout>
  );
}
