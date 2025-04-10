import React from 'react';
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
  const handleDownload = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    
    // Track the event with Google Analytics
    ReactGA.event({
      action: trackingAction,
      category: trackingCategory,
    });
    
    try {
      console.log(`Attempting to download image: ${imageUrl}`);
      
      // Fetch the image as a blob
      const response = await fetch(imageUrl, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      
      // Convert the response to a blob
      const imageBlob = await response.blob();
      console.log(`Blob created, type: ${imageBlob.type}, size: ${imageBlob.size}`);
      
      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(imageBlob);
      
      // Create a temporary anchor element
      const downloadLink = document.createElement('a');
      
      // Set anchor properties
      downloadLink.href = blobUrl;
      
      // Determine file extension from content type or URL
      const contentType = response.headers.get('content-type');
      let extension = 'jpg'; // Default extension
      
      if (contentType) {
        // Extract extension from content type (e.g., 'image/png' -> 'png')
        const match = contentType.match(/image\/(\w+)/);
        if (match && match[1]) {
          extension = match[1];
        }
      } else if (imageUrl.includes('.')) {
        // Try to extract extension from URL
        const urlExtension = imageUrl.split('.').pop()?.toLowerCase();
        if (urlExtension && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(urlExtension)) {
          extension = urlExtension;
        }
      }
      
      // Set the download attribute with filename
      downloadLink.download = `${fileName}.${extension}`;
      downloadLink.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);
        console.log('Download process completed');
      }, 100);
    } catch (error) {
      console.error('Error downloading the image:', error);
      alert('Download failed. Please try again or save the image manually.');
    }
  };

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`cursor-pointer ${className}`}
      onClick={handleDownload}
      style={{ cursor: 'pointer' }}
      title="Click to download"
    />
  );
};
