"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Building, Globe, FileText, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import ContactBottomNav from '@/components/BottomNav/ContactBottomNav';

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Mock data for the contact - in a real app this would come from an API call or context
  const contactData = {
    id: params.id,
    name: "John Smith",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    status: "qualified",
    business: {
      name: "Acme Corporation",
      position: "Marketing Director",
      urls: [
        "acmecorp.com",
        "linkedin.com/company/acme-corporation",
        "twitter.com/acmecorp"
      ],
      description: "Acme Corporation is a leading provider of innovative solutions for businesses of all sizes. Their cutting-edge products and services help companies streamline operations, increase efficiency, and drive growth. With a strong focus on customer satisfaction and technological advancement, Acme has established itself as a trusted partner in the industry."
    }
  };

  // Handle back button click to go to leads page
  const handleBack = () => {
    router.push('/leads');
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
            <h1 className="text-2xl font-bold">Contact Details</h1>
          </div>

          {/* Contact Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-semibold mr-4">
                  {contactData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{contactData.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{contactData.business.position} at {contactData.business.name}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
                {contactData.status.charAt(0).toUpperCase() + contactData.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                <Edit size={16} className="mr-1" />
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              {contactData.email && (
                <div className="flex items-center">
                  <Mail size={18} className="mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {contactData.email}
                    </a>
                  </div>
                </div>
              )}
              
              {contactData.phone && (
                <div className="flex items-center">
                  <Phone size={18} className="mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                    <a href={`tel:${contactData.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {contactData.phone}
                    </a>
                  </div>
                </div>
              )}
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
                  Company
                </label>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {contactData.business.name}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business URLs
                </label>
                {contactData.business.urls.map((url, index) => (
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
                    Business Description
                  </label>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-gray-900/60 rounded-lg text-sm">
                  {contactData.business.description}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between">
              <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                <Edit size={16} className="mr-2" />
                Edit Contact
              </button>
              <button className="flex items-center justify-center border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 font-medium py-2 px-4 rounded-lg">
                <Trash2 size={16} className="mr-2" />
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <ContactBottomNav contactId={params.id} />
    </div>
  );
} 