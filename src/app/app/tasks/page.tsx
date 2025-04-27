"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  // Static sample data, no logic
  const tasks = [
    {
      id: 1,
      title: "Follow up with John Smith",
      description: "Send proposal email and schedule a call",
      dueDate: "2023-07-15",
      priority: "high",
      completed: false,
      leadName: "John Smith",
      leadCompany: "Acme Corporation"
    },
    {
      id: 2,
      title: "Send quote to Tech Innovations",
      description: "Prepare final pricing details",
      dueDate: "2023-07-10",
      priority: "medium",
      completed: false,
      leadName: "Sarah Johnson",
      leadCompany: "Tech Innovations"
    },
    {
      id: 3,
      title: "Update Michael's contact information",
      dueDate: "2023-07-05",
      priority: "low",
      completed: true,
      leadName: "Michael Brown",
      leadCompany: "Global Services"
    },
    {
      id: 4,
      title: "Call back Emily about proposal questions",
      description: "Discuss pricing tiers and timeline",
      dueDate: "2023-07-12",
      priority: "high",
      completed: false,
      leadName: "Emily Parker",
      leadCompany: "Parker & Associates"
    }
  ];

  return (
    <Layout title="Tasks">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg">
            <Plus size={16} className="mr-1 inline-block" />
            Add Task
          </button>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto py-2">
          <button className="text-sm bg-blue-600 text-white py-1 px-3 rounded-full whitespace-nowrap">
            All Tasks
          </button>
          <button className="text-sm bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full whitespace-nowrap">
            Due Today
          </button>
          <button className="text-sm bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full whitespace-nowrap">
            Upcoming
          </button>
          <button className="text-sm bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full whitespace-nowrap">
            Completed
          </button>
          <button className="text-sm bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full whitespace-nowrap">
            High Priority
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${
                task.completed
                  ? 'border-gray-300 dark:border-gray-700'
                  : task.priority === 'high'
                  ? 'border-red-500'
                  : task.priority === 'medium'
                  ? 'border-yellow-500'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={task.completed}
                  readOnly
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {task.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {task.dueDate}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center text-xs font-medium py-1 px-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {task.leadName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {task.leadCompany}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 