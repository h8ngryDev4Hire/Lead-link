"use client";

import React, { useState } from 'react';
import { Building, Globe, Send, FileText, Plus, X, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessUrls: [''],
    businessName: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUrlChange = (index: number, value: string) => {
    setFormData(prev => {
      const updatedUrls = [...prev.businessUrls];
      updatedUrls[index] = value;
      return {
        ...prev,
        businessUrls: updatedUrls
      };
    });
  };

  const addUrlField = () => {
    if (formData.businessUrls.length < 5) {
      setFormData(prev => ({
        ...prev,
        businessUrls: [...prev.businessUrls, '']
      }));
    }
  };

  const removeUrlField = (index: number) => {
    if (formData.businessUrls.length > 1) {
      setFormData(prev => {
        const updatedUrls = [...prev.businessUrls];
        updatedUrls.splice(index, 1);
        return {
          ...prev,
          businessUrls: updatedUrls
        };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the profile building page
    router.push('/onboarding/building-profile');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 px-4 py-5">
      {/* Background elements for visual interest */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-2xl z-10 mt-10">
        {/* Icon positioned with full visibility */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-block">
            <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 absolute -right-4 -top-4 opacity-30"></div>
            <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative">
              <Building size={42} className="text-white" />
            </div>
            <Sparkles className="absolute -right-3 -top-3 h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Setup Your Business
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto">
              Let's get your business profile set up to help you connect with potential leads.
            </p>
          </div>

          {/* Onboarding Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                  1
                </div>
                <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold text-sm">
                  2
                </div>
                <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold text-sm">
                  3
                </div>
              </div>
            </div>
            
            {/* Business URLs Field */}
            <div className="space-y-2">
              <label 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Business URLs <span className="text-xs text-gray-500">(website, social profiles - up to 5)</span>
              </label>
              
              {formData.businessUrls.map((url, index) => (
                <div key={index} className="relative mb-3 group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe size={18} className="text-blue-500 dark:text-blue-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    required={index === 0}
                    className="pl-10 pr-10 py-3 w-full border-0 bg-blue-50 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm transition-all duration-200 group-hover:shadow-md"
                    placeholder="https://yourbusiness.com or social media URL"
                  />
                  {formData.businessUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUrlField(index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition-colors duration-200"
                      aria-label="Remove URL"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              
              {formData.businessUrls.length < 5 && (
                <button
                  type="button"
                  onClick={addUrlField}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium mt-2 group transition-all duration-200"
                >
                  <span className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                    <Plus size={14} className="text-blue-600 dark:text-blue-400" />
                  </span>
                  Add another URL
                </button>
              )}
            </div>

            {/* Business Name Field */}
            <div>
              <label 
                htmlFor="businessName" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-blue-500 dark:text-blue-400" />
                </div>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-3 py-3 w-full border-0 bg-blue-50 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  placeholder="Your Business Name"
                />
              </div>
            </div>

            {/* Business Description Field */}
            <div>
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Business Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText size={18} className="text-blue-500 dark:text-blue-400" />
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="pl-10 pr-3 py-3 w-full border-0 bg-blue-50 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 resize-none"
                  placeholder="Briefly describe what your business does..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center items-center py-3 px-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden"
              >
                <span className="absolute right-full w-12 h-24 -mr-6 transition-all duration-1000 transform rotate-12 bg-white opacity-10 group-hover:translate-x-12 ease-out"></span>
                <Send size={18} className="mr-2" />
                <span>Continue</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Info below form */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          This information helps us tailor the experience to your business needs
        </p>
      </div>
      
      {/* Additional style for animation */}
      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
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