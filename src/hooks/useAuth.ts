import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/services/AuthService';
import { User } from '@/definitions/auth';

interface UseAuthReturn {
  // State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Methods
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, userData?: object) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking authentication status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAuthError = useCallback((err: any) => {
    const errorMessage = err?.message || 'An unknown error occurred';
    setError(errorMessage);
    return false;
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    clearError();
    setLoading(true);
    
    try {
      const response = await authService.signIn(email, password);
      
      if (response.error) {
        return handleAuthError(response.error);
      }
      
      setUser(response.user);
      setLoading(false);
      return true;
    } catch (err) {
      return handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  const register = useCallback(async (
    email: string, 
    password: string, 
    userData?: object
  ): Promise<boolean> => {
    clearError();
    setLoading(true);
    
    try {
      const response = await authService.signUp(email, password);
      
      if (response.error) {
        return handleAuthError(response.error);
      }
      
      setUser(response.user);
      setLoading(false);
      return true;
    } catch (err) {
      return handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  const logout = useCallback(async (): Promise<void> => {
    clearError();
    setLoading(true);
    
    try {
      await authService.signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError, router]);

  const resetPasswordRequest = useCallback(async (email: string): Promise<boolean> => {
    clearError();
    setLoading(true);
    
    try {
      const response = await authService.resetPassword(email);
      
      if (response.error) {
        return handleAuthError(response.error);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      return handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  const updateUserPassword = useCallback(async (newPassword: string): Promise<boolean> => {
    clearError();
    setLoading(true);
    
    try {
      const response = await authService.updatePassword(newPassword);
      
      if (response.error) {
        return handleAuthError(response.error);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      return handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword: resetPasswordRequest,
    updatePassword: updateUserPassword,
    clearError
  };
} 