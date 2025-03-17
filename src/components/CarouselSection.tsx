import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactGA from 'react-ga4';

interface CarouselProps {
  children: React.ReactNode[];
  autoScrollInterval?: number;
}

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 3;
  return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
};

export function CarouselSection({ children, autoScrollInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = React.Children.count(children);
  const maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

  const currentItems = React.Children.toArray(children).slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentIndex(0); // Reset to first page on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerPage]);

  useEffect(() => {
    if (isAutoScrollPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(current => 
        current >= maxIndex ? 0 : current + 1
      );
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [maxIndex, autoScrollInterval, isAutoScrollPaused]);

  const scroll = (direction: 'prev' | 'next') => {
    setCurrentIndex(current => {
      if (direction === 'prev') {
        return current <= 0 ? maxIndex : current - 1;
      } else {
        return current >= maxIndex ? 0 : current + 1;
      }
    });
    setIsAutoScrollPaused(true);
    setTimeout(() => setIsAutoScrollPaused(false), autoScrollInterval);

    // Track carousel navigation
    ReactGA.event({
      category: 'User Interaction',
      action: 'Carousel Navigation',
      label: direction === 'prev' ? 'Previous' : 'Next'
    });
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsAutoScrollPaused(true)}
      onMouseLeave={() => setIsAutoScrollPaused(false)}
    >
      <div 
        ref={containerRef}
        className="overflow-hidden px-4 md:px-8 lg:px-12"
      >
        <div className="flex flex-wrap -mx-4">
          {currentItems.map((child, index) => ( 
            <div 
              key={`${currentIndex}-${index}`}
              className={`w-full px-4 mb-8 opacity-0 animate-fade-in ${
                itemsPerPage === 3 ? 'lg:w-1/3' :
                itemsPerPage === 2 ? 'md:w-1/2' :
                'w-full'
              }`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="h-full flex">
                <div className="flex flex-col items-center text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/70 transition-colors w-full">
                  {child}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <button
            onClick={() => scroll('prev')}
            className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-yellow-700/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-yellow-800 transition-all duration-300 shadow-lg backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => scroll('next')}
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-yellow-700/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-yellow-800 transition-all duration-300 shadow-lg backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoScrollPaused(true);
                  setTimeout(() => setIsAutoScrollPaused(false), autoScrollInterval);
                  
                  // Track dot navigation
                  ReactGA.event({
                    category: 'User Interaction',
                    action: 'Carousel Dot Navigation',
                    label: `Page ${index + 1}`
                  });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-500 w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}