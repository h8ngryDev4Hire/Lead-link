"use client";

import React from 'react';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/Auth/AuthHeader';
import SignupForm from '@/components/Auth/SignupForm';

export default function SignupPage() {
  const router = useRouter();

  const handleSuccessfulSignup = () => {
    router.push('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Heading */}
        <AuthHeader 
          icon={<UserPlus size={32} />}
          title="Create an Account"
          subtitle="Join LeadLink to manage your leads efficiently"
        />

        {/* Signup Form */}
        <SignupForm onSuccess={handleSuccessfulSignup} />

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 