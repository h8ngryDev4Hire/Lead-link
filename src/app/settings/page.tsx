"use client";

import React from 'react';
import { 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  User, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { Layout } from '../../components/Layout/Layout';

// Define types for our settings items
interface BaseSettingItem {
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface LinkSettingItem extends BaseSettingItem {
  href: string;
  action?: never;
  danger?: boolean;
}

interface ActionSettingItem extends BaseSettingItem {
  action: string;
  href?: never;
  danger?: boolean;
}

type SettingItem = LinkSettingItem | ActionSettingItem;

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

export default function SettingsPage() {
  const settingsGroups: SettingGroup[] = [
    {
      title: "Account",
      items: [
        { 
          label: "Profile", 
          icon: <User size={20} className="text-blue-600 dark:text-blue-400" />,
          href: "/profile"
        },
        { 
          label: "Security & Privacy", 
          icon: <Shield size={20} className="text-green-600 dark:text-green-400" />,
          href: "/settings/security"
        },
      ]
    },
    {
      title: "Preferences",
      items: [
        { 
          label: "Appearance", 
          icon: <Sun size={20} className="text-orange-500 dark:text-orange-400" />,
          description: "Light",
          action: "toggle"
        },
        { 
          label: "Notifications", 
          icon: <Bell size={20} className="text-purple-600 dark:text-purple-400" />,
          href: "/settings/notifications"
        },
      ]
    },
    {
      title: "Support",
      items: [
        { 
          label: "Help & Support", 
          icon: <HelpCircle size={20} className="text-blue-600 dark:text-blue-400" />,
          href: "/settings/help"
        },
      ]
    },
    {
      title: "",
      items: [
        { 
          label: "Sign Out", 
          icon: <LogOut size={20} className="text-red-600 dark:text-red-400" />,
          action: "signOut",
          danger: true
        },
      ]
    }
  ];

  const handleToggleTheme = () => {
    // Toggle theme logic would go here
    console.log("Toggle theme");
  };

  const handleSignOut = () => {
    // Sign out logic would go here
    console.log("Sign out");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold my-6 text-gray-900 dark:text-white">Settings</h1>
        
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            {group.title && (
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {group.title}
              </h2>
            )}
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className={`border-b last:border-b-0 border-gray-200 dark:border-gray-700
                    ${item.danger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                >
                  {'href' in item && item.href ? (
                    <Link href={item.href} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center">
                        <div className="mr-3">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                      {item.description ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.description}</span>
                      ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                    </Link>
                  ) : (
                    <button 
                      onClick={item.action === "toggle" ? handleToggleTheme : item.action === "signOut" ? handleSignOut : undefined}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                      {item.description && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.description}</span>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 my-8">
          <p>LeadLink v1.0.0</p>
          <p className="mt-1">© 2023 LeadLink. All rights reserved.</p>
        </div>
      </div>
    </Layout>
  );
} 