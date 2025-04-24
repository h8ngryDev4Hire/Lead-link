import React from 'react';
import Link from 'next/link';
import { 
  LayoutGrid, 
  Users, 
  Camera, 
  ListTodo, 
  UserCircle
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

export const BottomNav: React.FC = () => {
  const navItems: NavItem[] = [
    {
      label: 'Scan',
      href: '/scan',
      icon: <Camera size={24} />,
      isHighlighted: true
    },
    {
      label: 'Dashboard',
      href: '/',
      icon: <LayoutGrid size={20} />,
    },
    {
      label: 'Leads',
      href: '/leads',
      icon: <Users size={20} />,
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: <ListTodo size={20} />,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <UserCircle size={20} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-800 z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center ${item.isHighlighted ? 
              "w-[25%] h-full text-blue-600 dark:text-blue-400 relative -mt-6" : 
              "w-full h-full text-gray-500 hover:text-foreground"}`}
          >
            {item.isHighlighted ? (
              <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-3 shadow-lg">
                {item.icon}
              </div>
            ) : (
              <div className="mb-1">{item.icon}</div>
            )}
            <span className={`text-xs mt-1 ${item.isHighlighted ? "absolute bottom-3" : ""}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav; 