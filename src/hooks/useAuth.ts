import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signInWithEmail, signUpWithEmail, signOut } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { error } = await signUpWithEmail(email, password);
      if (error) throw error;
      toast.success('Check your email to confirm your account!');
      navigate('/auth/confirm-email');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout
  };
}