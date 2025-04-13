import React from 'react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Re-initialize ConvertKit form when modal opens
      const script = document.createElement('script');
      script.src = 'https://hustling-originator-9334.kit.com/9ab472743d/index.js';
      script.async = true;
      script.dataset.uid = '9ab472743d';
      
      const container = document.getElementById('convertkit-form-container');
      if (container) {
        container.innerHTML = ''; // Clear previous content
        container.appendChild(script);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col max-h-[80vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-4 md:p-6 overflow-auto">
          {children}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
