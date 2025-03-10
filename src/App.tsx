import React from 'react';
import ReactGA from 'react-ga4';
import { Linkedin, Download, ChevronDown, User, ScrollText, MapPin, Newspaper, Github } from 'lucide-react';
import { useTypewriter } from './hooks/useTypewriter';
import { Modal } from './components/Modal';
import { ChatWidget } from './components/ChatWidget';
import { TourModal } from './components/tourwithalan/TourModal';

const scrollToContent = () => {
  const element = document.getElementById('what-i-do');
  element?.scrollIntoView({ behavior: 'smooth' });
  // Track scroll event
  ReactGA.event({
    category: 'User Interaction',
    action: 'Scrolled to Content'
  });
};

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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Newspaper className="h-8 w-8 text-yellow-500" />,
                title: 'Content Writing/Copywriting',
                description: 'Doing content writing and digital marketing since mid-2019, specializing in various fields and industries you can imagine.'
              },
              {
                icon: <ScrollText className="h-8 w-8 text-yellow-500" />,
                title: 'Website User Experience',
                description: 'Creating intuitive and engaging web experiences that delight users and achieve business goals through thoughtful design and optimization.'
              },
              {
                icon: <MapPin className="h-8 w-8 text-yellow-500" />,
                title: 'Tourism',
                description: 'Sharing the stunning beauty and hidden gems of Malaysia through personalized experiences as a local. Plus interactive experience to make it more fun!'
              }
            ].map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
                <p className="text-gray-400 mb-4">{skill.description}</p>
                {index === 2 ? (
                  <button
                    onClick={() => {
                      setIsTourModalOpen(true);
                      ReactGA.event({
                        category: 'User Interaction',
                        action: 'Opened Tour Modal'
                      });
                    }}
                    className="inline-block px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Visiting Malaysia Soon? Try Me Out!
                  </button>
                ) : (
                  <a
                    href={
                      index === 0 ? 'https://alancopywritingservices.com' :
                      'https://works.alancopywritingservices.com/#userexperience'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      ReactGA.event({
                        category: 'External Link',
                        action: 'Click',
                        label: index === 0 ? 'Content Writing' : 'UX Case Study'
                      });
                    }}
                    className="inline-block px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {index === 0 ? 'Learn More' : 'View Case Study'}
                  </a>
                )}
              </div>
            ))}
          </div>
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
    </div>
  );
}

export default App;