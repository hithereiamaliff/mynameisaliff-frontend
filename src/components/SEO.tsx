import { useEffect } from 'react';
import ReactGA from 'react-ga4';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: string;
  path: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://your-website-name.s3.ap-southeast-1.amazonaws.com/I\'m+YourName+-+Cartoon+Profile+Photo+(1)+(1).png',
  type = 'article',
  path
}: SEOProps) {
  useEffect(() => {
    // Update meta tags
    document.title = `${title} | YourName - Digital Experience Creator`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
    
    // Update Open Graph tags
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', type);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://your-website-name.co.uk${path}`);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    
    // Update Twitter tags
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', image);

    // Send pageview to GA4
    ReactGA.send({
      hitType: "pageview",
      page: path,
      title: title
    });
  }, [title, description, keywords, image, type, path]);

  return null;
}

