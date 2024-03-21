import { supabase } from "@config/supabase";
import { uploadProfile } from "@services/index";

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
    //add user to database if not already there
    const result = await addUserToDatabase();
    return result;
  }
}

export async function signInWithGithub(): Promise<"success" | "error">{
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    const result = await addUserToDatabase();
    return result;
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

export async function signUpNewUser(user_data: {
  name: string,
  email: string,
  dob_month: string,
  dob_day: string,
  dob_year: string,
  password: string,
  avatar: string,
  username: string
}): Promise<"success" | "error">{
  const { error } = await supabase.auth.signUp({
    email: user_data.email,
    password: user_data.password,
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    //update user metadata
    await supabase.auth.updateUser({
      data: { 
        full_name: user_data.name,
        username: user_data.username,
        dob: `${user_data.dob_year}-${user_data.dob_month}-${user_data.dob_day}`
      }
    })

    //upload avatar to storage
    const res = await uploadProfile(user_data.avatar);
    if (res === "error") return "error";

    //add user to database
    const result = await addUserToDatabase();
    return result;
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
    //add user to database if not already there
    return "success";
  }
}

export async function isUserLoggedIn(): Promise<boolean>{
  const { data: { user } } = await supabase.auth.getUser()
  return user ? true : false;
}

async function addUserToDatabase(){
  //add user to database if not already there
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return "error";

  //check if user is already in database
  const { data: users, error: db_error } = await supabase.from('User').select().eq('auth_id', logged_user.data.user.id);
  if (db_error) return "error";
  if (users.length > 0) return "success";

  const user = {
    auth_id: logged_user.data.user.id,
    Created_at: new Date().toISOString(),
    Email: logged_user.data.user.email ? logged_user.data.user.email : "",
    Name: logged_user.data.user.user_metadata.full_name,
    Surname: logged_user.data.user.user_metadata.surname,
    User_Id: undefined,
    Username: logged_user.data.user.user_metadata.username,
  };

  await supabase.from('User').insert(user);

  return "success";
}