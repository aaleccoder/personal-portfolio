'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 100px instead of 300px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="default"
        className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-accent hover:bg-accent/90"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </Button>
    </div>
  );
}
