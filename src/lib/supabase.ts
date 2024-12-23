import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.endsWith('.supabase.co')) {
  throw new Error('Invalid Supabase URL format. URL should be like: https://your-project.supabase.co');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);