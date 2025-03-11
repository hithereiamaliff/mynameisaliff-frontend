import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ExternalLink, Link } from 'lucide-react';
import { getChatResponse } from '../lib/openai';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE = {
  text: "Selamat datang! I'm Aliff's virtual assistant. You can chat with me in any language you prefer, and I'll reply in the same language you use (powered by AI). How can I help you today?",
  isUser: false,
  timestamp: new Date()
};

interface ChatWidgetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const processMessageContent = (content: string) => {
  const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(<ReactMarkdown key={`md-${match.index}`}>{content.slice(lastIndex, match.index)}</ReactMarkdown>);
    }
    
    // Add the button component and URL display
    parts.push(
      <div key={match.index} className="flex flex-col">
        <UrlButton href={match[2]}>Click Here</UrlButton>
        <div className="flex items-center gap-1 mt-1">
          <Link className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500 break-all">{match[2]}</span>
        </div>
      </div>
    );
    
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(<ReactMarkdown key="md-end">{content.slice(lastIndex)}</ReactMarkdown>);
  }

  return parts;
};

// Update the UrlButton component to handle both inline links and URL buttons
const UrlButton = ({ url, href, children }: { url?: string; href?: string; children?: React.ReactNode }) => (
  <a
    href={url || href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 mt-2 px-3 py-1.5 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition-colors w-fit"
  >
    <ExternalLink className="h-4 w-4" />
    {children || "Click Here"}
  </a>
);

export function ChatWidget({ isOpen, onOpenChange }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Update viewport height when window resizes or orientation changes
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Initial update
    updateViewportHeight();

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Prevent body scrolling when chat is open on mobile
      if (window.innerWidth < 640) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setIsLoading(true);
    try {
      // Pass the entire message history including the new message
      const response = await getChatResponse([...messages, userMessage]);
      
      const botResponse: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setIsLoading(false);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        text: "I'm currently unable to respond. Please make sure the OpenAI API key is properly configured.",
        isUser: false,
        timestamp: new Date()
      };
      setIsLoading(false);
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-6 right-6 p-4 bg-yellow-700 text-white rounded-full shadow-lg hover:bg-yellow-800 transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-auto sm:max-w-sm sm:bottom-6 sm:right-6 z-50">
      <div 
        className="flex flex-col bg-white sm:rounded-lg shadow-xl sm:h-[calc(100vh-6rem)] sm:max-h-[600px]"
        style={{ height: window.innerWidth < 640 ? `${viewportHeight}px` : undefined }}
      >
        {/* Header - Fixed position */}
        <div className="sticky top-0 p-4 bg-yellow-700 text-white sm:rounded-t-lg flex justify-between items-center z-10">
          <h3 className="font-medium">Chat with Aliff's Assistant 🇲🇾</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-yellow-800 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-1 space-y-2 min-h-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-yellow-700 text-white prose-invert ml-auto rounded-tr-none'
                    : 'bg-gray-100 text-gray-900 mr-auto rounded-tl-none'
                } prose max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                prose-headings:font-semibold prose-headings:text-inherit
                prose-p:my-0.5 prose-p:leading-relaxed
                prose-strong:font-semibold prose-strong:text-inherit
                prose-em:text-inherit
                prose-code:bg-opacity-20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                prose-pre:bg-opacity-20 prose-pre:p-3 prose-pre:rounded-lg
                prose-ul:my-0.5 prose-ul:list-disc prose-ul:pl-4
                prose-ol:my-0.5 prose-ol:list-decimal prose-ol:pl-4
                prose-li:my-0 prose-li:leading-normal`}
              >
                <div className="whitespace-pre-wrap">
                  {processMessageContent(message.text)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-1.5">
              <div className="bg-gray-100 rounded-lg px-2.5 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-2 px-3 pb-3 sm:rounded-b-lg">
          <div className="flex gap-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-2 min-h-[44px] max-h-32"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="p-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}