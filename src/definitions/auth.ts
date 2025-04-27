import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export interface User extends SupabaseUser {}

export interface Session extends SupabaseSession {}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: Error;
}

export interface ResetPasswordResponse {
  data: { user: User } | null;
  error: Error | null;
}

export interface UpdatePasswordResponse {
  data: { user: User } | null;
  error: Error | null;
} 