"use client";

import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav/BottomNav';
import NotificationHeader from '@/components/Notifications/NotificationHeader';
import NotificationCount from '@/components/Notifications/NotificationCount';
import NotificationSection from '@/components/Notifications/NotificationSection';
import { Notification } from '@/components/Notifications/NotificationItem';

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
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleFilter = () => {
    // Filter functionality would go here
    console.log('Filter notifications');
  };
  
  // Get today's notifications
  const todayNotifications = notifications.filter(notification => 
    notification.time.includes('hours ago') || notification.time === 'Today'
  );
  
  // Get this week's notifications
  const thisWeekNotifications = notifications.filter(notification => 
    notification.time === 'Yesterday' || 
    notification.time.includes('days ago')
  );
  
  // Get earlier notifications
  const earlierNotifications = notifications.filter(notification => 
    notification.time.includes('week') || 
    notification.time.includes('month')
  );
  
  return (
    <div className="pt-16 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <NotificationHeader onMarkAllAsRead={handleMarkAllAsRead} />
      
      {/* Notifications Content */}
      <div className="px-4 py-6">
        <NotificationCount unreadCount={unreadCount} onFilter={handleFilter} />
        
        {/* Notification Sections */}
        <NotificationSection 
          title="Today" 
          notifications={todayNotifications} 
          onMarkAsRead={handleMarkAsRead} 
        />
        
        <NotificationSection 
          title="This Week" 
          notifications={thisWeekNotifications} 
          onMarkAsRead={handleMarkAsRead} 
        />
        
        <NotificationSection 
          title="Earlier" 
          notifications={earlierNotifications} 
          onMarkAsRead={handleMarkAsRead} 
        />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 