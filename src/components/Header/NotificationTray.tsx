import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import NotificationItem, { Notification } from './NotificationItem';

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
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would update the notification state
    console.log(`Marking notification ${id} as read`);
  };

  const handleMarkAllAsRead = () => {
    // In a real app, this would update all notifications
    console.log('Marking all notifications as read');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={trayRef}
      className="absolute top-12 right-0 w-80 max-h-[500px] overflow-y-auto bg-black border border-gray-800 dark:border-gray-700 rounded-lg shadow-xl z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800 dark:border-gray-700">
        <h3 className="font-semibold text-lg text-white">Notifications</h3>
        <div className="flex space-x-2">
          <button 
            className="text-xs text-blue-400 hover:underline"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-800 dark:divide-gray-700">
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            No new notifications
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-800 dark:border-gray-700 text-center">
        <Link 
          href="/app/notifications" 
          className="text-sm text-blue-400 hover:underline"
          onClick={onClose}
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationTray; 