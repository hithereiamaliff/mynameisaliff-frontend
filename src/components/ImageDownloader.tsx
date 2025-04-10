import React, { useState } from 'react';
import ReactGA from 'react-ga4';

interface ImageDownloaderProps {
  imageUrl: string;
  fileName?: string;
  className?: string;
  alt?: string;
  trackingCategory?: string;
  trackingAction?: string;
}

export const ImageDownloader: React.FC<ImageDownloaderProps> = ({
  imageUrl,
  fileName = 'downloaded-image',
  className = '',
  alt = 'Downloadable image',
  trackingCategory = 'download',
  trackingAction = 'download_image'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (event: React.MouseEvent<HTMLImageElement>) => {
    // Prevent default behavior (opening in new tab)
    event.preventDefault();
    event.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Track the event with Google Analytics
    ReactGA.event({
      action: trackingAction,
      category: trackingCategory,
    });
    
    try {
      // For S3 URLs, we'll use a different approach
      // Create a hidden anchor element
      const downloadLink = document.createElement('a');
      
      // Set the href to the image URL
      downloadLink.href = imageUrl;
      
      // Extract file extension from URL
      let extension = 'jpg';
      const urlParts = imageUrl.split('.');
      if (urlParts.length > 1) {
        const possibleExt = urlParts.pop()?.toLowerCase();
        if (possibleExt && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(possibleExt)) {
          extension = possibleExt;
        }
      }
      
      // Critical: Set download attribute
      downloadLink.setAttribute('download', `${fileName}.${extension}`);
      
      // Critical: Set these attributes for cross-origin content
      downloadLink.setAttribute('target', '_blank');
      downloadLink.setAttribute('rel', 'noopener noreferrer');
      
      // Hide the element
      downloadLink.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Small delay before removing
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        setIsLoading(false);
      }, 100);
      
    } catch (error) {
      console.error('Error downloading the image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-block relative">
      <img
        src={imageUrl}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-70' : ''}`}
        onClick={handleDownload}
        style={{ cursor: 'pointer' }}
        title="Click to download"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm">Downloading...</span>
        </div>
      )}
    </div>
  );
};
