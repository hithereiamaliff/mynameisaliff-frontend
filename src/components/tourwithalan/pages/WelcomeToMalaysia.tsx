import React from 'react';
import { Layout } from '../components/Layout';
import { ExternalLink } from 'lucide-react';

interface WelcomeToMalaysiaProps {
  onComplete: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export function WelcomeToMalaysia({ onComplete, onRestart, onClose }: WelcomeToMalaysiaProps) {
  return (
    <Layout onClose={onClose}>
      <div className="text-center text-white p-4 md:p-8 max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">🇲🇾 Welcome to Malaysia 🇲🇾</h2>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8">
          <div className="space-y-6 text-gray-200">
            <p className="text-lg md:text-xl leading-relaxed">
              Thank you for checking out this preview of my upcoming travel guide platform! 
              I'm working hard to make your Malaysian adventure truly memorable.
            </p>
            
            <div className="space-y-4 text-base md:text-lg">
              <p className="font-bold">Coming soon in 2025:</p>
              <ul className="space-y-3 text-left list-disc list-inside">
                <li>Interactive guides for getting around Malaysia</li>
                <li>Local food recommendations</li>
                <li>Public transport navigation tips</li>
                <li>Cultural etiquette and local customs</li>
                <li>Useful local Malay language phrases</li>
              </ul>
            </div>

            <p className="text-base md:text-lg">
              Stay tuned for updates! Follow my journey as I build this platform 
              to help tourists experience the best of Malaysia.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onRestart}
            className="btn-secondary bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-600/30"
          >
            Start Over
            <ExternalLink className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={onComplete}
            className="btn-primary from-green-500 to-emerald-500 
                      hover:from-green-400 hover:to-emerald-400"
          >
            Complete
            <ExternalLink className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
} 