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
          Selamat Datang!
        </h2>
        
        <div className="bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-yellow-400">
            Welcome to Malaysia, Truly Asia! 🌺
          </h2>

          <div className="space-y-4 text-base md:text-xl text-gray-200">
            <p>
              We're excited to help you explore our beautiful country, where tradition meets modernity 
              and diverse cultures blend harmoniously! 🏮 🕌 ⛩️
            </p>
            
            <p>
              To make your journey as smooth as possible, we've created this interactive guide 
              to help you with all the essential entry requirements. Think of me as your 
              digital "Abang" (brother) or "Kakak" (sister) helping you out! 😊
            </p>
            
            <p className="text-yellow-300 font-medium">
              Currently covering:
              <span className="block mt-2 space-y-1">
                ✨ Visa Requirements Check
                ✨ MDAC Declaration Form
                ✨ Entry Guidelines
                ✨ More Features Coming Soon!
              </span>
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