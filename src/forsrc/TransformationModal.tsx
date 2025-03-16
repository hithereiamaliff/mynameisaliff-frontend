import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TransformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSFORMATION_STEPS = [
  {
    title: "The Evolution of My Journey",
    content: "What started as a passion for content writing has evolved into something much more exciting. The integration of AI has transformed how I approach digital solutions, opening new possibilities I never imagined.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "From Writing to Innovation",
    content: "While I still value the art of storytelling, my focus has shifted to leveraging AI and technology to create more impactful solutions. This transformation has allowed me to combine creativity with technical innovation in ways that better serve modern needs.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "The Future is AI-Powered",
    content: "Today, I'm excited to be working on AI-powered solutions that make technology more accessible to everyone. From chatbots to intelligent automation, I'm passionate about creating tools that enhance human capabilities rather than replace them.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
  }
];

export function TransformationModal({ isOpen, onClose }: TransformationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TRANSFORMATION_STEPS[currentStep];
  const isLastStep = currentStep === TRANSFORMATION_STEPS.length - 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative h-64 overflow-hidden">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {TRANSFORMATION_STEPS.map((_, index) => (
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
              {currentStep + 1} of {TRANSFORMATION_STEPS.length}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {step.title}
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {step.content}
          </p>
          
          <div className="flex justify-between items-center">
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
                  href="https://works.alancopywritingservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
                >
                  View My Written Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <button
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
              >
                Close
                <X className="ml-2 h-4 w-4" />
              </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}