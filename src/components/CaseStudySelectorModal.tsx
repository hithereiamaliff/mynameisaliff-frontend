import React from 'react';
import { X, FileText } from 'lucide-react';

interface CaseStudySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CASE_STUDIES = [
  {
    title: "GIS Website Migration",
    description: "A comprehensive case study on migrating a GIS website to improve performance and functionality.",
    url: "https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/WordPress/Case+Study+-+GIS+Host+Migration/GIS+Site+Migration+-+Case+Study.pdf"
  },
  {
    title: "Website Speed Optimization",
    description: "Learn how I increased website performance and reduced loading times significantly.",
    url: "https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/User+Experience+(UX)/Case+Study+-+Increase+Website+Loading+Speed/increase+site+loading+speed+-+case+study.pdf"
  }
];

export function CaseStudySelectorModal({ isOpen, onClose }: CaseStudySelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-5">
          <h2 className="text-2xl font-bold text-white mb-6">
            Select a Case Study
          </h2>
          
          <div className="grid gap-4">
            {CASE_STUDIES.map((study, index) => (
              <a
                key={index}
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-700/20 rounded-lg group-hover:bg-yellow-700/30 transition-colors">
                    <FileText className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-gray-400">
                      {study.description.split(' ').slice(0, 15).join(' ')}...
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}