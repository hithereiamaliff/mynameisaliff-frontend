import React from 'react';
import { Helmet } from 'react-helmet';
import { DonationPage } from '../../components/Donation';
import ReactGA from 'react-ga4';

export const DonatePage: React.FC = () => {
  React.useEffect(() => {
    // Track page view
    ReactGA.event({
      action: 'donate_page_view',
      category: 'page_view',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Support Aliff's Work | Donate</title>
        <meta name="description" content="Support Aliff's work through various payment methods including DuitNow Transfer, DuitNow QR, and Touch 'n Go eWallet. Your contribution helps continue creating content and improving this website." />
        <meta name="keywords" content="donate, support, DuitNow, Touch n Go, eWallet, Malaysian payment, contribution" />
        <link rel="canonical" href="https://mynameisaliff.com/donate" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mynameisaliff.com/donate" />
        <meta property="og:title" content="Support Aliff's Work | Donate" />
        <meta property="og:description" content="Support Aliff's work through various payment methods including DuitNow Transfer, DuitNow QR, and Touch 'n Go eWallet." />
        <meta property="og:image" content="https://mynameisaliff.com/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mynameisaliff.com/donate" />
        <meta property="twitter:title" content="Support Aliff's Work | Donate" />
        <meta property="twitter:description" content="Support Aliff's work through various payment methods including DuitNow Transfer, DuitNow QR, and Touch 'n Go eWallet." />
        <meta property="twitter:image" content="https://mynameisaliff.com/images/og-image.jpg" />
        
        {/* Structured Data / Schema.org for Donation Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Support Aliff's Work | Donate",
            "description": "Support Aliff's work through various payment methods including DuitNow Transfer, DuitNow QR, and Touch 'n Go eWallet.",
            "url": "https://mynameisaliff.com/donate",
            "mainEntity": {
              "@type": "DonateAction",
              "name": "Donate to Support Aliff's Work",
              "description": "Your contribution helps continue creating content and improving this website.",
              "potentialAction": {
                "@type": "DonateAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://mynameisaliff.com/donate"
                }
              }
            }
          })}
        </script>
      </Helmet>
      
      <DonationPage />
    </>
  );
};

export default DonatePage;
