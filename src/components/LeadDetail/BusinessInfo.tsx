import React from 'react';
import { Building, Globe, FileText } from 'lucide-react';

interface BusinessInfoProps {
  companyName: string;
  urls?: string[];
  description?: string;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
  companyName,
  urls = [],
  description
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Building size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
          Business Information
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <p className="text-gray-900 dark:text-gray-100 font-medium">
            {companyName}
          </p>
        </div>
        
        {urls.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business URLs
            </label>
            {urls.map((url, index) => (
              <div key={index} className="flex items-center mb-2">
                <Globe size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                <a 
                  href={`https://${url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {url}
                </a>
              </div>
            ))}
          </div>
        )}
        
        {description && (
          <div>
            <div className="flex items-start mb-1">
              <FileText size={16} className="mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Description
              </label>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-gray-900/60 rounded-lg text-sm">
              {description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessInfo; 