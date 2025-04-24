"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, Zap, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();
  const [opacity, setOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Placeholder user name (in a real app, this would come from authentication/context)
  const userName = "Business Owner"; 
  const businessName = "Coastal Breeze Cafe"; // This would be dynamic in a real app
  
  useEffect(() => {
    // Simulate data loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Start fade-in animation for the welcome text after loading
      const timer1 = setTimeout(() => {
        setOpacity(1);
      }, 300);
      
      // Show the content after the welcome text has faded in
      const timer2 = setTimeout(() => {
        setContentVisible(true);
      }, 1200);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, 800);
    
    return () => clearTimeout(loadingTimer);
  }, []);
  
  const handleProceed = () => {
    // Navigate to the main app entry point
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-4">
        <div className="relative">
          <Sparkles className="h-16 w-16 text-blue-500 animate-pulse absolute -top-6 -right-6 opacity-60" />
          <div className="h-20 w-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 animate-pulse">
          Preparing your dashboard...
        </p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-4">
      {/* Background elements for visual interest */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-3xl w-full z-10">
        <div className="relative">
          {/* Top sparkle */}
          <div className="absolute -top-10 right-1/4">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Welcome Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white dark:border-gray-700">
            {/* Welcome Text (Fade-in) */}
            <div 
              className="text-center transition-opacity duration-1000 ease-in-out"
              style={{ opacity }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-1">
                Welcome, {userName}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                to <span className="font-semibold text-blue-600 dark:text-blue-400">LeadLink</span>
              </p>
            </div>
            
            {/* Content (Appears after welcome text) */}
            <div className={`transition-all duration-1000 ease-in-out transform ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mt-10 mb-10 space-y-8">
                <div className="flex justify-center relative">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-5 rounded-full">
                    <Sparkles className="h-12 w-12 text-yellow-500" />
                  </div>
                  {/* Side sparkles */}
                  <Sparkles className="h-6 w-6 text-yellow-400 absolute -right-2 top-0 animate-pulse animation-delay-1000" />
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -left-3 bottom-0 animate-pulse animation-delay-2000" />
                </div>
                
                <div className="text-center">
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 px-4 py-1 rounded-full text-sm font-medium text-green-800 dark:text-green-400 mb-3">
                    Success
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {businessName} Profile Created!
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                    Get ready to supercharge your lead generation and business growth with LeadLink's powerful AI-driven tools.
                  </p>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-center mb-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                        <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-2">Smart Automation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Automate your outreach and follow-ups with AI</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-900 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative">
                    <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </div>
                    <div className="flex justify-center mb-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                        <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-2">Lead Insights</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Gain valuable insights into your potential customers</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-center mb-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                        <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-2">Growth Tools</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Everything you need to scale your business</p>
                  </div>
                </div>
                
                {/* Stats Preview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Your journey begins with:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Ready templates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Week free trial</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">AI assistance</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Proceed Button */}
              <div className="text-center">
                <button
                  onClick={handleProceed}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full overflow-hidden shadow-lg transition-all duration-300 ease-out hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Take Me to the Dashboard
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                </button>
              </div>
              
              {/* Tagline */}
              <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                We're excited to help you grow your business!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional style for animation delay */}
      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
} 