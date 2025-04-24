import React from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationTrayProps {
  isOpen: boolean;
  onClose: () => void;
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
  }
];

const NotificationTray: React.FC<NotificationTrayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 w-80 max-h-[500px] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="flex space-x-2">
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            Mark all as read
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                  <Check size={12} className="mr-1" />
                  Mark as read
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No new notifications
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <Link 
          href="/notifications" 
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={onClose}
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationTray; 