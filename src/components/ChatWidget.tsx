import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronDown, ExternalLink } from 'lucide-react';
import { getChatResponse } from '../lib/openai';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE = {
  text: "Selamat datang! 🇲🇾 I'm Aliff's virtual assistant. You can chat with me in any language you prefer, and I'll reply in the same language you use (powered by AI). How can I help you today?",
  isUser: false,
  timestamp: new Date()
};

interface ChatWidgetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Update the URL detection function with a more precise regex
const detectUrls = (text: string): string[] => {
  // This regex will match URLs but exclude common punctuation and special characters
  const urlRegex = /(https?:\/\/[^\s,;:!?()*\[\]{}]+)/g;
  // Get all URLs and remove duplicates using Set
  return [...new Set(text.match(urlRegex) || [])];
};

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
    
    // Add the button component
    parts.push(
      <UrlButton key={match.index} href={match[2]}>
        {match[1]}
      </UrlButton>
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
    className="inline-flex items-center justify-center gap-2 mt-2 px-3 py-1 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition-colors text-sm"
  >
    <ExternalLink className="h-4 w-4" />
    {children || "Click Here"}
  </a>
);

export function ChatWidget({ isOpen, onOpenChange }: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
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
      <div className="bg-white sm:rounded-lg shadow-xl flex flex-col h-[100vh] sm:h-auto sm:max-h-[600px]">
        {/* Header */}
        <div className="p-4 bg-yellow-700 text-white sm:rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">Chat with Aliff's Assistant 🇲🇾</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-yellow-800 rounded"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-yellow-800 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-full sm:min-h-[300px] sm:max-h-[400px]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-yellow-700 text-white prose-invert'
                        : 'bg-gray-100 text-gray-900'
                    } prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                    prose-headings:font-semibold prose-headings:text-inherit
                    prose-p:my-0.5 prose-p:leading-relaxed
                    prose-strong:font-semibold prose-strong:text-inherit
                    prose-em:text-inherit
                    prose-code:bg-opacity-20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                    prose-pre:bg-opacity-20 prose-pre:p-3 prose-pre:rounded-lg
                    prose-ul:my-0.5 prose-ul:list-disc prose-ul:pl-4
                    prose-ol:my-0.5 prose-ol:list-decimal prose-ol:pl-4
                    prose-li:my-0 prose-li:leading-normal`}
                  >
                    <div className="whitespace-pre-wrap">
                      {processMessageContent(message.text)}
                    </div>
                    {!message.isUser && detectUrls(message.text).map((url, urlIndex) => (
                      <div key={urlIndex} className="flex flex-col">
                        <span className="text-sm text-gray-500 break-all">{url}</span>
                        <UrlButton url={url} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-700 text-base"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}