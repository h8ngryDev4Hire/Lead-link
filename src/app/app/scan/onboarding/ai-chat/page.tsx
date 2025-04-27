"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Send, CheckCircle, User, ArrowRight, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

const mockBusinessCardData = {
  name: "John Smith",
  title: "VP of Sales",
  company: "Acme Corporation",
  email: "john.smith@acmecorp.com",
  phone: "+1 (555) 123-4567",
  website: "www.acmecorp.com",
  address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
  social: {
    linkedin: "linkedin.com/in/johnsmith",
    twitter: "@johnsmith"
  }
};

export default function AIChatAdjustmentsPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Initialize chat with AI greeting
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'ai',
        text: `I've analyzed the business card and extracted the following information:
        
Name: ${mockBusinessCardData.name}
Title: ${mockBusinessCardData.title}
Company: ${mockBusinessCardData.company}
Email: ${mockBusinessCardData.email}
Phone: ${mockBusinessCardData.phone}
Website: ${mockBusinessCardData.website}
Address: ${mockBusinessCardData.address}
LinkedIn: ${mockBusinessCardData.social.linkedin}
Twitter: ${mockBusinessCardData.social.twitter}

Would you like to make any corrections or add additional information?`,
        timestamp: new Date(),
      },
    ];
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let aiResponse: Message;
      
      if (inputValue.toLowerCase().includes('looks good') || 
          inputValue.toLowerCase().includes('correct') ||
          inputValue.toLowerCase().includes('complete')) {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "Great! I've saved this contact to your leads. You can now access it from your leads dashboard or add follow-up tasks.",
          timestamp: new Date(),
        };
        setIsProcessed(true);
      } else {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "I've updated the contact information based on your input. Is there anything else you'd like to correct or add?",
          timestamp: new Date(),
        };
      }
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleComplete = () => {
    router.push('/app/leads/123');
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
      <div className="fixed top-0 z-10 w-full backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full">
                  <Bot size={20} />
                </div>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-black dark:text-white">Review Lead Information</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Verify the extracted business card data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 pt-24 pb-6">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 ml-3 mr-0' 
                      : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
                  }`}>
                    {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white dark:bg-blue-700 rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-line">{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-200 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                    <Bot size={20} />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          {isProcessed ? (
            <div className="p-4 bg-white dark:bg-gray-800 flex flex-col border-t border-gray-200 dark:border-gray-700">
              <div className="w-full p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 mb-4 flex items-center">
                <CheckCircle className="text-green-500 dark:text-green-400 mr-3" size={20} />
                <span className="text-green-800 dark:text-green-300">
                  Lead successfully created from business card
                </span>
              </div>
              <button
                onClick={handleComplete}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Lead <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your corrections or say 'Looks good'..."
                  className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-200"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`ml-2 p-1 rounded-full ${
                    inputValue.trim() && !isTyping
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          )}
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
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
} 