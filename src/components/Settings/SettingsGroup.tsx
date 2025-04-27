import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Define types for our settings items
export interface BaseSettingItem {
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface LinkSettingItem extends BaseSettingItem {
  href: string;
  action?: never;
  danger?: boolean;
}

export interface ActionSettingItem extends BaseSettingItem {
  action: string;
  href?: never;
  danger?: boolean;
}

export type SettingItem = LinkSettingItem | ActionSettingItem;

export interface SettingsGroupProps {
  title: string;
  items: SettingItem[];
  onToggleTheme?: () => void;
  onSignOut?: () => void;
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ 
  title,
  items,
  onToggleTheme,
  onSignOut
}) => {
  return (
    <div className="mb-8">
      {title && (
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          {title}
        </h2>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {items.map((item, itemIndex) => (
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
                onClick={item.action === "toggle" ? onToggleTheme : item.action === "signOut" ? onSignOut : undefined}
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
  );
};

export default SettingsGroup; 