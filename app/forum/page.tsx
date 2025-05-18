'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
  category: string;
  tags: string[];
  replies: number;
  views: number;
  created_at: string;
  last_updated: string;
}

export default function ForumPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Implement API call to fetch forum posts
    // For now, using dummy data
    setPosts([
      {
        id: 1,
        title: 'How to implement a custom loss function in TensorFlow?',
        content: 'I\'m working on a custom ML model and need to implement a specific loss function...',
        author: {
          id: 1,
          name: 'John Doe'
        },
        category: 'machine-learning',
        tags: ['tensorflow', 'python', 'ml'],
        replies: 5,
        views: 120,
        created_at: '2024-03-15T10:00:00Z',
        last_updated: '2024-03-15T15:30:00Z'
      },
      {
        id: 2,
        title: 'Best practices for API design in Node.js',
        content: 'I\'m building a REST API using Node.js and Express...',
        author: {
          id: 2,
          name: 'Jane Smith'
        },
        category: 'web-development',
        tags: ['nodejs', 'express', 'api'],
        replies: 3,
        views: 85,
        created_at: '2024-03-14T14:20:00Z',
        last_updated: '2024-03-15T09:15:00Z'
      },
      {
        id: 3,
        title: 'Optimizing database queries in PostgreSQL',
        content: 'I have a complex query that\'s taking too long to execute...',
        author: {
          id: 3,
          name: 'Mike Johnson'
        },
        category: 'database',
        tags: ['postgresql', 'sql', 'optimization'],
        replies: 7,
        views: 150,
        created_at: '2024-03-13T09:45:00Z',
        last_updated: '2024-03-15T11:20:00Z'
      }
    ]);
    setLoading(false);
  }, []);

  const filteredPosts = posts
    .filter(post => category === 'all' || post.category === category)
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <h1 className="text-2xl font-bold text-gray-900">Developer Forum</h1>
            {user && (
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Post
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="web-development">Web Development</option>
              <option value="database">Database</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        by {post.author.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <div className="flex items-center space-x-4">
                      <span>{post.replies} replies</span>
                      <span>{post.views} views</span>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      {post.category}
                    </span>
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