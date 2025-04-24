"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, CheckCircle, ChevronRight, AlertTriangle, RefreshCw, X, LockIcon, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Sample business data (this would come from your actual data in a real app)
const sampleBusinessData = {
  name: "Coastal Breeze Cafe",
  description: "A beachside cafe offering fresh, locally-sourced breakfast and lunch items with an emphasis on sustainable practices.",
  website: "coastalbreezecafe.com",
  socialMedia: ["@coastalbreezecafe", "facebook.com/coastalbreezecafe"]
};

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isUltimatum?: boolean;
};

export default function VerifyProfilePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `I've created your business profile for ${sampleBusinessData.name}. Please ask me any questions to verify the information I've gathered.`,
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'ai',
      text: 'You can ask things like "What do you know about my business?", "What social media profiles did you find?", or anything else to check the accuracy of your profile.',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasShownUltimatum, setHasShownUltimatum] = useState(false);
  const [userQuestionCount, setUserQuestionCount] = useState(0);
  const [showStartOverConfirmation, setShowStartOverConfirmation] = useState(false);
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate background particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showStartOverConfirmation]);
  
  const generateResponse = (question: string): string => {
    // Sample responses based on question keywords
    // In a real app, this would query actual business data
    if (question.toLowerCase().includes('business') || question.toLowerCase().includes('what do you know')) {
      return `${sampleBusinessData.name} is ${sampleBusinessData.description}`;
    } else if (question.toLowerCase().includes('website')) {
      return `Your business website is ${sampleBusinessData.website}`;
    } else if (question.toLowerCase().includes('social') || question.toLowerCase().includes('profiles')) {
      return `I found these social media profiles: ${sampleBusinessData.socialMedia.join(', ')}`;
    } else if (question.toLowerCase().includes('finish') || question.toLowerCase().includes('complete') || question.toLowerCase().includes('done')) {
      return 'Great! Your business profile setup is now complete. You can always update your information later.';
    } else {
      return `Based on the information I gathered, ${sampleBusinessData.name} is a ${sampleBusinessData.description.split(' ').slice(0, 3).join(' ')}... Is there anything specific you'd like to know or correct?`;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isChatDisabled) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    // Increment the user question count
    const newUserQuestionCount = userQuestionCount + 1;
    setUserQuestionCount(newUserQuestionCount);
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Check if we should show the ultimatum after 5 user questions
      if (newUserQuestionCount === 5 && !hasShownUltimatum) {
        // Add ultimatum as an additional AI message after a short delay
        setTimeout(() => {
          const ultimatumMessage: Message = {
            id: (Date.now() + 2).toString(),
            sender: 'ai',
            text: "You've asked several questions about your business profile. Are you satisfied with the information or would you like to start over?",
            timestamp: new Date(),
            isUltimatum: true
          };
          
          setMessages(prev => [...prev, ultimatumMessage]);
          setHasShownUltimatum(true);
          setIsChatDisabled(true); // Disable chat after ultimatum
        }, 1000);
      }
      
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const handleFinish = () => {
    // Navigate to the welcome page
    router.push('/onboarding/welcome');
  };
  
  const handleStartOver = () => {
    // Show confirmation dialog instead of immediately navigating
    setShowStartOverConfirmation(true);
  };
  
  const confirmStartOver = () => {
    // Actually restart the onboarding process
    router.push('/onboarding');
  };
  
  const cancelStartOver = () => {
    // Hide the confirmation dialog
    setShowStartOverConfirmation(false);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      {/* Background elements for visual interest */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      {/* Moving background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-600/10 dark:bg-blue-400/10"
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
      
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Step Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold text-sm">
              1
            </div>
            <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold text-sm">
              2
            </div>
            <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
              3
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full">
                <Bot size={20} />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Verify Your Business Profile</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ask questions to ensure all information is accurate</p>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="group relative flex items-center space-x-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <span className="absolute right-full w-12 h-24 -mr-6 transition-all duration-1000 transform rotate-12 bg-white opacity-10 group-hover:translate-x-32 ease-out"></span>
            <CheckCircle size={16} />
            <span>Complete Verification</span>
          </button>
        </div>
      </div>
      
      {/* Chat Container */}
      <div className="flex-grow overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div ref={messagesContainerRef} className="flex-grow overflow-y-auto p-4 md:p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex max-w-[85%] md:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center relative ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-2' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 mr-2'
                  }`}>
                    {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                    {message.sender === 'ai' && Math.random() > 0.7 && (
                      <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  <div 
                    className={`p-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
                    } ${message.isUltimatum ? 'border-2 border-amber-400 dark:border-amber-500 shadow-md' : ''}`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* Ultimatum buttons inside chat message */}
                    {message.isUltimatum && (
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={handleFinish}
                          className="group relative flex items-center px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
                        >
                          <span className="absolute right-full w-12 h-24 -mr-6 transition-all duration-1000 transform rotate-12 bg-white opacity-10 group-hover:translate-x-32 ease-out"></span>
                          <CheckCircle size={12} className="mr-1" />
                          <span>Confirm & Proceed</span>
                        </button>
                        <button
                          onClick={handleStartOver}
                          className="flex items-center px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <RefreshCw size={12} className="mr-1" />
                          <span>Start Over</span>
                        </button>
                      </div>
                    )}
                    
                    <span className="text-xs opacity-70 mt-2 block text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex max-w-[75%] flex-row">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 mr-2">
                    <Bot size={18} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Start Over Confirmation */}
            {showStartOverConfirmation && (
              <div className="flex justify-center animate-fadeIn">
                <div className="max-w-[85%] md:max-w-[75%] bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/30 dark:to-amber-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">
                        Restart Confirmation
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Are you sure you want to start over? This will reset your onboarding progress.
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          type="button"
                          onClick={confirmStartOver}
                          className="group relative inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 overflow-hidden transition-all duration-200"
                        >
                          <span className="absolute right-full w-12 h-24 -mr-6 transition-all duration-1000 transform rotate-12 bg-white opacity-10 group-hover:translate-x-32 ease-out"></span>
                          Yes, Start Over
                        </button>
                        <button
                          type="button"
                          onClick={cancelStartOver}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto -mt-1 -mr-1 bg-transparent text-red-500 hover:text-red-700 rounded-md p-1.5 transition-colors duration-200"
                      onClick={cancelStartOver}
                    >
                      <span className="sr-only">Dismiss</span>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
          {isChatDisabled ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 flex items-center justify-center">
              <LockIcon className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2" />
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                Chat is disabled. Please confirm your business information or start over.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your business profile..."
                  className="flex-grow px-4 py-3 border-0 bg-blue-50 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                  disabled={isChatDisabled}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isChatDisabled}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span className="absolute right-full w-12 h-24 -mr-6 transition-all duration-1000 transform rotate-12 bg-white opacity-10 group-hover:translate-x-12 ease-out"></span>
                  <Send size={20} />
                </button>
              </form>
              
              {/* Suggested Questions */}
              <div className="mt-3 overflow-x-auto pb-2">
                <div className="flex space-x-2">
                  {[
                    "What do you know about my business?",
                    "What social media profiles did you find?",
                    "What's my website?",
                    "Is my business description accurate?"
                  ].map((question, i) => (
                    <button
                      key={i}
                      onClick={() => setInputValue(question)}
                      disabled={isChatDisabled}
                      className={`text-xs whitespace-nowrap px-3 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center transition-all duration-200 ${
                        isChatDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                      }`}
                    >
                      <span>{question}</span>
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Additional style for animation */}
      <style jsx global>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
          }
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 