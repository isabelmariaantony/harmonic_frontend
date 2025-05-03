export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface StudySession {
  id: number;
  subject: string;
  level: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface MemoryExercise {
  id: number;
  title: string;
  description: string;
  difficulty_level: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: number;
  user_id: number;
  resource_id?: number;
  exercise_id?: number;
  progress_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 