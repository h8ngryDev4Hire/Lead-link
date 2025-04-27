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
  Shield
} from 'lucide-react';
import { Layout } from '../../../components/Layout/Layout';
import SettingsGroup, { SettingItem } from '@/components/Settings/SettingsGroup';
import SettingsFooter from '@/components/Settings/SettingsFooter';

// Define the shape of a setting group
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
        
        {settingsGroups.map((group, index) => (
          <SettingsGroup 
            key={index}
            title={group.title}
            items={group.items}
            onToggleTheme={handleToggleTheme}
            onSignOut={handleSignOut}
          />
        ))}
        
        <SettingsFooter />
      </div>
    </Layout>
  );
} 