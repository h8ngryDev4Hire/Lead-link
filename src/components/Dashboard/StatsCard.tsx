import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-blue-500 rounded-md p-3">
          <div className="h-6 w-6 text-white">{icon}</div>
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        {change && (
          <p
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              change.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            <span className="sr-only">{change.isPositive ? 'Increased' : 'Decreased'} by </span>
            {change.value}
          </p>
        )}
      </dd>
    </div>
  );
};

export default StatsCard; 