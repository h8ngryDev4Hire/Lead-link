import React from 'react';

interface SettingsFooterProps {
  version?: string;
  companyName?: string;
  year?: number;
}

const SettingsFooter: React.FC<SettingsFooterProps> = ({ 
  version = "1.0.0",
  companyName = "LeadLink",
  year = new Date().getFullYear()
}) => {
  return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400 my-8">
      <p>{companyName} v{version}</p>
      <p className="mt-1">© {year} {companyName}. All rights reserved.</p>
    </div>
  );
};

export default SettingsFooter; 