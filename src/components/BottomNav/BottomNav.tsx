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
      href: '/app/scan',
      icon: <Camera size={24} />,
      isHighlighted: true
    },
    {
      label: 'Dashboard',
      href: '/app/dashboard',
      icon: <LayoutGrid size={20} />,
    },
    {
      label: 'Leads',
      href: '/app/leads',
      icon: <Users size={20} />,
    },
    {
      label: 'Tasks',
      href: '/app/tasks',
      icon: <ListTodo size={20} />,
    },
    {
      label: 'Profile',
      href: '/app/profile',
      icon: <UserCircle size={20} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black dark:bg-black backdrop-blur-sm border-t border-gray-800 dark:border-gray-700 z-10 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              item.isHighlighted 
                ? "w-[25%] h-full text-white relative -mt-6" 
                : "w-full h-full text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
            }`}
          >
            {item.isHighlighted ? (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full p-3 shadow-lg transform hover:scale-105 transition-all duration-300">
                {item.icon}
              </div>
            ) : (
              <div className="mb-1 p-1 rounded-full hover:bg-gray-900 dark:hover:bg-gray-800 transition-colors duration-200">
                {item.icon}
              </div>
            )}
            <span className={`text-xs mt-1 font-medium ${
              item.isHighlighted 
                ? "absolute bottom-3 text-blue-400 dark:text-blue-400" 
                : "text-gray-400"
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav; 