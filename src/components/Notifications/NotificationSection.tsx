import React from 'react';
import NotificationItem, { Notification } from './NotificationItem';

interface NotificationSectionProps {
  title: string;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({ 
  title, 
  notifications, 
  onMarkAsRead 
}) => {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        {notifications.map(notification => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onMarkAsRead={onMarkAsRead} 
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationSection; 