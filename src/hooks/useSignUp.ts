import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useSignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      toast.success('Account created successfully!');
      navigate('/onboarding');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}