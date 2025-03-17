import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';

const AREAS = [
  {
    city: "Penang",
    provider: "Rapid Penang"
  },
  {
    city: "Ipoh",
    provider: "Perak Transit"
  },
  {
    city: "Kuantan",
    provider: "Rapid Kuantan"
  }
];

export function PublicTransportPage() {
  React.useEffect(() => {
    ReactGA.event({
      category: 'Page View',
      action: 'View Public Transport Page',
    });
  }, []);

  return (
    <>
      <SEO
        title="Public Transport Advocacy"
        description="Learn about my contributions to Malaysia's public transport system as a Moovit Community Volunteer and explore my Rapid Penang bus information chatbot."
        keywords="public transport, Rapid Penang, Moovit, bus routes, Malaysia transport, Penang bus"
        path="/public-transport"
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
            <h1>Public Transport Advocacy and Development</h1>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Community Volunteer at Moovit</h2>
              <p className="text-gray-300 mb-6">
                As a Community Volunteer for Moovit, I focus on enhancing the accuracy and reliability of 
                public transport data within Malaysia. I regularly contribute by fact-checking and updating 
                timetables, routes, and other crucial transport information in the Moovit database, ensuring 
                that users have access to the most up-to-date details for their journeys.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
                alt="Public transport volunteer work"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Areas Covered</h2>
              <p className="text-gray-300 mb-6">
                I utilize data from public transport providers like Rapid Penang, Rapid Kuantan, and Perak 
                Transit, ensuring that route changes and schedule updates are accurately reflected in the app.
                My work helps improve the app's functionality, making public transport more accessible and easier 
                to navigate for users across Malaysia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {AREAS.map((area, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-lg text-center">
                    <h3 className="font-medium text-white mb-3">{area.city}</h3>
                    <p className="text-gray-400">{area.provider}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Personal Experience</h2>
              <p className="text-gray-300 mb-6">
                My contributions to Moovit are backed by extensive personal experience as a frequent user 
                of public transportation in Malaysia. For about 7 years, I've relied on Rapid Penang buses 
                and KTM trains for my daily commute. This firsthand experience helps me understand the 
                challenges and needs of public transport users, making my contributions to Moovit more 
                meaningful and practical.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=2000"
                alt="Public transport experience"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Try Moovit Today</h2>
              <p className="text-gray-300 mb-6">
                Ready to make your public transport journey easier? Download Moovit now and experience 
                hassle-free navigation across Malaysia's public transport network.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="https://apps.apple.com/us/app/moovit-transit-map-tracker/id498477945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on App Store"
                    className="h-12"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.tranzmate&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <p className="mb-4">Need help getting started? Download our quick guide:</p>
                <a
                  href="https://alancopywritingservices.s3.ap-southeast-1.amazonaws.com/Previous+Works+by+Alan+Copywriting+Services/By+Topics/Public+Transportation/Start+Taking+Public+Transport+with+Moovit+-+Free+PDF-min.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Download Guide
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Ask Me About Rapid Penang</h2>
              <p className="text-gray-300 mb-6">
                I've developed a chatbot that can answer questions about Rapid Penang based on my personal 
                experience using the Rapid Penang bus.
              </p>
              <p className="text-gray-300 mb-6">
                You can ask about:
              </p>
              <ul className="text-gray-300 list-none pl-6 mb-6">
                <li>• General information about Rapid Penang bus network 🚍</li>
                <li>• Tips for using the bus system 🚶🏻</li>
                <li>• Basic route information 🗺</li>
              </ul>
              <p className="text-gray-300 mb-6">
                NOTE: For real-time information like bus arrivals, locations, and specific route recommendations, 
                please use the Moovit app instead (just press the Back button below to download).
              </p>
              <div className="mt-6">
                <a
                  href="https://pgbusapp.mynameisaliff.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Try the Chatbot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
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