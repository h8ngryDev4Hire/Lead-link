"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquareText } from 'lucide-react';
import Header from '@/components/Header/Header';
import ContactBottomNav from '@/components/BottomNav/ContactBottomNav';

export default function ContactChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Handle back button click to go to leads page
  const handleBack = () => {
    router.push('/app/leads');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 pt-16 pb-16 px-4 max-w-screen-lg mx-auto w-full">
        <div className="max-w-2xl mx-auto">
          {/* Header with back button */}
          <div className="mb-6 flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">AI Chat</h1>
          </div>

          {/* Content placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquareText size={48} className="text-blue-600 dark:text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">AI Chat Coming Soon</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                This section will allow you to use AI to generate personalized messages and emails for this contact.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <ContactBottomNav contactId={params.id} />
    </div>
  );
} 