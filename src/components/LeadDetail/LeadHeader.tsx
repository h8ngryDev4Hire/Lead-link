import React from 'react';

interface LeadHeaderProps {
  name: string;
  position: string;
  company: string;
  status: string;
}

const LeadHeader: React.FC<LeadHeaderProps> = ({
  name,
  position,
  company,
  status
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-semibold mr-4">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{position} at {company}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default LeadHeader; 