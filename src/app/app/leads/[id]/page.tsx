"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { Phone, Mail, Globe, MapPin, Briefcase, Clock, User, Calendar, Plus, Edit, MoreVertical, Star, Share, Trash, Building, Linkedin, Twitter } from 'lucide-react';

const mockLeadData = {
  id: '123',
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
  },
  notes: "Met at XYZ Conference, interested in our enterprise solution.",
  createdAt: new Date(),
  source: "Business Card Scan",
  isFavorite: false,
  lastActivity: "2 days ago",
  status: "New Lead",
  tags: ["Technology", "Enterprise", "Sales"],
  activityLog: [
    { type: "created", date: new Date(), description: "Lead created from business card scan" },
    { type: "note", date: new Date(Date.now() - 24 * 60 * 60 * 1000), description: "Added contact information" }
  ]
};

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const [lead, setLead] = useState(mockLeadData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch lead data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [leadId]);

  const toggleFavorite = () => {
    setLead(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pb-4">
        {/* Header / Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lead.name}</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <span className="mr-2">{lead.title}</span>
                <span>•</span>
                <span className="ml-2">{lead.company}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${lead.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
            >
              <Star size={20} fill={lead.isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              <Edit size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              <Share size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
              <Trash size={20} />
            </button>
          </div>
        </div>

        {/* Lead Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href={`mailto:${lead.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {lead.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <a href={`tel:${lead.phone}`} className="text-green-600 dark:text-green-400 hover:underline">
                    {lead.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                  <p className="text-gray-900 dark:text-white">{lead.company}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                  <a href={`https://${lead.website}`} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    {lead.website}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start md:col-span-2">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-gray-900 dark:text-white">{lead.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                  <a href={`https://${lead.social.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {lead.social.linkedin}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-3">
                  <Twitter className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Twitter</p>
                  <a href={`https://twitter.com/${lead.social.twitter.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                    {lead.social.twitter}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Status & Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Lead Status</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                    {lead.status}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Source</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
                      <Briefcase className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-gray-900 dark:text-white">{lead.source}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
                      <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {lead.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Activity</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
                      <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-gray-900 dark:text-white">{lead.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h2>
              <button className="p-1 rounded text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <Edit size={18} />
              </button>
            </div>
            <div className="prose max-w-none dark:prose-invert prose-p:text-gray-600 dark:prose-p:text-gray-300">
              <p>{lead.notes || "No notes added yet."}</p>
            </div>
            
            {/* Add a note textarea */}
            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <textarea 
                placeholder="Add a note..." 
                className="w-full p-3 bg-transparent text-gray-700 dark:text-gray-300 border-none focus:ring-0 resize-none rounded-t-lg"
                rows={3}
              ></textarea>
              <div className="flex justify-end p-3 border-t border-gray-200 dark:border-gray-700">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Activity</h2>
            
            <div className="space-y-4">
              {lead.activityLog.map((activity, index) => (
                <div key={index} className="relative pl-6 pb-5">
                  {/* Activity dot and line */}
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="absolute top-0 left-0 mt-1 -ml-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800"></div>
                  
                  {/* Activity content */}
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add activity button */}
            <button className="mt-2 w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 text-sm">
              <Plus size={16} /> 
              Add Activity
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 