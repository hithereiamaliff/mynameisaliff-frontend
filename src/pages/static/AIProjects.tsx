import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import ReactGA from 'react-ga4';

const TECH_STACKS = [
  {
    name: 'React & TypeScript',
    description: 'For building robust, type-safe user interfaces',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="h-8 w-8" alt="React logo" />
  },
  {
    name: 'Node.js',
    description: 'Powering backend solutions',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="h-8 w-8" alt="Node.js logo" />
  },
  {
    name: 'Railway',
    description: 'For backend deployment and hosting',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/railway/railway-original.svg" className="h-8 w-8" alt="Railway logo" />
  },
  {
    name: 'Supabase',
    description: 'For database hosting and management',
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" className="h-8 w-8" alt="Supabase logo" />
  }
];

export function AIProjectsPage({ setIsChatOpen }: { setIsChatOpen?: (open: boolean) => void }) {
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (setIsChatOpen) {
      setIsChatOpen(true);
    } else {
      navigate('/?chat=true');
    }
  };

  React.useEffect(() => {
    ReactGA.event({
      category: 'Page View',
      action: 'View AI Projects Page',
    });
  }, []);

  return (
    <>
      <SEO
        title="AI-Powered Development Projects"
        description="Explore my AI-enhanced web development projects, including chatbots, automation tools, and interactive experiences built with React, TypeScript, and OpenAI."
        keywords="AI development, chatbot, React, TypeScript, OpenAI, web development, Malaysia"
        path="/ai-projects"
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
            <h1>AI-Powered Web & App Development</h1>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Experience AI-Enhanced Development</h2>
              <p className="text-gray-300 mb-6">
                This website showcases the power of AI-assisted development, creating an intuitive and 
                engaging user experience. The integration of AI helps streamline development processes 
                while maintaining high quality and performance standards.
              </p>
              <img 
                src="https://images.unsplash.com/photo-XXXXXXXXXXXX-21780ecad995?auto=format&fit=crop&q=80&w=2000"
                alt="AI development visualization"
                className="w-full rounded-lg my-8"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TECH_STACKS.map((tech) => (
                  <div
                    key={tech.name}
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
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Open Source</h2>
              <p className="text-gray-300 mb-6">
                The frontend codebase is open source and available on GitHub. Feel free to explore, learn, 
                or contribute to the project.
              </p>
              <div className="mt-6">
                <a
                  href="https://github.com/your-username/your-website-name-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  View on GitHub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI Assistant Integration</h2>
              <p className="text-gray-300 mb-6">
                Experience the power of AI assistance through our integrated chatbot. The chatbot can answer 
                questions about my experience, skills, and provide helpful information about my services.
              </p>
              <img 
                src="https://images.unsplash.com/photo-XXXXXXXXXXXX-6c087fecd65a?auto=format&fit=crop&q=80&w=2000"
                alt="AI assistant concept"
                className="w-full rounded-lg mb-8"
              />
              <div className="mt-6">
                <button
                  onClick={handleChatClick}
                  className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
                >
                  Try the AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Rapid Penang Bus Chatbot</h2>
              <p className="text-gray-300 mb-6">
                A specialized chatbot developed for Rapid Penang bus information. It helps users navigate 
                the public transport system by providing route information and travel tips based on personal 
                experience.
              </p>
              <img 
                src="https://images.unsplash.com/photo-XXXXXXXXXXXX-e93688616381?auto=format&fit=crop&q=80&w=2000"
                alt="Bus chatbot interface"
                className="w-full rounded-lg mb-8"
              />
              <div className="mt-6">
                <a
                  href="https://pgbusapp.your-website-name.co.uk"
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
