import React from 'react';
import { X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function Layout({ children, onClose }: LayoutProps) {
  return (
    <div 
      className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-x-hidden px-4 py-6 md:px-8 md:py-8"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-XXXXXXXXXXXX-75c6fc197f07?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="relative max-w-2xl mx-auto w-full">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 text-gray-300 hover:text-white transition-colors
                     bg-black/30 hover:bg-black/50 rounded-full p-2 z-50"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
