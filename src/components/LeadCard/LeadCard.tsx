import React from 'react';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface LeadCardProps {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  id?: string;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  name,
  company,
  email,
  phone,
  status,
  id = '1'
}) => {
  const statusColors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    proposal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <Link href={`/leads/${id}`} className="block cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        {company && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {company}
          </div>
        )}
        
        <div className="mt-3 grid grid-cols-1 gap-2">
          {email && (
            <div className="flex items-center text-sm">
              <Mail size={16} className="mr-2 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">{email}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-sm">
              <Phone size={16} className="mr-2 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">{phone}</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="flex mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button 
          className="text-xs mr-2 p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit size={16} className="mr-1 inline-block" />
          Edit
        </button>
        <button 
          className="text-xs mr-2 p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 size={16} className="mr-1 inline-block" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default LeadCard; 