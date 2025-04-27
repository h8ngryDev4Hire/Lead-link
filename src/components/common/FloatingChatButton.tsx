import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Routes where the chat button should be hidden
const excludedPaths = [
  '/app/onboarding',
  '/app/chat', // Hide on the chat page itself
];

const FloatingChatButton: React.FC = () => {
  const pathname = usePathname();
  
  // Hide button if current route is in excluded paths
  const shouldHide = excludedPaths.some(path => pathname.startsWith(path));
  
  if (shouldHide) return null;
  
  return (
    <Link href="/app/chat">
      <div className="fixed right-4 bottom-20 z-20">
        <div className="relative inline-flex">
          <button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
            text-white rounded-full p-3 shadow-lg transform hover:scale-105 transition-all duration-300"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </button>
          
          {/* Optional notification dot */}
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </div>
      </div>
    </Link>
  );
};

export default FloatingChatButton; 