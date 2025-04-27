import { User, Session } from '@/definitions/auth';
import { getCurrentUser, getSession } from '@/lib/services/AuthService';

/**
 * Returns current authentication state from local storage/cookies
 */
export function getAuthStatus(): { user: User | null, session: Session | null, isAuthenticated: boolean } {
  // This is client-side only
  if (typeof window === 'undefined') {
    return { user: null, session: null, isAuthenticated: false };
  }

  // Check local storage for user data (Supabase stores this automatically)
  try {
    const storedSession = localStorage.getItem('supabase.auth.token');
    const session = storedSession ? JSON.parse(storedSession) : null;
    const user = session?.user ?? null;

    return {
      user,
      session,
      isAuthenticated: !!user && !!session
    };
  } catch (error) {
    console.error('Error accessing auth status:', error);
    return { user: null, session: null, isAuthenticated: false };
  }
}

/**
 * Fetches fresh authentication data from Supabase
 */
export async function refreshAuthStatus(): Promise<{ user: User | null, session: Session | null, isAuthenticated: boolean }> {
  try {
    const [user, session] = await Promise.all([
      getCurrentUser(),
      getSession()
    ]);

    return {
      user,
      session,
      isAuthenticated: !!user && !!session
    };
  } catch (error) {
    console.error('Error refreshing auth status:', error);
    return { user: null, session: null, isAuthenticated: false };
  }
}

/**
 * Formats authentication errors for display
 */
export function handleAuthError(error: Error): { message: string } {
  // Handle known error messages more gracefully
  const errorMessage = error.message || 'An authentication error occurred';
  
  if (errorMessage.includes('Invalid login credentials')) {
    return { message: 'Invalid email or password' };
  }
  
  if (errorMessage.includes('Email not confirmed')) {
    return { message: 'Please verify your email before logging in' };
  }
  
  if (errorMessage.includes('Email already registered')) {
    return { message: 'This email is already registered' };
  }
  
  // Default case, return the original message
  return { message: errorMessage };
}

/**
 * Quick check if user is authenticated based on local data
 */
export function isAuthenticated(): boolean {
  return getAuthStatus().isAuthenticated;
} 