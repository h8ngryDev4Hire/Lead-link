"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Create router event listeners
    let fadeOutId: NodeJS.Timeout;

    const handleStartLoading = () => {
      // Clear any pending fade out
      clearTimeout(fadeOutId);
      setIsLoading(true);
      setIsVisible(true);
    };

    const handleStopLoading = () => {
      // Start fade out animation
      setIsVisible(false);
      
      // Then completely remove the element after transition completes
      fadeOutId = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Match transition duration
    };

    // For Next.js App Router, we need to track URL changes instead
    // of router events which aren't exposed directly
    
    // Start/stop loading based on URL changes
    handleStopLoading();

    return () => {
      clearTimeout(fadeOutId);
    };
  }, [pathname, searchParams]); // This will trigger when the URL changes

  // Second effect to simulate router events through pathname/search changes
  useEffect(() => {
    if (isLoading) return; // Skip if we're already loading
    
    // Briefly show loading bar on initial page load
    const initialLoadTimeout = setTimeout(() => {
      setIsLoading(true);
      setIsVisible(true);
      
      // Then hide it after a short delay
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Match transition duration
      }, 500);
      
      return () => {
        clearTimeout(hideTimeout);
      };
    }, 100);
    
    return () => clearTimeout(initialLoadTimeout);
  }, []);

  // Adding click listener to trigger loading state when a link is clicked
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a');
      
      if (linkElement && 
          linkElement.href && 
          !linkElement.target && 
          !linkElement.download && 
          linkElement.origin === window.location.origin) {
        // Clear any pending fade out
        setIsLoading(true);
        setIsVisible(true);
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 h-1 bg-transparent overflow-hidden transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="h-full bg-blue-600 animate-progress"
        style={{ 
          width: '100%',
          transformOrigin: 'left'
        }}
      />
    </div>
  );
} 