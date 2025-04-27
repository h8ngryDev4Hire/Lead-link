import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NotificationHeaderProps {
  onMarkAllAsRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ onMarkAllAsRead }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-background border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="flex items-center gap-4">
        <Link 
          href="/app/dashboard"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>
      
      <button 
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        onClick={onMarkAllAsRead}
      >
        Mark all as read
      </button>
    </header>
  );
};

export default NotificationHeader; 