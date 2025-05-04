'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string; isPendingApproval?: boolean }>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Checking session, token exists:', !!token);
        if (token) {
          // TODO: Implement proper token validation with backend
          // For now, we'll just clear the token if it exists
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');
      const result = await api.login(email, password);
      console.log('Login result:', result);
      
      if (result.error) {
        if (result.isPendingApproval) {
          return { error: result.error, isPendingApproval: true };
        }
        return { error: result.error };
      }
      
      if (result.data) {
        const authResponse = result.data as AuthResponse;
        console.log('Setting user:', authResponse.user);
        
        // Store the token
        localStorage.setItem('token', authResponse.token);
        
        // Fetch complete profile data
        try {
          const profileResponse = await api.getProfile();
          if (profileResponse.data) {
            console.log('Complete profile data:', profileResponse.data);
            setUser(profileResponse.data);
          } else {
            setUser(authResponse.user);
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          setUser(authResponse.user);
        }
        
        return {};
      }
      
      return { error: 'Login failed' };
    } catch (error) {
      console.error('Login failed:', error);
      return { error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: string }) => {
    try {
      console.log('Attempting registration...');
      const response = await api.register(userData);
      console.log('Registration response:', response);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = (userData: User) => {
    console.log('Updating user context:', userData);
    setUser(userData);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 