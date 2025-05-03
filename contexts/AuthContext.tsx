'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
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
      const response = await api.login(email, password);
      console.log('Login response:', response);
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.data) {
        const authResponse = response.data as AuthResponse;
        console.log('Setting user:', authResponse.user);
        setUser(authResponse.user);
        localStorage.setItem('token', authResponse.token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
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
      if (response.data) {
        const authResponse = response.data as AuthResponse;
        console.log('Setting user:', authResponse.user);
        setUser(authResponse.user);
        localStorage.setItem('token', authResponse.token);
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

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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