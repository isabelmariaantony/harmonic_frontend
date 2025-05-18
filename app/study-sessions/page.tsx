'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface StudySession {
  id: number;
  title: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: 'online' | 'in-person' | 'hybrid';
  max_participants: number;
  current_participants: number;
  host: {
    name: string;
    avatar: string;
  };
  participants: {
    name: string;
    avatar: string;
  }[];
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function StudySessionsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Implement API call to fetch study sessions
    // For now, using dummy data
    setSessions([
      {
        id: 1,
        title: 'Machine Learning Study Group',
        topic: 'machine-learning',
        description: 'Weekly study group focusing on ML algorithms and implementations. All levels welcome!',
        date: '2024-04-15',
        time: '15:00',
        duration: '2 hours',
        location: 'Virtual',
        type: 'online',
        max_participants: 10,
        current_participants: 5,
        host: {
          name: 'Alex Chen',
          avatar: 'https://example.com/avatar1.jpg'
        },
        participants: [
          { name: 'Alex Chen', avatar: 'https://example.com/avatar1.jpg' },
          { name: 'Sarah Kim', avatar: 'https://example.com/avatar2.jpg' },
          { name: 'Mike Johnson', avatar: 'https://example.com/avatar3.jpg' }
        ],
        tags: ['python', 'ml', 'algorithms'],
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Web Development Workshop',
        topic: 'web-development',
        description: 'Hands-on session for building full-stack applications with React and Node.js.',
        date: '2024-04-16',
        time: '18:00',
        duration: '3 hours',
        location: 'Tech Hub, Room 302',
        type: 'in-person',
        max_participants: 8,
        current_participants: 6,
        host: {
          name: 'Emma Wilson',
          avatar: 'https://example.com/avatar4.jpg'
        },
        participants: [
          { name: 'Emma Wilson', avatar: 'https://example.com/avatar4.jpg' },
          { name: 'David Lee', avatar: 'https://example.com/avatar5.jpg' }
        ],
        tags: ['react', 'nodejs', 'fullstack'],
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'Data Structures & Algorithms',
        topic: 'algorithms',
        description: 'Practice session for coding interviews and algorithm problems.',
        date: '2024-04-14',
        time: '14:00',
        duration: '2 hours',
        location: 'Hybrid - Room 101 & Zoom',
        type: 'hybrid',
        max_participants: 12,
        current_participants: 8,
        host: {
          name: 'James Brown',
          avatar: 'https://example.com/avatar6.jpg'
        },
        participants: [
          { name: 'James Brown', avatar: 'https://example.com/avatar6.jpg' },
          { name: 'Lisa Wang', avatar: 'https://example.com/avatar7.jpg' }
        ],
        tags: ['algorithms', 'interview-prep', 'leetcode'],
        status: 'ongoing'
      }
    ]);
    setLoading(false);
  }, []);

  const filteredSessions = sessions
    .filter(session => topic === 'all' || session.topic === topic)
    .filter(session => typeFilter === 'all' || session.type === typeFilter)
    .filter(session => statusFilter === 'all' || session.status === statusFilter)
    .filter(session =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Study Sessions</h1>
            {user && (
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Session
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Topics</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="web-development">Web Development</option>
              <option value="algorithms">Algorithms</option>
              <option value="database">Database</option>
              <option value="mobile-development">Mobile Development</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-500">Hosted by {session.host.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        session.type === 'online' ? 'bg-blue-100 text-blue-800' :
                        session.type === 'in-person' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {session.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        session.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        session.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 mb-4">{session.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {session.time} ({session.duration})
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {session.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {session.current_participants}/{session.max_participants} participants
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {session.participants.map((participant, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
                          title={participant.name}
                        >
                          {participant.name.charAt(0)}
                        </div>
                      ))}
                      {session.current_participants < session.max_participants && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                          +
                        </div>
                      )}
                    </div>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      disabled={session.current_participants >= session.max_participants}
                    >
                      {session.current_participants >= session.max_participants ? 'Full' : 'Join Session'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 