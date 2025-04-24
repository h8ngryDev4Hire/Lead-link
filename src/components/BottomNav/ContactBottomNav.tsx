import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  UserCircle, 
  Megaphone, 
  MessageSquareText, 
  ListTodo, 
  ArrowLeft
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface ContactBottomNavProps {
  contactId: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const ContactBottomNav: React.FC<ContactBottomNavProps> = ({ contactId }) => {
  const pathname = usePathname();
  
  // Function to determine which tab is active based on the pathname
  const getActiveTab = (path: string) => {
    if (path.includes('/campaigns')) return 'campaigns';
    if (path.includes('/chat')) return 'chat';
    if (path.includes('/tasks')) return 'tasks';
    return 'profile';
  };
  
  const activeTab = getActiveTab(pathname);
  
  const navItems: NavItem[] = [
    {
      label: 'Profile',
      href: `/leads/${contactId}`,
      icon: <UserCircle size={20} />,
      isActive: activeTab === 'profile'
    },
    {
      label: 'Campaigns',
      href: `/leads/${contactId}/campaigns`,
      icon: <Megaphone size={20} />,
      isActive: activeTab === 'campaigns'
    },
    {
      label: 'AI Chat',
      href: `/leads/${contactId}/chat`,
      icon: <MessageSquareText size={20} />,
      isActive: activeTab === 'chat'
    },
    {
      label: 'Tasks',
      href: `/leads/${contactId}/tasks`,
      icon: <ListTodo size={20} />,
      isActive: activeTab === 'tasks'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-800 z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full 
              ${item.isActive 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-500 hover:text-foreground"}`}
          >
            <div className="mb-1">{item.icon}</div>
            <span className="text-xs mt-1">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default ContactBottomNav; 