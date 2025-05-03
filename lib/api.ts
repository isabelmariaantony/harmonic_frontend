const API_BASE_URL = 'http://localhost:3001/api';

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
}

interface ApiError {
  message: string;
  status?: number;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: 'API request failed',
        status: response.status,
      };
      throw error;
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

export const api = {
  // Auth endpoints
  login: (email: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

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