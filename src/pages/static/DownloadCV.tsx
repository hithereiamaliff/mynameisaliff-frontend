import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';

export function DownloadCVPage() {
  useEffect(() => {
    // Initialize ConvertKit form
    const script = document.createElement('script');
    script.src = 'https://hustling-originator-9334.kit.com/9ab472743d/index.js';
    script.async = true;
    script.dataset.uid = '9ab472743d';
    
    const container = document.getElementById('convertkit-form-container');
    if (container) {
      container.innerHTML = ''; // Clear previous content
      container.appendChild(script);
    }

    // Track page view
    ReactGA.event({
      category: 'Page View',
      action: 'View Download CV Page',
    });
  }, []);

  return (
    <>
      <SEO
        title="Download My CV"
        description="Download my comprehensive CV to learn more about my experience in digital experience creation, AI development, and UX design."
        keywords="cv download, resume, digital experience, AI development, UX design, Malaysia"
        path="/download-cv"
      />
      
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <article className="text-white space-y-12">
            <h1 className="text-4xl font-bold">Download My CV</h1>

            <section>
              <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <Download className="h-6 w-6" />
                    Get My Complete CV
                  </h2>
                  <p className="text-gray-300">
                    Please fill in your details below to receive my comprehensive CV.
                  </p>
                </div>
                
                <div 
                  id="convertkit-form-container" 
                  className="min-h-[300px] bg-white rounded-lg p-6"
                />
              </div>
            </section>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <Link
                to="/"
                className="inline-flex items-center text-yellow-500 hover:text-yellow-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}