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
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification,
  onMarkAsRead = () => {} 
}) => {
  return (
    <div 
      className={`p-4 hover:bg-gray-900 dark:hover:bg-gray-800 transition-colors ${
        !notification.read ? 'bg-blue-900/20 dark:bg-blue-900/20' : ''
      }`}
    >
      <div className="flex justify-between">
        <h4 className="font-medium text-sm text-white">{notification.title}</h4>
        <span className="text-xs text-gray-400">{notification.time}</span>
      </div>
      <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
      {!notification.read && (
        <div className="flex justify-end mt-2">
          <button 
            className="text-xs text-blue-400 hover:underline flex items-center"
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