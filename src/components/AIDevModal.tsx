import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, MessageCircle, Github, Bus } from 'lucide-react';

interface AIDevModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

const TECH_STACKS = [
  {
    name: 'React & TypeScript',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="h-8 w-8" alt="React logo" />,
    description: 'For building robust, type-safe user interfaces'
  },
  {
    name: 'Node.js',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="h-8 w-8" alt="Node.js logo" />,
    description: 'Powering backend solutions'
  },
  {
    name: 'Railway',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/railway/railway-original.svg" className="h-8 w-8" alt="Railway logo" />,
    description: 'For backend deployment and hosting'
  },
  {
    name: 'Supabase',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" className="h-8 w-8" alt="Supabase logo" />,
    description: 'For database hosting and management'
  }
];

const AI_DEV_STEPS = [
  {
    title: "Experience AI-Enhanced Development",
    content: "You're currently experiencing it! This website was developed with the assistance of AI, creating an intuitive and engaging user experience. How do you find it?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    poll: {
      question: "How would you rate the website's user experience?",
      options: [
        "Very Intuitive & Well-Designed",
        "Needs Improvement"
      ]
    }
  },
  {
    title: "Tech Stack Showcase",
    content: "Here's the powerful combination of technologies that make this website possible:",
    techStacks: TECH_STACKS,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "AI Assistant Integration",
    content: "Experience the power of AI assistance firsthand through our integrated chatbot. Click the Chat 💬 button on the bottom right of the page to ask questions about my experience, skills, or anything else you'd like to know!",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Rapid Penang Bus Chatbot",
    content: "I've also developed a specialized chatbot for Rapid Penang bus information. It helps users navigate the public transport system by providing route information and travel tips based on my personal experience.\n\nTry it out to see how AI can make public transportation more accessible!",
    chatbotUrl: "https://pgbusapp.mynameisaliff.co.uk",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Open Source",
    content: "Interested in how this website works? The frontend codebase is open source and available on GitHub. Feel free to explore, learn, or even contribute!",
    githubUrl: "https://github.com/hithereiamaliff/mynameisaliff-frontend",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=2000"
  }
];

export function AIDevModal({ isOpen, onClose, onOpenChat }: AIDevModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [pollAnswers, setPollAnswers] = useState<Record<number, number>>({});
  const step = AI_DEV_STEPS[currentStep];
  const isLastStep = currentStep === AI_DEV_STEPS.length - 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-4xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh]">
        <button
          onClick={onClose}
          className="fixed top-3 right-3 p-2 bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors z-10 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative h-24 sm:h-32 overflow-hidden hidden sm:block">
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
              {AI_DEV_STEPS.map((_, index) => (
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
              {currentStep + 1} of {AI_DEV_STEPS.length}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {step.title}
          </h2>
          
          <div className="text-gray-300 space-y-6">
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
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step.techStacks && (
              <div className="grid grid-cols-2 gap-4">
                {step.techStacks.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="flex items-center gap-3 mb-2 group-hover:animate-pulse">
                      {tech.icon}
                      <h3 className="font-medium text-white">{tech.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{tech.description}</p>
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
            
            <div className="flex gap-2">
              {currentStep === 2 && (
                <button
                  onClick={onOpenChat}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Try the Chatbot
                  <MessageCircle className="ml-2 h-4 w-4" />
                </button>
              )}
              {currentStep === 3 && (
                <a
                  href={step.chatbotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Visit Bus App
                  <Bus className="ml-2 h-4 w-4" />
                </a>
              )}
              {isLastStep ? (
                <>
                  <a
                    href={step.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Close
                    <X className="ml-2 h-4 w-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}