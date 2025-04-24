"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { LeadCard } from '@/components/LeadCard/LeadCard';
import { AlignJustify, Plus } from 'lucide-react';

export default function LeadsPage() {
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
    },
    {
      id: "5",
      name: "David Wilson",
      company: "Wilson Consulting",
      email: "david@wilsonconsulting.com",
      phone: "(555) 234-5678",
      status: "closed" as const
    },
    {
      id: "6",
      name: "Jessica Lee",
      company: "Creative Solutions",
      email: "jessica@creativesolutions.com",
      status: "new" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Leads</h1>
          <div className="flex gap-2">
            <button className="text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-2 px-3 rounded-lg">
              <AlignJustify size={16} className="mr-1 inline-block" />
              Filter
            </button>
            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg">
              <Plus size={16} className="mr-1 inline-block" />
              Add Lead
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4">
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full p-2 bg-transparent border-0 focus:outline-none"
          />
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
    </Layout>
  );
} 