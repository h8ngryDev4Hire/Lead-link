"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { LeadCard } from '@/components/LeadCard/LeadCard';
import Link from 'next/link';
import { LayoutGrid, TrendingUp, Sparkles } from 'lucide-react';

export default function Dashboard() {
  // Static sample data, no logic
  const sampleLeads = [
    {
      id: "1",
      name: "John Smith",
      company: "Acme Corporation",
      email: "john@acme.com",
      phone: "(555) 123-4567",
      status: "new" as const
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "Tech Innovations",
      email: "sarah@techinnovations.com",
      phone: "(555) 987-6543",
      status: "contacted" as const
    },
    {
      id: "3",
      name: "Michael Brown",
      company: "Global Services",
      email: "michael@globalservices.com",
      status: "qualified" as const
    },
    {
      id: "4",
      name: "Emily Parker",
      company: "Parker & Associates",
      phone: "(555) 456-7890",
      status: "proposal" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-black dark:text-white flex items-center">
            <LayoutGrid className="mr-2 h-7 w-7 text-blue-500" />
            Dashboard
            <Sparkles className="ml-2 h-5 w-5 text-yellow-400 animate-pulse" />
          </h1>
        </div>
        
        {/* Recent Leads Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black dark:text-white">Recent Leads</h2>
            <Link 
              href="/app/leads" 
              className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sampleLeads.map((lead) => (
              <LeadCard 
                key={lead.id}
                id={lead.id}
                name={lead.name}
                company={lead.company}
                email={lead.email}
                phone={lead.phone}
                status={lead.status}
              />
            ))}
          </div>
        </div>

        {/* Activity Summary Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-black dark:text-white flex items-center mb-5">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
            Activity Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-white dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-medium mb-1 text-black dark:text-white">New Leads</h3>
              <p className="text-3xl font-bold text-black dark:text-white">15</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This week</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-white dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-medium mb-1 text-black dark:text-white">Follow-ups</h3>
              <p className="text-3xl font-bold text-black dark:text-white">7</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due today</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-white dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-medium mb-1 text-black dark:text-white">Closed</h3>
              <p className="text-3xl font-bold text-black dark:text-white">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-white dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-medium mb-1 text-black dark:text-white">Conversion</h3>
              <p className="text-3xl font-bold text-black dark:text-white">24%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 