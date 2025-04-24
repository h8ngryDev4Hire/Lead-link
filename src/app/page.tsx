"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { LeadCard } from '@/components/LeadCard/LeadCard';
import Link from 'next/link';

export default function Home() {
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
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Recent Leads</h1>
          <Link href="/leads" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
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

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-1">New Leads</h3>
              <p className="text-3xl font-bold text-blue-600">15</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This week</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-1">Follow-ups</h3>
              <p className="text-3xl font-bold text-yellow-600">7</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due today</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-1">Closed</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-1">Conversion</h3>
              <p className="text-3xl font-bold text-purple-600">24%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
