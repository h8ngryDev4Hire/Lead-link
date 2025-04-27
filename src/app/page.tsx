"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">LeadLink</h1>
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-24">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-6">
              Effortlessly manage your leads from business cards
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Scan, organize, and convert more business cards into valuable customers with LeadLink's intuitive platform.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => router.push('/auth/signup')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
              >
                Get Started <ArrowRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => router.push('/auth/login')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log In
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              {/* Placeholder for image or illustration */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">
                  App Screenshot
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Scan Business Cards</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Instantly digitize business cards with our smart scanning technology.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Organize Leads</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Keep your leads organized and easily accessible in one place.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Follow-up Reminders</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Never miss an opportunity with automated follow-up reminders.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p>© {new Date().getFullYear()} LeadLink. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
