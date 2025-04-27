import React from 'react';
import { Mail, Phone, Edit, Trash2, MessageCircle } from 'lucide-react';
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
    new: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500 dark:text-blue-400'
    },
    contacted: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-500 dark:text-yellow-400'
    },
    qualified: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-500 dark:text-green-400'
    },
    proposal: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-200',
      icon: 'text-purple-500 dark:text-purple-400'
    },
    closed: {
      bg: 'bg-gray-100 dark:bg-gray-900/30',
      text: 'text-gray-800 dark:text-gray-200',
      icon: 'text-gray-500 dark:text-gray-400'
    },
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-white dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group">
      <Link href={`/app/leads/${id}`} className="block cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[status].bg} ${statusColors[status].text}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        {company && (
          <div className="text-sm text-black dark:text-white mb-2">
            {company}
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-1 gap-3">
          {email && (
            <div className="flex items-center text-sm">
              <Mail size={16} className={`mr-2 ${statusColors[status].icon}`} />
              <span className="text-black dark:text-white">{email}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-sm">
              <Phone size={16} className={`mr-2 ${statusColors[status].icon}`} />
              <span className="text-black dark:text-white">{phone}</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="flex mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <Link 
          href={`/app/leads/chat`}
          className="text-xs mr-3 p-1.5 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle size={16} className="mr-1 inline-block" />
          Chat
        </Link>
        <button 
          className="text-xs mr-3 p-1.5 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit size={16} className="mr-1 inline-block" />
          Edit
        </button>
        <button 
          className="text-xs mr-3 p-1.5 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
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