import React from 'react';
import { LeadCard } from '@/components/LeadCard/LeadCard';

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
}

interface RecentLeadsProps {
  leads?: Lead[];
}

const RecentLeads: React.FC<RecentLeadsProps> = ({
  leads = [
    {
      id: "1",
      name: "John Smith",
      company: "Acme Inc.",
      email: "john.smith@acme.com",
      phone: "(555) 123-4567",
      status: "qualified"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "XYZ Corp",
      email: "sarah.j@xyz.com",
      phone: "(555) 987-6543",
      status: "contacted"
    }
  ]
}) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Leads</h2>
      <div className="space-y-4">
        {leads.map(lead => (
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
  );
};

export default RecentLeads; 