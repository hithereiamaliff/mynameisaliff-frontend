import React from 'react';

interface TransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  direction: 'left' | 'right';
}

export function Transition({ children, isActive, direction }: TransitionProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isActive
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${
              direction === 'left'
                ? '-translate-x-full'
                : 'translate-x-full'
            }`
      }`}
    >
      {children}
    </div>
  );
} 