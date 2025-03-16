import React from 'react';
import ReactGA from 'react-ga4';
import { Linkedin, Download, ChevronDown, User, ScrollText, MapPin, Newspaper, Github, Bot, Train, Wrench as Tool } from 'lucide-react';
import { useTypewriter } from './hooks/useTypewriter';
import { Modal } from './components/Modal';
import { ChatWidget } from './components/ChatWidget';
import { TourModal } from './components/tourwithalan/TourModal';
import { CarouselSection } from './components/CarouselSection';
import { TransformationModal } from './components/TransformationModal';
import { TransportModal } from './components/TransportModal';
import { DevToolsModal } from './components/DevToolsModal';
import { AIDevModal } from './components/AIDevModal';
import { UXCaseStudyModal } from './components/UXCaseStudyModal';

const scrollToContent = () => {
  const element = document.getElementById('what-i-do');
  element?.scrollIntoView({ behavior: 'smooth' });
  // Track scroll event
  ReactGA.event({
    category: 'User Interaction',
    action: 'Scrolled to Content'
  });
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  link?: string;
  action?: () => void;
}

function Card({ icon, title, description, actionText, link, action }: CardProps) {
  const commonButtonClasses = "self-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg text-sm font-medium transition-colors mt-6 inline-flex items-center";

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/70 transition-colors">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-auto">{description}</p>
      {link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={commonButtonClasses}
          onClick={() => {
            ReactGA.event({
              category: 'External Link',
              action: 'Click',
              label: title
            });
          }}
        >
          {actionText}
        </a>
      ) : action ? (
        <button 
          onClick={action}
          className={commonButtonClasses}
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}

function App() {
  React.useEffect(() => {
    // Initialize GA4 with your measurement ID
    ReactGA.initialize('your_ga4_id_here', {
      gaOptions: {
        cookieFlags: 'SameSite=None;Secure'
      }
    });

    // Send initial pageview
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: document.title
    });

    // Send a test event
    ReactGA.event({
      category: "Testing",
      action: "GA4 Test Event",
      label: new Date().toISOString()
    });

    console.log('GA4: Sent test event');
  }, []);

  const [isTransformationModalOpen, setIsTransformationModalOpen] = React.useState(false);
  const [isUXCaseStudyOpen, setIsUXCaseStudyOpen] = React.useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = React.useState(false);
  const [isDevToolsModalOpen, setIsDevToolsModalOpen] = React.useState(false);
  const [isAIDevModalOpen, setIsAIDevModalOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = React.useState(false);

  const descriptions = [
    'Tour guide-in-training 🙋🏻',
    'AI enthusiast 🤖',
    'User experience 🎨',
    'Web application development 💻',
    'Content writing 📝',
    'Digital marketing 📈',
    'FinTech enthusiast 📱💳',
    'Public transport user 🚌🚉'
  ];

  const currentText = useTypewriter({
    texts: descriptions,
    typingSpeed: 50,
    deletingSpeed: 25,
    delayBetweenTexts: 2000
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-yellow-900 to-yellow-950">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Introduction */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              Selamat Datang! 👋
            </h1>
            <div className="space-y-4">
              <div className="text-xl text-gray-300 space-y-4">
                <p>
                  I'm Aliff, a <span className="text-amber-400 font-semibold">multi-faceted</span><br />
                  <span className="text-amber-400 font-semibold">digital experience creator</span>
                </p>
                
                <p>
                  📍 George Town, Penang, Malaysia 🇲🇾<br />
                  <span className="text-sm text-amber-400">(Yes, where the amazing food is! 🍜)</span>
                </p>
                
                <p>
                  
                </p>
                <div className="h-8"> {/* Fixed height container to prevent layout shift */}
                  <p className="min-h-[1.5em]">{currentText}</p>
                </div>
                <div className="flex lg:justify-start justify-center">
                <a
                  onClick={scrollToContent}
                  href="#what-i-do"
                  className="inline-flex items-center px-6 py-3 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg font-medium transition-colors"
                >
                  Scroll Below
                  <ChevronDown className="ml-2 h-4 w-4" />
                </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200&h=675"
              alt="Workspace"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
            <div className="absolute inset-0 bg-yellow-900/10 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="what-i-do" className="py-20 bg-black/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What I Do</h2>
          <CarouselSection>
            {[
              {
                icon: <Newspaper className="h-8 w-8 text-yellow-500" />,
                title: 'Content Writing/Copywriting',
                description: 'Evolving from traditional content writing to leveraging AI-powered solutions for better content creation and management.',
                action: () => {
                  setIsTransformationModalOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened Transformation Modal'
                  });
                },
                actionText: 'What Has Changed Now?'
              },
              {
                icon: <ScrollText className="h-8 w-8 text-yellow-500" />,
                title: 'Website User Experience',
                description: 'Creating intuitive and engaging web experiences that delight users with thoughtful design and optimization.',
                action: () => {
                  setIsUXCaseStudyOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened UX Case Study Modal'
                  });
                },
                actionText: 'View Case Study'
              },
              {
                icon: <MapPin className="h-8 w-8 text-yellow-500" />,
                title: 'Tourism',
                description: 'Sharing the stunning beauty and hidden gems of Malaysia through personalized experiences as a local. Plus interactive experience to make it more fun!',
                action: () => {
                  setIsTourModalOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened Tour Modal',
                    label: 'Tourism Card'
                  });
                },
                actionText: 'Visiting Malaysia Soon? Try Me Out!'
              },
              {
                icon: <Bot className="h-8 w-8 text-yellow-500" />,
                title: 'AI-Powered Web & App Development',
                description: 'Building intelligent web applications and tools that make technology more accessible and useful for everyone.',
                action: () => {
                  setIsAIDevModalOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened AI Dev Modal'
                  });
                },
                actionText: 'View Projects'
              },
              {
                icon: <Train className="h-8 w-8 text-yellow-500" />,
                title: 'Public Transport',
                description: 'Advocating for better public transportation and creating tools to improve the commuter experience in Malaysia.',
                action: () => {
                  setIsTransportModalOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened Transport Modal'
                  });
                },
                actionText: 'Learn More'
              },
              {
                icon: <Tool className="h-8 w-8 text-yellow-500" />,
                title: 'Developer Tools for Non-Devs',
                description: 'Creating and open-sourcing user-friendly developer tools and web applications, making them accessible to everyone.',
                action: () => {
                  setIsDevToolsModalOpen(true);
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Opened Dev Tools Modal'
                  });
                },
                actionText: 'Explore Tools'
              }
            ].map((skill, index) => (
              <Card
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                actionText={skill.actionText}
                action={skill.action}
              />
            ))}
          </CarouselSection>
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setIsModalOpen(true);
                ReactGA.event({
                  category: 'User Interaction',
                  action: 'Opened CV Modal'
                });
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://hithere.mynameisaliff.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: 'External Link',
                  action: 'Click',
                  label: 'Ramblings'
                });
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <Newspaper className="mr-2 h-5 w-5" />
              Ramblings
            </a>
            <a
              href="https://www.linkedin.com/in/hithereiamaliff"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: 'External Link',
                  action: 'Click',
                  label: 'LinkedIn'
                });
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/hithereiamaliff"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: 'External Link',
                  action: 'Click',
                  label: 'GitHub'
                });
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsChatOpen(true);
                ReactGA.event({
                  category: 'User Interaction',
                  action: 'Opened Chat Widget'
                });
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <User className="mr-2 h-5 w-5" />
              Ask Aliff
            </a>
          </div>
        </div>
      </div>
      
      {/* ConvertKit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        ReactGA.event({
          category: 'User Interaction',
          action: 'Closed CV Modal'
        });
      }}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Download My CV</h3>
          <p className="text-gray-600">Please fill in your details to receive my CV</p>
        </div>
        <div id="convertkit-form-container" className="min-h-[300px]" />
      </Modal>
      <ChatWidget isOpen={isChatOpen} onOpenChange={(isOpen) => {
        setIsChatOpen(isOpen);
        if (!isOpen) {
          ReactGA.event({
            category: 'User Interaction',
            action: 'Closed Chat Widget'
          });
        }
      }} />
      <TourModal isOpen={isTourModalOpen} onClose={() => {
        setIsTourModalOpen(false);
        ReactGA.event({
          category: 'User Interaction',
          action: 'Closed Tour Modal'
        });
      }} />
      <TransformationModal 
        isOpen={isTransformationModalOpen}
        onClose={() => setIsTransformationModalOpen(false)}
      />
      <UXCaseStudyModal
        isOpen={isUXCaseStudyOpen}
        onClose={() => setIsUXCaseStudyOpen(false)}
      />
      <TransportModal
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
      />
      <AIDevModal
        isOpen={isAIDevModalOpen}
        onClose={() => setIsAIDevModalOpen(false)}
        onOpenChat={() => {
          setIsChatOpen(true);
          setIsAIDevModalOpen(false);
        }}
      />
      <DevToolsModal
        isOpen={isDevToolsModalOpen}
        onClose={() => setIsDevToolsModalOpen(false)}
      />
    </div>
  );
}

export default App;