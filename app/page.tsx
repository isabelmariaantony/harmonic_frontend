'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      title: 'Development Resources',
      description: 'Access tutorials, documentation, and guides for building tools and applications.',
      icon: '📚',
      link: '/resources'
    },
    {
      title: 'Study Sessions',
      description: 'Join collaborative coding sessions and pair programming opportunities.',
      icon: '👥',
      link: '/study-sessions'
    },
    {
      title: 'ML Projects',
      description: 'Explore and contribute to machine learning projects and applications.',
      icon: '🤖',
      link: '/ml-projects'
    },
    {
      title: 'Developer Forum',
      description: 'Connect with other developers, share ideas, and get help with your projects.',
      icon: '💬',
      link: '/forum'
    },
    {
      title: 'Community Events',
      description: 'Join workshops, meetups, and hackathons to learn and network with other developers.',
      icon: '🎉',
      link: '/events'
    },
    {
      title: 'Volunteering & Internships',
      description: 'Find opportunities to contribute to clubs, organizations, and companies through internships and volunteering.',
      icon: '🤝',
      link: '/internships'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Student Developer Hub
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Build, learn, and collaborate on tools, machine learning applications, and other useful resources.
            </p>
            {!user && (
              <div className="mt-10">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to build amazing projects
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="relative group"
                >
                  <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start building?</span>
            <span className="block text-indigo-600">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {!user ? (
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </div>
            ) : (
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 