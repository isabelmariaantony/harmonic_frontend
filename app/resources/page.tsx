'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'tutorial' | 'documentation' | 'course' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  tags: string[];
  author: string;
  date_added: string;
}

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Implement API call to fetch resources
    // For now, using dummy data
    setResources([
      {
        id: 1,
        title: 'Introduction to Machine Learning',
        description: 'A comprehensive guide to getting started with machine learning concepts and practical implementations.',
        category: 'machine-learning',
        type: 'course',
        difficulty: 'beginner',
        url: 'https://example.com/ml-intro',
        tags: ['python', 'scikit-learn', 'basics'],
        author: 'Dr. Jane Smith',
        date_added: '2024-03-01'
      },
      {
        id: 2,
        title: 'React Best Practices',
        description: 'Learn the best practices for building scalable React applications with modern patterns.',
        category: 'web-development',
        type: 'tutorial',
        difficulty: 'intermediate',
        url: 'https://example.com/react-best-practices',
        tags: ['react', 'javascript', 'frontend'],
        author: 'John Developer',
        date_added: '2024-03-15'
      },
      {
        id: 3,
        title: 'Docker for Developers',
        description: 'Master containerization with Docker and learn how to deploy applications efficiently.',
        category: 'devops',
        type: 'documentation',
        difficulty: 'intermediate',
        url: 'https://example.com/docker-guide',
        tags: ['docker', 'containers', 'deployment'],
        author: 'DevOps Team',
        date_added: '2024-03-10'
      }
    ]);
    setLoading(false);
  }, []);

  const filteredResources = resources
    .filter(resource => category === 'all' || resource.category === category)
    .filter(resource => typeFilter === 'all' || resource.type === typeFilter)
    .filter(resource => difficultyFilter === 'all' || resource.difficulty === difficultyFilter)
    .filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <h1 className="text-2xl font-bold text-gray-900">Development Resources</h1>
            {user && (
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Resource
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search resources..."
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
              <option value="mobile-development">Mobile Development</option>
              <option value="devops">DevOps</option>
              <option value="database">Database</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="tutorial">Tutorials</option>
              <option value="documentation">Documentation</option>
              <option value="course">Courses</option>
              <option value="tool">Tools</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-500">By {resource.author}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        resource.type === 'tutorial' ? 'bg-blue-100 text-blue-800' :
                        resource.type === 'documentation' ? 'bg-green-100 text-green-800' :
                        resource.type === 'course' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {resource.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        resource.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {resource.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 mb-4">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Added on {new Date(resource.date_added).toLocaleDateString()}
                    </span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Resource
                    </a>
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