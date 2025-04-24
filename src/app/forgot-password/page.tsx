"use client";

import React from 'react';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-blue-600 text-white rounded-xl mb-4">
            <KeyRound size={32} />
          </div>
          <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <form>
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
} 