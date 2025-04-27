import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit = () => {},
  onDelete = () => {}
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between">
        <button 
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          onClick={onEdit}
        >
          <Edit size={16} className="mr-2" />
          Edit Contact
        </button>
        <button 
          className="flex items-center justify-center border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 font-medium py-2 px-4 rounded-lg"
          onClick={onDelete}
        >
          <Trash2 size={16} className="mr-2" />
          Delete Contact
        </button>
      </div>
    </div>
  );
};

export default ActionButtons; 