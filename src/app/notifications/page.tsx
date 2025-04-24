import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Bell } from 'lucide-react';
import BottomNav from '@/components/BottomNav/BottomNav';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Lead',
    message: 'John Doe was added to your leads.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'Task Reminder',
    message: 'Follow up with Sarah Johnson is due today.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    title: 'Lead Status Updated',
    message: 'Mike Wilson moved to "Qualified" stage.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    title: 'Meeting Scheduled',
    message: 'Demo meeting with ABC Corp scheduled for tomorrow.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    title: 'New Comment',
    message: 'Emily Clark commented on your task.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    title: 'Lead Assignment',
    message: 'You have been assigned to Robert Brown.',
    time: '4 days ago',
    read: true,
  },
  {
    id: '7',
    title: 'Task Completed',
    message: 'Lead qualification task for XYZ Inc has been completed.',
    time: '1 week ago',
    read: true,
  },
  {
    id: '8',
    title: 'Lead Contact Updated',
    message: 'Phone number updated for Maria Garcia.',
    time: '1 week ago',
    read: true,
  }
];

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter(notification => !notification.read).length;
  
  return (
    <div className="pt-16 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <header className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-background border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
        
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Mark all as read
        </button>
      </header>
      
      {/* Notifications Count */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="font-medium">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              Filter
            </button>
          </div>
        </div>
        
        {/* Today Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Today</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {mockNotifications
              .filter(notification => notification.time.includes('hours ago') || notification.time === 'Today')
              .map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    !notification.read ? 'border-l-4 border-blue-500 dark:border-blue-400 pl-3' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-2 flex justify-end">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                        <Check size={12} className="mr-1" />
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        
        {/* This Week Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">This Week</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {mockNotifications
              .filter(notification => 
                notification.time === 'Yesterday' || 
                notification.time.includes('days ago')
              )
              .map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    !notification.read ? 'border-l-4 border-blue-500 dark:border-blue-400 pl-3' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-2 flex justify-end">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                        <Check size={12} className="mr-1" />
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        
        {/* Earlier Section */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Earlier</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {mockNotifications
              .filter(notification => 
                notification.time.includes('week') || 
                notification.time.includes('month')
              )
              .map(notification => (
                <div 
                  key={notification.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 