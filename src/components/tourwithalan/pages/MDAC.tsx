import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ExternalLink, FileText, AlertCircle, X, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { RestartButton } from '../components/RestartButton';

interface MDACProps {
  onBack: () => void;
  onComplete: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export function MDAC({ onBack, onComplete, onRestart, onClose }: MDACProps) {
  const [showModal, setShowModal] = useState(false);

  const handleExemptUser = () => {
    setShowModal(false);
    onComplete();
  };

  return (
    <Layout onClose={onClose}>
      <div className="text-center text-white p-4 md:p-8 max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <FileText className="w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold">Malaysia Digital Arrival Card (MDAC)</h2>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8">
          <p className="text-lg text-gray-200 leading-relaxed mb-6">
            The MDAC is a mandatory digital form that replaces the traditional paper arrival card. 
            You must submit this form within 3 days before arriving in Malaysia. It helps 
            immigration authorities process your entry more efficiently and reduces waiting 
            time at the border.
          </p>

          {/* MDAC Form Image */}
          <div className="w-full rounded-lg mb-8 overflow-hidden">
            <img
              src="https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/photo_2025-01-31_03-43-36.png"
              alt="MDAC Form Example"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <a 
            href="https://imigresen-online.imi.gov.my/mdac/main"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-blue-500 hover:bg-blue-600 mb-4"
          >
            Fill MDAC Form Now
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>

          {/* Disclaimer */}
          <div className="flex items-start justify-center text-sm text-gray-300 mb-6 px-4">
            <ShieldAlert className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-left">
              You will be redirected to the official MDAC form website by the Malaysian Immigration Department 
              (Jabatan Imigresen Malaysia). Please verify that the URL is{' '}
              <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded">
                https://imigresen-online.imi.gov.my/mdac/main
              </span>
            </p>
          </div>

          <div className="mt-6 text-left">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-1 text-yellow-400 flex-shrink-0" />
              <p className="text-gray-200">
                <span className="font-semibold">Note:</span> Certain nationalities are exempt 
                from filling MDAC. <button 
                  className="text-blue-400 hover:text-blue-300 underline"
                  onClick={() => setShowModal(true)}
                >
                  Click here to see the list
                </button>
              </p>
            </div>
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
            onClick={onComplete}
            className="btn-primary from-blue-500 to-blue-600 
                      hover:from-blue-400 hover:to-blue-500"
          >
            Next
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div className="fixed inset-0 bg-black/70 z-40" />
            <div className="fixed inset-x-0 bottom-24 flex items-end justify-center z-50">
              <div className="bg-white text-black rounded-2xl max-w-2xl w-[calc(100%-2rem)] mx-4 p-4 md:p-8 
                            relative animate-fade-in max-h-[70vh] overflow-y-auto shadow-2xl">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors
                           bg-white rounded-full p-1.5 shadow-lg z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 pr-8">
                  Exempted Nationalities & Documents
                </h3>

                <ul className="space-y-3 text-left mb-6 md:mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">🇸🇬</span> Citizens of Singapore
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌏</span> All diplomatic and official passport holders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🇲🇾</span> Malaysian permanent residents and long-term pass holders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🇧🇳</span> Brunei Darussalam General Certificate of Identity (GCI) holders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🇧🇳</span> Brunei-Malaysia Frequent Traveler Facility holders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🇹🇭</span> Thailand border pass holders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🇮🇩</span> Indonesia Cross-Border Travel Document (PLB) holders
                  </li>
                </ul>

                <p className="text-base md:text-lg font-medium text-gray-700 mb-4 md:mb-6">
                  Are you one of the nationalities above?
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
                  <button
                    onClick={handleExemptUser}
                    className="btn-action bg-green-500 hover:bg-green-600 w-full md:w-auto"
                  >
                    Yes, skip MDAC submission
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-action bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
                  >
                    No, proceed to fill MDAC form
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
