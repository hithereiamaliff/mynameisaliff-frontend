import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { X } from 'lucide-react';

// Google Form ID from your form URL
const GOOGLE_FORM_ID = '1FAIpQLSdWkD34SPjRyli2Q9yCMcW-23QgpUn0h_1bb6eLh83eXEhfGA';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  // State to track whether user has acknowledged the Google account requirement
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  
  // Track form interaction
  const handleIframeLoad = () => {
    ReactGA.event({
      action: 'contact_modal_form_loaded',
      category: 'engagement',
    });
  };
  
  // Handle acknowledgment
  const handleAcknowledge = () => {
    setHasAcknowledged(true);
    ReactGA.event({
      action: 'contact_modal_acknowledged',
      category: 'engagement',
    });
  };
  
  // Reset acknowledgment when modal closes
  const handleClose = () => {
    onClose();
    // Reset after a short delay to avoid flickering if reopened quickly
    setTimeout(() => setHasAcknowledged(false), 300);
    ReactGA.event({
      category: 'User Interaction',
      action: 'Closed Contact Modal'
    });
  };

  // Custom modal implementation without scrollable content
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-4 md:p-6">
          {!hasAcknowledged ? (
        // Confirmation dialog
        <div className="py-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Google Account Required</h3>
            <div className="text-black space-y-4">
              <p>This form requires you to sign in with a Google account before submission.</p>
              <p>This ensures your information is securely submitted and helps prevent spam.</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleAcknowledge}
              className="px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      ) : (
        // The actual form content
        <>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Form</h3>
            <p className="text-black">I'd love to hear from you! Share a bit about your background and any questions you have.</p>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden">
            <iframe 
              src={`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?embedded=true`}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={handleIframeLoad}
              title="Contact Form"
              style={{ width: '100%', height: '300px', maxHeight: '60vh' }}
              className="w-full"
            >
              Loading form...
            </iframe>
          </div>
        </>
      )}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

