"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ArrowLeft, Paperclip, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

export default function LeadsChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I can help you with managing your lead. What would you like to know about this lead?',
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'ai',
      text: 'You can ask about lead details, schedule follow-ups, or request suggestions for your next steps.',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  
  // Generate background particles for visual interest
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
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // UI-only: Simulate AI typing without actual functionality
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm just a UI demo at the moment. When implemented, I'll provide helpful information about your leads and suggest actions.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  
  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
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
        
        {/* Chat Header */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => router.back()} 
              className="flex items-center text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back to Leads</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full">
                  <Bot size={20} />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-black dark:text-white">Lead Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ask questions about your lead</p>
              </div>
            </div>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        
        {/* Main Chat Container */}
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
                    <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-2' 
                        : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 mr-2'
                    }`}>
                      {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div 
                      className={`p-4 rounded-2xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="block mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex max-w-[85%] md:max-w-[75%]">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 mr-2">
                      <Bot size={18} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 max-w-4xl mx-auto">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-black dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`p-3 rounded-xl ${
                  inputValue.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 