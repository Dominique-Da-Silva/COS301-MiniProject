import { createClient } from '@supabase/supabase-js';
import { Database } from "../types/database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<any>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)