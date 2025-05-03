'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type TabType = 'sessions' | 'resources' | 'exercises';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('sessions');

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`${
              activeTab === 'sessions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Study Sessions
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`${
              activeTab === 'resources'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`${
              activeTab === 'exercises'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Memory Exercises
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'sessions' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Study Sessions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your upcoming and past study sessions.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <p className="text-gray-500">No study sessions scheduled yet.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Resources</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Educational materials and study guides.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <p className="text-gray-500">No resources available yet.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Memory Exercises</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Practice exercises to improve your memory.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <p className="text-gray-500">No memory exercises available yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 