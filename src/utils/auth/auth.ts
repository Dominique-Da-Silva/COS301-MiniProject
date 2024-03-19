import { supabase } from "@config/supabase";

export async function signInWithGoogle(): Promise<"success" | "error">{
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return "error";
  } else {
    return "success";
  }
}
  
export async function signInWithGithub(): Promise<"success" | "error">{
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (error) {
    return "error";
  } else {
    return "success";
  }
}
  
export async function signOut(): Promise<"success" | "error">{
  const { error } = await supabase.auth.signOut()

  if (error) {
    return "error";
  } else {
    return "success";
  }
}

export async function signUpNewUser(email: string, password: string): Promise<"success" | "error">{
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return "error";
  } else {
    return "success";
  }
}

export async function signInUser(email: string, password: string): Promise<"success" | "error">{
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return "error";
  } else {
    return "success";
  }
}