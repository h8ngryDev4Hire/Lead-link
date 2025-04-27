import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationCountProps {
  unreadCount: number;
  onFilter: () => void;
}

const NotificationCount: React.FC<NotificationCountProps> = ({ 
  unreadCount, 
  onFilter 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Bell size={18} className="text-blue-600 dark:text-blue-400" />
        <span className="font-medium">
          {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button 
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default NotificationCount; 