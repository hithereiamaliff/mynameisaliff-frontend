import ReactGA from 'react-ga4';

// Event tracking interface
interface TrackEventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  transport?: 'beacon' | 'xhr' | 'image';
}

// Initialize GA with the measurement ID from the memory
// Using G-R37HQB2SJ7 as mentioned in the memory
export const initGA = () => {
  ReactGA.initialize('G-R37HQB2SJ7');
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track events
export const trackEvent = ({ 
  action, 
  category, 
  label, 
  value, 
  nonInteraction, 
  transport 
}: TrackEventProps) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
    nonInteraction,
    transport
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, label: string = 'outbound') => {
  trackEvent({
    action: 'click',
    category: 'outbound',
    label: `${label}: ${url}`,
  });
};

// Track modal interactions
export const trackModalInteraction = (modalName: string, action: 'open' | 'close' | 'interact') => {
  trackEvent({
    action,
    category: 'modal',
    label: modalName,
  });
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackOutboundLink,
  trackModalInteraction
};

