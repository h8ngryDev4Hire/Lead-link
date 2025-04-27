"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { Camera, Upload, Image } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  
  const handleScan = () => {
    // Simulate taking a photo and navigating to the processing page
    router.push('/app/scan/onboarding/building-profile');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full py-8 space-y-8">
        <div className="bg-blue-600 text-white rounded-full p-6 mb-4">
          <Camera size={48} />
        </div>
        
        <h2 className="text-2xl font-bold text-center">Scan Business Card</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-xs">
          Take a photo of a business card to automatically add a new lead
        </p>
        
        <div className="w-full max-w-xs grid grid-cols-1 gap-4 mt-8">
          <button 
            onClick={handleScan}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg"
          >
            <Camera size={20} />
            Take Photo
          </button>
          
          <button 
            onClick={handleScan}
            className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-lg"
          >
            <Upload size={20} />
            Upload Image
          </button>
          
          <button 
            onClick={handleScan}
            className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-lg"
          >
            <Image size={20} />
            Choose from Gallery
          </button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center max-w-xs">
          Your scanned business cards are securely processed and the data is only stored locally on your device
        </div>
      </div>
    </Layout>
  );
} 