import { AuthResponse } from '@/types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://harmonic-backend-655y.onrender.com/api'
  : 'http://localhost:3001/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_approved: boolean;
}

interface ProgressData {
  score?: number;
  completion_time?: number;
  attempts?: number;
  correct_answers?: number;
  total_questions?: number;
  [key: string]: number | undefined;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  isPendingApproval?: boolean;
}

interface ApiError {
  message: string;
  status?: number;
}

interface GetUsersParams {
  role?: string;
  isApproved?: boolean;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('API Request - Full URL:', url);
  
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log('Auth token exists:', !!token);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      // Handle CORS errors specifically
      if (response.status === 0) {
        return { error: 'CORS error: Unable to connect to the server. Please check if the server is running and CORS is properly configured.' };
      }
      
      const errorData = await response.json();
      return { error: errorData.message || 'Request failed' };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export const api = {
  // Auth endpoints
  login: async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Admin endpoints
  getUsers: async (params: { role?: string; isApproved?: boolean } = {}) => {
    const queryParams = new URLSearchParams();
    if (params.role) queryParams.append('role', params.role);
    if (params.isApproved !== undefined) queryParams.append('isApproved', params.isApproved.toString());
    
    return fetchApi<User[]>(`/admin/users?${queryParams.toString()}`);
  },

  approveUser: async (userId: number) => {
    return fetchApi<{ success: boolean }>(`/admin/users/${userId}/approve`, {
      method: 'POST',
    });
  },

  unapproveUser: async (userId: number) => {
    return fetchApi<{ success: boolean }>(`/admin/users/${userId}/unapprove`, {
      method: 'POST',
    });
  },

  updateUserRole: async (userId: number, role: string) => {
    return fetchApi<{ success: boolean }>(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  // Study sessions endpoints
  getStudySessions: () => fetchApi('/study-sessions'),
  createStudySession: (sessionData: {
    subject: string;
    level: string;
    start_time: string;
    end_time: string;
  }) =>
    fetchApi('/study-sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    }),

  // Resources endpoints
  getResources: () => fetchApi('/resources'),
  getResource: (id: number) => fetchApi(`/resources/${id}`),

  // Memory exercises endpoints
  getMemoryExercises: () => fetchApi('/memory-exercises'),
  getMemoryExercise: (id: number) => fetchApi(`/memory-exercises/${id}`),

  // User progress endpoints
  getUserProgress: () => fetchApi('/user-progress'),
  updateUserProgress: (progressData: {
    resource_id?: number;
    exercise_id?: number;
    progress_data: ProgressData;
  }) =>
    fetchApi('/user-progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    }),
}; 