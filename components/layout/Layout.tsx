'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  console.log('Layout - Current user:', user);

  const handleLogout = async () => {
    try {
      console.log('Logout clicked');
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
                Harmonic.care
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <span className="text-gray-600 font-medium">Welcome, {user.name}</span>
                  <Link 
                    href="/profile" 
                    className="text-gray-600 hover:text-indigo-600 font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-600 hover:text-indigo-600 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-indigo-600">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-indigo-600">
              Privacy Policy
            </Link>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Harmonic.care. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 