import { createClient } from '@supabase/supabase-js';
import { Database } from "../types/database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>("https://przfwtfinnjmlhcdbqbr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByemZ3dGZpbm5qbWxoY2RicWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MTUzMzEsImV4cCI6MjAyNTQ5MTMzMX0.MhlRU6owGd2XWdqTSzjfRgQoKn9-w_bAJtNIkyMv2zs")