import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Github, FileCode, Bot, Terminal } from 'lucide-react';

interface DevToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEV_TOOLS_STEPS = [
  {
    title: "AI-Powered Developer Tools",
    content: "I've developed these tools initially for my own use, leveraging AI to enhance my development workflow. Now, I'm excited to share them with the community as open-source projects.\n\nWhile some technical knowledge is required to use these tools, I've provided detailed README documentation to help you get started.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Model Context Protocol (MCP) Servers",
    content: "A collection of server implementations for the Model Context Protocol, designed to enhance AI model interactions with structured context.\n\nKey Features:\n• Standardized context handling\n• Multiple server implementations\n• Easy integration with AI models\n• Detailed documentation",
    repoUrl: "https://github.com/hithereiamaliff/mcp-servers",
    techStack: ["Node.js", "WSL", "Various API keys"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "WSL Claude Code Launcher",
    content: "A specialized tool for launching Claude Code session through Windows Subsystem for Linux (WSL) without entering commands manually.\n\nKey Features:\n• Seamless WSL integration\n• Automated session management\n• Claude API integration configuration\n• Detailed documentation",
    repoUrl: "https://github.com/hithereiamaliff/wsl-claudecode-launcher",
    techStack: ["Shell Script", "WSL", "Claude API"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=2000"
  }
];

export function DevToolsModal({ isOpen, onClose }: DevToolsModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = DEV_TOOLS_STEPS[currentStep];
  const isLastStep = currentStep === DEV_TOOLS_STEPS.length - 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900/90 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh]">
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
              {DEV_TOOLS_STEPS.map((_, index) => (
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
              {currentStep + 1} of {DEV_TOOLS_STEPS.length}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {step.title}
          </h2>
          
          <div className="text-gray-300 space-y-6">
            <div className="leading-relaxed whitespace-pre-wrap">{step.content}</div>

            {step.techStack && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Tech Stack:</h3>
                <div className="flex flex-wrap gap-2">
                  {step.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-yellow-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {step.repoUrl && (
              <a
                href={step.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-medium group-hover:text-yellow-500 transition-colors">
                    View Repository
                  </span>
                  <ArrowRight className="h-4 w-4 text-yellow-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>
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
              <button
                onClick={onClose}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Close
                <X className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
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