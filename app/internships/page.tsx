'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface Internship {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  duration: string;
  stipend?: string;
  deadline: string;
  category: string;
  application_url?: string;
  is_volunteer?: boolean;
  organization_type: 'company' | 'club' | 'non-profit';
}

export default function InternshipsPage() {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Implement API call to fetch opportunities
    // For now, using dummy data
    setInternships([
      {
        id: 1,
        title: 'Machine Learning Intern',
        company: 'TechCorp AI',
        description: 'Join our AI team to work on cutting-edge machine learning projects.',
        requirements: [
          'Strong Python programming skills',
          'Understanding of ML algorithms',
          'Experience with TensorFlow or PyTorch',
          'Currently pursuing a degree in Computer Science or related field'
        ],
        location: 'San Francisco, CA',
        type: 'hybrid',
        duration: '3 months',
        stipend: '$5,000/month',
        deadline: '2024-05-01',
        category: 'machine-learning',
        application_url: 'https://example.com/apply',
        is_volunteer: false,
        organization_type: 'company'
      },
      {
        id: 2,
        title: 'Web Development Volunteer',
        company: 'Code for Good',
        description: 'Help build websites for non-profit organizations in your community.',
        requirements: [
          'Basic web development skills',
          'Willingness to learn and contribute',
          'Good communication skills',
          'Passion for social impact'
        ],
        location: 'Remote',
        type: 'remote',
        duration: '6 months',
        deadline: '2024-04-15',
        category: 'web-development',
        application_url: 'https://example.com/volunteer',
        is_volunteer: true,
        organization_type: 'non-profit'
      },
      {
        id: 3,
        title: 'AI Club Research Assistant',
        company: 'University AI Club',
        description: 'Join our research team to work on AI projects and contribute to open-source initiatives.',
        requirements: [
          'Python programming skills',
          'Interest in AI and machine learning',
          'Currently enrolled in university',
          'Available for weekly meetings'
        ],
        location: 'Campus',
        type: 'onsite',
        duration: '4 months',
        deadline: '2024-04-30',
        category: 'machine-learning',
        application_url: 'https://example.com/join',
        is_volunteer: true,
        organization_type: 'club'
      }
    ]);
    setLoading(false);
  }, []);

  const filteredInternships = internships
    .filter(internship => category === 'all' || internship.category === category)
    .filter(internship => typeFilter === 'all' || internship.type === typeFilter)
    .filter(internship =>
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-bold text-gray-900">Volunteering & Internship Opportunities</h1>
            {user && (
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Post Opportunity
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search opportunities..."
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
              <option value="data-science">Data Science</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="devops">DevOps</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {filteredInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{internship.title}</h3>
                      <p className="text-sm text-gray-500">{internship.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        internship.type === 'remote' ? 'bg-blue-100 text-blue-800' :
                        internship.type === 'onsite' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {internship.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        internship.is_volunteer ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {internship.is_volunteer ? 'Volunteer' : 'Internship'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 mb-4">{internship.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                      {internship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {internship.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {internship.duration}
                    </div>
                    {internship.stipend && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {internship.stipend}
                      </div>
                    )}
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Apply by {new Date(internship.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  {internship.application_url && (
                    <div className="mt-4">
                      <a
                        href={internship.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {internship.is_volunteer ? 'Join Now' : 'Apply Now'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 