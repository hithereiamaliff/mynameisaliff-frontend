import React, { useEffect, useState } from 'react';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';
import { PageTransition } from '../../components/PageTransition';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// Google Form ID from your form URL
const GOOGLE_FORM_ID = '1FAIpQLSdWkD34SPjRyli2Q9yCMcW-23QgpUn0h_1bb6eLh83eXEhfGA';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    // Track page view
    ReactGA.event({
      action: 'contact_page_view',
      category: 'page_view',
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Add schema.org structured data for SEO
  useEffect(() => {
    // Add structured data script for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact YourName | Get in Touch',
      'description': 'Send a message to YourName through this contact form. I\'ll get back to you as soon as possible.',
      'url': 'https://your-website.example.com/contact',
    });
    document.head.appendChild(script);

    return () => {
      // Clean up
      document.head.removeChild(script);
    };
  }, []);

  // State to track whether user has acknowledged the Google account requirement
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  // Track form interaction
  const handleIframeLoad = () => {
    ReactGA.event({
      action: 'google_form_loaded',
      category: 'engagement',
    });
  };

  // Handle acknowledgment
  const handleAcknowledge = () => {
    setHasAcknowledged(true);
    ReactGA.event({
      action: 'contact_page_acknowledged',
      category: 'engagement',
    });
  };

  return (
    <>
      <SEO
        title="Contact YourName | Enquiry Form"
        description="Have questions or want to connect? Fill out this enquiry form to share your background and questions. I'll get back to you as soon as possible."
        keywords="contact, enquiry, form, questions, background, get in touch"
        path="/contact"
        type="website"
      />
      
      <PageTransition>
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto"> {/* Increased max-width for the iframe */}
            <div className="flex justify-between items-center mb-6">
              <Link 
                to="/"
                className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                onClick={() => {
                  ReactGA.event({
                    action: 'contact_page_home_click',
                    category: 'navigation',
                  });
                }}
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Enquiry Form</h1>
            <p className="text-gray-300 mb-8">
              I'd love to hear from you! Share a bit about your background and any questions you have. I'll get back to you as soon as possible.
            </p>

            {!hasAcknowledged ? (
              // Confirmation dialog
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="py-8 px-6 flex flex-col justify-center">
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
              </div>
            ) : (
              // The actual form content
              <div className="bg-white p-1 rounded-lg shadow-lg overflow-hidden">
                <iframe 
                  src={`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?embedded=true`}
                  width="100%"
                  height="800px"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  onLoad={handleIframeLoad}
                  title="Contact Form"
                  className="w-full"
                >
                  Loading form...
                </iframe>
              </div>
            )}
            
            <div className="mt-8 text-sm text-gray-400 text-center">
              <p>Your information is secure and will only be shared with me.</p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link 
                to="/"
                className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                onClick={() => {
                  ReactGA.event({
                    action: 'contact_page_home_bottom_click',
                    category: 'navigation',
                  });
                }}
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default ContactPage;

