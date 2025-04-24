"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { PenSquare, Building, Globe, FileText, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  // Mock business data (in a real app, this would come from an API or context)
  const businessData = {
    name: "Coastal Breeze Cafe",
    description: "A beachside cafe offering fresh, locally-sourced breakfast and lunch items with an emphasis on sustainable practices. The cafe uses eco-friendly packaging and partners with local farmers to reduce carbon footprint while providing high-quality dining experiences for tourists and locals alike.",
    urls: [
      "coastalbreezecafe.com",
      "instagram.com/coastalbreezecafe",
      "facebook.com/coastalbreezecafe"
    ]
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        {/* Personal Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 text-2xl">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2">
                <PenSquare size={16} />
              </button>
            </div>
            <h2 className="text-xl font-semibold">Jane Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">Sales Manager</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Personal Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value="Jane Doe"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value="jane.doe@example.com"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value="(555) 123-4567"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Business Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Building size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              Business Information
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={businessData.name}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business URLs
              </label>
              {businessData.urls.map((url, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Globe size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                  <a 
                    href={`https://${url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {url}
                  </a>
                </div>
              ))}
            </div>
            
            <div>
              <div className="flex items-start mb-1">
                <FileText size={16} className="mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI-Generated Business Summary
                </label>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-gray-900/60 rounded-lg text-sm">
                {businessData.description}
              </div>
            </div>
            
            <Link 
              href="/onboarding" 
              className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              <RefreshCw size={16} className="mr-2" />
              Redo Business Onboarding
            </Link>
          </div>
        </div>
        
        {/* Log Out Button */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <button className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-2 px-4 rounded-lg text-red-600 dark:text-red-400">
            Log Out
          </button>
        </div>
      </div>
    </Layout>
  );
} 