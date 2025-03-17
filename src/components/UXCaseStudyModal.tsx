import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { CaseStudySelectorModal } from './CaseStudySelectorModal';
import { useCountAnimation } from '../hooks/useCountAnimation';
import ReactGA from 'react-ga4';

interface UXStep {
  title: string;
  content: string;
  image: string;
  stats?: {
    performance: string;
    improvement: string;
  };
  bulletPoints?: string[];
  beforeScore?: string;
  steps?: {
    title: string;
    description: string;
  }[];
  caseStudies?: {
    title: string;
    points: string[];
  }[];
}

interface UXCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CASE_STUDY_STEPS: UXStep[] = [
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
  
  const step = CASE_STUDY_STEPS[currentStep];
  const isLastStep = currentStep === CASE_STUDY_STEPS.length - 1;

  const performanceScore = useCountAnimation(
    step.stats ? parseInt(step.stats.performance) : 0,
    1500
  );
  const improvementScore = useCountAnimation(
    step.stats ? parseInt(step.stats.improvement) : 0,
    1500
  );

  useEffect(() => {
    if (step.stats) {
      ReactGA.event({
        category: 'UX Case Study',
        action: 'View Stats',
        label: `Step ${currentStep + 1}`,
      });
    }
  }, [currentStep, step.stats]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
        aria-label="Close modal"
      />
      <div 
        className="bg-gray-900 rounded-xl w-full max-w-2xl flex flex-col relative z-10 max-h-[90vh]" 
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 hover:text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative h-24 sm:h-32 overflow-hidden shrink-0 hidden md:block">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        </div>
        
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
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
            
            {step.stats && (
              <div className="grid grid-cols-2 gap-3" role="region" aria-label="Performance Statistics">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500" aria-live="polite">
                    {performanceScore}%
                  </div>
                  <div className="text-sm text-gray-400">Performance Score</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500" aria-live="polite">
                    +{improvementScore}%
                  </div>
                  <div className="text-sm text-gray-400">Average Improvement</div>
                </div>
              </div>
            )}

            {step.bulletPoints && (
              <ul className="space-y-2 list-disc list-inside">
                {step.bulletPoints.map((point, index) => (
                  <li key={index} className="text-gray-300">{point}</li>
                ))}
              </ul>
            )}

            {step.steps && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {step.steps.map((item, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {step.caseStudies && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.caseStudies.map((study, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">{study.title}</h3>
                    <ul className="space-y-1 list-disc list-inside">
                      {study.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-300 text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm mt-auto">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-white hover:bg-gray-800/80'
              }`}
              disabled={currentStep === 0}
              aria-label="Previous step"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <button
              onClick={() => isLastStep ? setIsSelectorOpen(true) : setCurrentStep(prev => prev + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg transition-colors font-medium"
              aria-label={isLastStep ? "View case studies" : "Next step"}
            >
              <span>{isLastStep ? "View Case Studies" : "Next"}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
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