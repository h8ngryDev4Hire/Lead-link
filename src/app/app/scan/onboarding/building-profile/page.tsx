"use client";

import React, { useState, useEffect } from 'react';
import { Search, Database, ChartBar, CheckCircle, Building, Sparkles, Zap, Bot, Loader2, CreditCard, Globe, Users, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Animation steps that describe what the AI is doing when processing a business card
const searchSteps = [
  { message: "Scanning business card...", icon: CreditCard, color: "blue" },
  { message: "Extracting contact information...", icon: Users, color: "indigo" },
  { message: "Searching web for company details...", icon: Globe, color: "purple" },
  { message: "Finding social media profiles...", icon: Search, color: "violet" },
  { message: "Enriching lead data...", icon: Database, color: "teal" },
  { message: "Building the contact profile...", icon: UserPlus, color: "green" }
];

export default function BusinessCardScanningPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 8,
      color: ['blue', 'indigo', 'purple', 'teal', 'green'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);

    // Simulate the progress of building the profile
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          
          // Navigate to verify step after a short delay
          setTimeout(() => {
            router.push('/app/scan/onboarding/ai-chat');
          }, 1500);
          
          return 100;
        }
        
        // Update the current step index based on progress
        const newProgress = prevProgress + 0.7;
        const stepIndex = Math.min(
          Math.floor((newProgress / 100) * searchSteps.length),
          searchSteps.length - 1
        );
        
        if (stepIndex !== currentStepIndex) {
          setCurrentStepIndex(stepIndex);
        }
        
        return newProgress;
      });
    }, 100); // Speed of progress animation

    return () => clearInterval(timer);
  }, [currentStepIndex, router]);

  const CurrentIcon = searchSteps[currentStepIndex].icon;
  const currentColor = searchSteps[currentStepIndex].color;
  
  const getColorClass = (color: string, isBackground = false, opacity = 100) => {
    const prefix = isBackground ? 'bg' : 'text';
    const opacitySuffix = opacity < 100 ? `-${opacity}` : '';
    return `${prefix}-${color}-${isBackground ? 500 + opacitySuffix : 600} dark:${prefix}-${color}-${isBackground ? 400 + opacitySuffix : 400}`;
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-4 overflow-hidden">
      {/* Moving background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${getColorClass(particle.color, true, 20)}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float-particle ${5 + Math.random() * 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Background elements for visual interest */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-2xl z-10">
        {/* Fixed Header */}
        <div className="fixed top-0 z-10 w-full left-0 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full">
                    <CreditCard size={20} />
                  </div>
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-black dark:text-white">Processing Business Card</h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Creating lead profile from business card</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white dark:border-gray-700 relative overflow-hidden mt-16">
          {/* Animation Container */}
          <div className="text-center mb-8 relative">
            <div className="relative inline-flex">
              <div className={`absolute inset-0 ${getColorClass(currentColor, true, 20)} blur-xl rounded-full animate-pulse`}></div>
              <div className={`relative p-5 ${getColorClass(currentColor, true, 30)} rounded-full inline-flex items-center justify-center`}>
                <CurrentIcon size={48} className={`${getColorClass(currentColor)}`} />
                <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mt-6 text-black dark:text-white">
              Processing Business Card
            </h1>
            <p className={`text-lg ${getColorClass(currentColor)} mt-2 transition-colors duration-500`}>
              {searchSteps[currentStepIndex].message}
            </p>
          </div>

          {/* Progress visualization */}
          <div className="mb-8">
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-semibold inline-block py-1 px-3 rounded-full text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                    Processing
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold inline-block text-blue-600 dark:text-blue-300">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div 
                  style={{ width: `${progress}%` }} 
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="relative">
            {searchSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrentStep = index === currentStepIndex;
              const stepColor = step.color;
              
              return (
                <div key={index} className={`flex mb-5 last:mb-0 ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-500`}>
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center 
                    ${isActive ? `${getColorClass(stepColor, true)} text-white` : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'} 
                    ${isCurrentStep ? 'ring-4 ring-opacity-50 ' + getColorClass(stepColor, true, 30) : ''}`}>
                    <StepIcon size={isActive ? 18 : 16} className={isCurrentStep ? 'animate-pulse' : ''} />
                    {isCurrentStep && (
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-white">
                        <span className={`absolute inset-0 ${getColorClass(stepColor, true)} rounded-full animate-ping`}></span>
                      </span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`text-sm font-medium ${
                      isActive 
                        ? getColorClass(stepColor) 
                        : 'text-gray-500 dark:text-gray-400'
                    } transition-colors duration-300`}>
                      {step.message}
                    </p>
                    {index < searchSteps.length - 1 && (
                      <div className={`mt-2 ml-1 border-l-2 h-5 
                        ${isActive ? getColorClass(stepColor, true, 50) : 'border-gray-200 dark:border-gray-700'} 
                        transition-colors duration-300`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Status Message */}
          <div className="text-center mt-8">
            <div className={`inline-flex items-center ${isComplete ? 'text-green-600 dark:text-green-400' : 'text-black dark:text-white'} text-sm transition-colors duration-300`}>
              {isComplete ? (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Lead profile created! Moving to review...
                </>
              ) : (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Please wait while we process this business card and build the contact profile...
                </>
              )}
            </div>
          </div>
          
          {/* AI Assistants working effect */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 dark:bg-blue-800/30 flex items-center justify-center animate-pulse animation-delay-1000">
              <Bot size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-600/20 dark:bg-purple-800/30 flex items-center justify-center animate-pulse animation-delay-2000">
              <Zap size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 dark:bg-indigo-800/30 flex items-center justify-center animate-pulse animation-delay-3000">
              <Bot size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional style for animation */}
      <style jsx global>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        @keyframes animate-blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: animate-blob 7s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
} 