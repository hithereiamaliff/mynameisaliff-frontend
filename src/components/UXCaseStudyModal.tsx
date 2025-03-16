import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CaseStudySelectorModal } from './CaseStudySelectorModal';

interface UXCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CASE_STUDY_STEPS = [
  {
    title: "Experience This Site's Performance",
    content: "You're experiencing it right now - a blazing fast website built with modern technologies. \n\nNotice the smooth animations and instant page loads? This site leverages React with Vite for optimal performance.\n\nThe result? Sub-second page loads and a perfect Lighthouse performance score.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "WordPress Optimization Specialist",
    content: "Speed is crucial for success. A 1-second delay can result in 7% fewer conversions and 11% fewer page views.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000",
    stats: {
      performance: "92%",
      improvement: "40%"
    }
  },
  {
    title: "Is Your WordPress Site Holding You Back?",
    content: "Common issues that drive visitors away:",
    bulletPoints: [
      "Slow loading times (3+ seconds)",
      "Poor hosting performance",
      "Bloated WordPress themes like Divi",
      "High server response time",
      "Unoptimized images"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    beforeScore: "52%"
  },
  {
    title: "My Proven Optimization Method",
    content: "My approach to transform slow sites into high-performance machines:",
    steps: [
      {
        title: "Strategic Hosting Migration",
        description: "Premium hosting with Cloudways"
      },
      {
        title: "Lightweight Themes",
        description: "Ultra-light Astra theme"
      },
      {
        title: "Premium Optimization",
        description: "WP Rocket setup"
      },
      {
        title: "Image Optimization",
        description: "Smart compression"
      }
    ],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Real Results for Real Websites",
    content: "Recent transformations:",
    caseStudies: [
      {
        title: '"Getting It Strait" WordPress.com Migration',
        points: [
          "Same-day migration",
          "Enhanced functionality",
          "Fixed all issues",
          "Added security"
        ]
      },
      {
        title: "Website Speed Optimization",
        points: [
          "Score: D (52%) → A (92%)",
          "Load: 3.0s → 1.5s",
          "Block: 265ms → 6ms"
        ]
      }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
  }
];

export function UXCaseStudyModal({ isOpen, onClose }: UXCaseStudyModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [pollAnswers, setPollAnswers] = useState<Record<number, number>>({});
  const step = CASE_STUDY_STEPS[currentStep];
  const isLastStep = currentStep === CASE_STUDY_STEPS.length - 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-4xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:absolute sm:top-3 sm:right-3 p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors z-10 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative h-24 sm:h-32 overflow-hidden shrink-0 hidden sm:block">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {CASE_STUDY_STEPS.map((_, index) => (
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
              {currentStep + 1} of {CASE_STUDY_STEPS.length}
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            {step.title}
          </h2>
          
          <div className="text-gray-300 space-y-4 sm:space-y-6">
            <div className="leading-relaxed whitespace-pre-wrap">{step.content}</div>
            
            {step.poll && (
              <div className="space-y-3">
                <p className="font-medium text-white">{step.poll.question}</p>
                {step.poll.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setPollAnswers(prev => ({ ...prev, [currentStep]: index }))}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      pollAnswers[currentStep] === index
                        ? 'bg-yellow-600/20 text-yellow-200 border border-yellow-500/30'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="flex-1">{option}</span>
                      {pollAnswers[currentStep] === index && (
                        <ThumbsUp className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step.stats && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500">{step.stats.performance}</div>
                  <div className="text-sm text-gray-400">Performance Score</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500">+{step.stats.improvement}</div>
                  <div className="text-sm text-gray-400">Average Improvement</div>
                </div>
              </div>
            )}

            {step.bulletPoints && (
              <ul className="space-y-2">
                {step.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {step.steps && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {step.steps.map((item, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg flex flex-col">
                    <h3 className="font-medium text-white mb-2 text-sm sm:text-base line-clamp-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {step.caseStudies && (
              <div className="grid grid-cols-2 gap-3">
                {step.caseStudies.map((study, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-3">{study.title}</h3>
                    <ul className="space-y-2">
                      {study.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSelectorOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm"
              >
                View Full Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <CaseStudySelectorModal 
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
      />
    </div>
  );
}