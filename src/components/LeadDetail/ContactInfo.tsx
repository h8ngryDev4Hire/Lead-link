import React from 'react';
import { Mail, Phone, Edit } from 'lucide-react';

interface ContactInfoProps {
  email?: string;
  phone?: string;
  onEdit?: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  onEdit = () => {}
}) => {
  if (!email && !phone) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          onClick={onEdit}
        >
          <Edit size={16} className="mr-1" />
          Edit
        </button>
      </div>
      
      <div className="space-y-4">
        {email && (
          <div className="flex items-center">
            <Mail size={18} className="mr-3 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
              <a href={`mailto:${email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {email}
              </a>
            </div>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center">
            <Phone size={18} className="mr-3 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
              <a href={`tel:${phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo; 