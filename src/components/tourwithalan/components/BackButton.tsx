import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex items-center"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </button>
  );
}
