import React from 'react';
import { RotateCcw } from 'lucide-react';

interface RestartButtonProps {
  onClick: () => void;
}

export function RestartButton({ onClick }: RestartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex items-center"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Restart
    </button>
  );
}
