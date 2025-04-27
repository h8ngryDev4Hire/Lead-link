import React from 'react';
import StatsGrid from './StatsGrid';
import LeadPipeline from './LeadPipeline';
import RecentLeads from './RecentLeads';
import ActivityList from './ActivityList';

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="py-4">
          {/* Stats */}
          <StatsGrid />

          {/* Lead Pipeline */}
          <LeadPipeline />

          {/* Recent Leads & Activity */}
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentLeads />
            <ActivityList />
          </div>
        </div>
      </div>
    </div>
  );
}