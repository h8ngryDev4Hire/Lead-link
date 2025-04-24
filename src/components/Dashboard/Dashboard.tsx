import React from 'react';
import StatsCard from './StatsCard';
import Card from '../common/Card';
import LeadCard from '../leads/LeadCard';

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="py-4">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Leads"
              value="128"
              change={{ value: "12%", isPositive: true }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <StatsCard
              title="Qualified Leads"
              value="64"
              change={{ value: "8%", isPositive: true }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
            <StatsCard
              title="Conversion Rate"
              value="24.6%"
              change={{ value: "1.2%", isPositive: false }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <StatsCard
              title="Revenue Pipeline"
              value="$142,500"
              change={{ value: "7%", isPositive: true }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Lead Pipeline */}
          <div className="mt-8">
            <Card title="Pipeline" subtitle="Lead distribution by stage">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Lead Pipeline
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      128 Leads
                    </span>
                  </div>
                </div>
                <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-full">
                  <div style={{ width: "20%" }} className="flex flex-col text-center text-white justify-center bg-gray-500 shadow-none whitespace-nowrap">
                    20%
                  </div>
                  <div style={{ width: "25%" }} className="flex flex-col text-center text-white justify-center bg-blue-500 shadow-none whitespace-nowrap">
                    25%
                  </div>
                  <div style={{ width: "18%" }} className="flex flex-col text-center text-white justify-center bg-green-500 shadow-none whitespace-nowrap">
                    18%
                  </div>
                  <div style={{ width: "15%" }} className="flex flex-col text-center text-white justify-center bg-purple-500 shadow-none whitespace-nowrap">
                    15%
                  </div>
                  <div style={{ width: "12%" }} className="flex flex-col text-center text-white justify-center bg-yellow-500 shadow-none whitespace-nowrap">
                    12%
                  </div>
                  <div style={{ width: "10%" }} className="flex flex-col text-center text-white justify-center bg-green-600 shadow-none whitespace-nowrap">
                    10%
                  </div>
                </div>
                <div className="flex text-xs font-semibold mt-2 justify-between">
                  <span>New</span>
                  <span>Contacted</span>
                  <span>Qualified</span>
                  <span>Proposal</span>
                  <span>Negotiation</span>
                  <span>Closed</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Leads & Activity */}
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Leads</h2>
              <div className="space-y-4">
                <LeadCard
                  name="John Smith"
                  company="Acme Inc."
                  email="john.smith@acme.com"
                  phone="(555) 123-4567"
                  status="qualified"
                  value={25000}
                  tags={["software", "enterprise"]}
                  lastContact="2 days ago"
                />
                <LeadCard
                  name="Sarah Johnson"
                  company="XYZ Corp"
                  email="sarah.j@xyz.com"
                  phone="(555) 987-6543"
                  status="contacted"
                  value={15000}
                  tags={["healthcare", "mid-market"]}
                  lastContact="5 days ago"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <Card>
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item} className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-500">U</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Activity {item}
                          </p>
                          <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </p>
                        </div>
                        <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                          {item} day{item !== 1 ? 's' : ''} ago
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}