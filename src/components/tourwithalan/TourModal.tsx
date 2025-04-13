import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Welcome } from './pages/Welcome';
import { VisaCheck } from './pages/VisaCheck';
import { MDAC } from './pages/MDAC';
import { WelcomeToMalaysia } from './pages/WelcomeToMalaysia';
import { Transition } from './components/Transition';
import { X } from 'lucide-react';
import './index.css';

type Step = 'welcome' | 'visa' | 'mdac' | 'final';

export function TourModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleStepChange = (newStep: Step, newDirection: 'left' | 'right') => {
    setDirection(newDirection);
    setCurrentStep(newStep);
  };

  const handleRestart = () => {
    setDirection('right');
    setCurrentStep('welcome');
  };

  const handleComplete = () => {
    onClose();
    setCurrentStep('welcome'); // Reset to initial state
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <Transition isActive={currentStep === 'welcome'} direction={direction}>
            <Welcome onNext={() => handleStepChange('visa', 'left')} onClose={onClose} />
          </Transition>
        );
      case 'visa':
        return (
          <Transition isActive={currentStep === 'visa'} direction={direction}>
            <VisaCheck 
              onNext={() => handleStepChange('mdac', 'left')}
              onBack={() => handleStepChange('welcome', 'right')}
              onRestart={handleRestart}
              onClose={onClose}
            />
          </Transition>
        );
      case 'mdac':
        return (
          <Transition isActive={currentStep === 'mdac'} direction={direction}>
            <MDAC 
              onBack={() => handleStepChange('visa', 'right')}
              onComplete={() => handleStepChange('final', 'left')}
              onRestart={handleRestart}
              onClose={onClose}
            />
          </Transition>
        );
      case 'final':
        return (
          <Transition isActive={currentStep === 'final'} direction={direction}>
            <WelcomeToMalaysia 
              onComplete={handleComplete}
              onRestart={handleRestart}
              onClose={onClose}
            />
          </Transition>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="relative bg-transparent rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div className="overflow-y-auto flex-1">
            {renderStep()}
          </div>
        </div>
      </div>
    </>
  );
} 
