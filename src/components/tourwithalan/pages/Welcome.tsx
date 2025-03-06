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
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 animate-pulse mr-2 md:mr-3" />
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-400 animate-pulse ml-2 md:ml-3" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
          Selamat Datang!
        </h2>
        
        <div className="bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-yellow-400">
            which means Welcome! in our national language :)
          </h2>

          <div className="space-y-4 text-base md:text-xl text-gray-200">
            <p>
            We're thrilled that you've chosen Malaysia as your destination! 
            </p>
            
            <p>
            To ensure your journey is as smooth as silk, we've made this site 
            as interactive as possible, tailored just for you. Let us help make 
            your Malaysian adventure truly memorable from the moment you arrive.
            </p>
            
            <p>
            For the time being, it only covers the entry upon arrival in Malaysia 
            at any entry points, including visa requirements and MDAC submission. 
            More to come soon!
            </p>
          </div>
        </div>
        
        <button 
          onClick={onNext}
          className="btn-primary from-yellow-500 to-orange-500 
                    hover:from-yellow-400 hover:to-orange-400"
        >
          Check Visa Requirements
          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </Layout>
  );
}