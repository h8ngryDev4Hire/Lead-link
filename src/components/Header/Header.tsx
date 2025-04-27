"use client";

import React, { useState } from 'react';
import { Bell, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NotificationTray from './NotificationTray';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [notificationTrayOpen, setNotificationTrayOpen] = useState(false);

  const toggleNotificationTray = () => {
    setNotificationTrayOpen(!notificationTrayOpen);
  };

  const closeNotificationTray = () => {
    setNotificationTrayOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-black dark:bg-black backdrop-blur-sm border-b border-gray-800 dark:border-gray-700 z-20 shadow-sm">
      <div className="flex items-center">
        <Link 
          href="/app/dashboard" 
          className="relative z-10 hover:scale-105 transition-transform duration-200"
        >
          <span className="font-extrabold text-xl text-white dark:text-white flex items-center">
            {title || "LeadLink"}
            <Sparkles className="h-4 w-4 ml-1 text-yellow-400" />
          </span>
        </Link>
      </div>
      <div className="flex gap-3 relative">
        <div className="relative z-10">
          <button 
            type="button"
            className={`p-2 rounded-full transition-all duration-200 ${
              notificationTrayOpen 
                ? 'bg-blue-900/30 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400' 
                : 'hover:bg-gray-900 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400'
            }`}
            onClick={toggleNotificationTray}
            aria-label="Toggle notifications"
          >
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">3</span>
        </div>
        <NotificationTray isOpen={notificationTrayOpen} onClose={closeNotificationTray} />
        <Link 
          href="/app/settings" 
          className="relative z-10 p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all duration-200"
        >
          <Settings size={20} />
        </Link>
      </div>
    </header>
  );
};

export default Header; 