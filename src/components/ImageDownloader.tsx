import React from 'react';
// ReactGA import removed as it's no longer used

interface ImageDownloaderProps {
  imageUrl: string;
  className?: string;
  alt?: string;
  // Removed unused props
}

/**
 * Simple component to display an image
 * The download functionality is now handled in the parent component
 */
export const ImageDownloader: React.FC<ImageDownloaderProps> = ({
  imageUrl,
  className = '',
  alt = 'Downloadable image'
}) => {
  return (
    <div className="inline-block">
      <img
        src={imageUrl}
        alt={alt}
        className={className}
      />
    </div>
  );
};

