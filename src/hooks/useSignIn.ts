import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useSignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
}