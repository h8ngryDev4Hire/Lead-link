import React from 'react';
import Card from '../common/Card';

export interface Activity {
  id: number;
  content: string;
  description: string;
  timeAgo: number;
}

interface ActivityListProps {
  activities?: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ 
  activities = [1, 2, 3, 4, 5].map(item => ({
    id: item,
    content: `Activity ${item}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: item
  }))
}) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      <Card>
        <ul className="divide-y divide-gray-200">
          {activities.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">U</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.content}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                  {item.timeAgo} day{item.timeAgo !== 1 ? 's' : ''} ago
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ActivityList; 