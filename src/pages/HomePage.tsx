import React from 'react';
import { Linkedin, Download, ChevronDown, User, ScrollText, MapPin, Newspaper, Bot, Train, Wrench as Tool } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { CarouselSection } from '../components/CarouselSection';
import { TransformationModal } from '../components/TransformationModal';
import { TransportModal } from '../components/TransportModal';
import { DevToolsModal } from '../components/DevToolsModal';
import { AIDevModal } from '../components/AIDevModal';
import { UXCaseStudyModal } from '../components/UXCaseStudyModal';

interface HomePageProps {
  setIsModalOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  setIsBlogPreviewOpen: (open: boolean) => void;
}

const scrollToContent = () => {
  const element = document.getElementById('what-i-do');
  element?.scrollIntoView({ behavior: 'smooth' });
};

export function HomePage({ setIsModalOpen, setIsChatOpen, setIsBlogPreviewOpen }: HomePageProps) {
  const [isTransformationModalOpen, setIsTransformationModalOpen] = React.useState(false);
  const [isUXCaseStudyOpen, setIsUXCaseStudyOpen] = React.useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = React.useState(false);
  const [isDevToolsModalOpen, setIsDevToolsModalOpen] = React.useState(false);
  const [isAIDevModalOpen, setIsAIDevModalOpen] = React.useState(false);
  const descriptions = [
    'Tour guide-in-training 🙋🏻',
    'Digital marketing 📈',
    'FinTech enthusiast 📱💳',
    'Public transport user 🚌🚉'
  ];

  const typewriterResult = useTypewriter({
    texts: descriptions,
    typingSpeed: 50,
    deletingSpeed: 25,
    delayBetweenTexts: 2000
  });
  
  // Extract the text property from the TypewriterResult object
  const currentText = typewriterResult.text;

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Introduction */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              Hi There! 👋
            </h1>
            <div className="space-y-4">
              <div className="text-xl text-gray-300 space-y-4">
                <p>
                  I'm YourName, currently based in<br />
                  George Town, Penang 🇲🇾
                </p>
                <div className="h-8">
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
              src="https://images.unsplash.com/photo-XXXXXXXXXXXX-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200&h=675"
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
                action: () => setIsTransformationModalOpen(true),
                actionText: 'What Has Changed Now?'
              },
              {
                icon: <ScrollText className="h-8 w-8 text-yellow-500" />,
                title: 'Website User Experience',
                description: 'Creating intuitive and engaging web experiences that delight users with thoughtful design and optimization.',
                action: () => setIsUXCaseStudyOpen(true),
                actionText: 'View Case Study'
              },
              {
                icon: <MapPin className="h-8 w-8 text-yellow-500" />,
                title: 'Tourism',
                description: 'Sharing the stunning beauty and hidden gems of Malaysia through personalized experiences as a local. Plus interactive experience to make it more fun!',
                link: 'https://tourwithalan.com',
                actionText: 'Visiting Malaysia Soon? Try Me Out!'
              },
              {
                icon: <Bot className="h-8 w-8 text-yellow-500" />,
                title: 'AI-Powered Web & App Development',
                description: 'Building intelligent web applications and tools that make technology more accessible and useful for everyone.',
                action: () => setIsAIDevModalOpen(true),
                actionText: 'View Projects'
              },
              {
                icon: <Train className="h-8 w-8 text-yellow-500" />,
                title: 'Public Transport',
                description: 'Advocating for better public transportation and creating tools to improve the commuter experience in Malaysia.',
                action: () => setIsTransportModalOpen(true),
                actionText: 'Learn More'
              },
              {
                icon: <Tool className="h-8 w-8 text-yellow-500" />,
                title: 'Developer Tools for Non-Devs',
                description: 'Creating and open-sourcing user-friendly developer tools and web applications, making them accessible to everyone.',
                action: () => setIsDevToolsModalOpen(true),
                actionText: 'Explore Tools'
              }
            ].map((skill, index) => (
              <div
                key={index}
                className="flex flex-col h-full"
              >
                <div className="flex justify-center mb-6">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
                <p className="text-gray-400 mb-auto">{skill.description}</p>
                {skill.action ? (
                  <button
                    onClick={skill.action}
                    className="self-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg text-sm font-medium transition-colors mt-6 inline-flex items-center"
                  >
                    {skill.actionText}
                  </button>
                ) : (
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-center px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg text-sm font-medium transition-colors mt-6 inline-flex items-center"
                  >
                    {skill.actionText}
                  </a>
                )}
              </div>
            ))}
          </CarouselSection>
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
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

      {/* Contact Section */}
      <div id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBlogPreviewOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <Newspaper className="mr-2 h-5 w-5" />
              Blog
            </button>
            <a
              href="https://www.linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsChatOpen(true);
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <User className="mr-2 h-5 w-5" />
              Ask YourName
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
