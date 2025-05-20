export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  is_approved: boolean;
  skills?: string[];
  availability?: {
    [key: string]: boolean;
  };
  created_at?: string;
  updated_at?: string;
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
  created_by: number;
  approved_by?: number;
  is_approved: boolean;
  is_hidden: boolean;
  creator_name?: string;
  approver_name?: string;
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
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string; isPendingApproval?: boolean }>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
} 