import React from 'react';
import { Check } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead 
}) => {
  return (
    <div 
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
          <button 
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check size={12} className="mr-1" />
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem; 