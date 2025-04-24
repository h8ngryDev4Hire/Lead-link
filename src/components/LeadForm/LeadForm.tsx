import React from 'react';

interface LeadFormProps {
  isEdit?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ isEdit = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-5">{isEdit ? 'Edit Lead' : 'Add New Lead'}</h2>
      
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="Acme Inc."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status*
          </label>
          <select
            id="status"
            name="status"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="Add any additional information about this lead..."
          ></textarea>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            {isEdit ? 'Update Lead' : 'Add Lead'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm; 