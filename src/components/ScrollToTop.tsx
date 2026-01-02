'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-50
            p-4 rounded-full
            bg-gradient-to-r from-purple-500 to-blue-500
            hover:from-purple-600 hover:to-blue-600
            text-white shadow-glass-lg
            transition-all duration-300
            hover:scale-110 active:scale-95
            border border-purple-400/30 hover:border-purple-300/50
            backdrop-blur-sm
            group
            animate-slide-up
            touch-manipulation
          "
          aria-label="Scroll to top"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-full" />
          
          <ArrowUp className="relative z-10 w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}

