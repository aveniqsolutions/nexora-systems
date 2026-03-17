import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nexora-cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('nexora-cookie-consent', 'accepted');
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem('nexora-cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t border-border p-4 md:p-6" data-testid="cookie-consent">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground leading-relaxed">
            We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.{' '}
            <a href="/privacy" className="text-primary hover:underline" data-testid="cookie-privacy-link">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={declineCookies}
            className="px-6 h-10 text-sm font-medium text-muted hover:text-foreground transition-colors"
            data-testid="cookie-decline-btn"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 h-10 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95"
            data-testid="cookie-accept-btn"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;