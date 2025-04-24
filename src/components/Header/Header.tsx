import React, { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import NotificationTray from './NotificationTray';

export const Header: React.FC = () => {
  const [notificationTrayOpen, setNotificationTrayOpen] = useState(false);

  const toggleNotificationTray = () => {
    setNotificationTrayOpen(!notificationTrayOpen);
  };

  const closeNotificationTray = () => {
    setNotificationTrayOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-background border-b border-gray-200 dark:border-gray-800 z-10">
      <Link href="/" className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400">LeadLink</Link>
      <div className="flex gap-2 relative">
        <div className="relative">
          <button 
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${notificationTrayOpen ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            onClick={toggleNotificationTray}
            aria-label="Toggle notifications"
          >
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </div>
        <NotificationTray isOpen={notificationTrayOpen} onClose={closeNotificationTray} />
        <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Settings size={20} />
        </Link>
      </div>
    </header>
  );
};

export default Header; 