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
    //add user to database if not already there
    const result = await addUserToDatabase();
    if (result === "error") await signOut();
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
    if (result === "error") await signOut();
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
  dob: Date
  password: string,
}): Promise<"success" | "error">{
  const { error } = await supabase.auth.signUp({
    email: user_data.email,
    password: user_data.password,
    options: {
      data: {
        dob: user_data.dob,
      }
    }
  })

  if (error) {
    return "error";
  } else {
    //add user to database if not already there
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    //add user to database
    const user = {
      auth_id: logged_user.data.user.id,
      Created_at: new Date().toISOString(),
      Email: user_data.email,
      Name: user_data.name,
      Surname: "",
      User_Id: undefined,
      Username: "",
    };
  
    const result = await supabase.from('User').insert(user);
    if (result.error){ 
      await signOut();
      return "error";
    }

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
    //add user to database if not already there
    return "success";
  }
}

export async function isUserLoggedIn(): Promise<boolean>{
  const { data } = await supabase.auth.getSession();
  if(data.session === null)return false;
  else{
    const res = await addUserToDatabase();
    if(res === "error"){
      await signOut();
    }
  } 
  return data.session !== null;
}

export async function doesLoggedUserExistInDatabase() : Promise<boolean>{
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return false;

  //check if user is already in database by counting the number of users with the same auth_id
  const { count, error } = await supabase.from('User').select('*', { count: 'exact', head: true }).eq('auth_id', logged_user.data.user.id);
  if (error || count === null) return false;
  return count > 0;
}

async function addUserToDatabase(){
  //add user to database if not already there
  const logged_user = await supabase.auth.getUser();
  if (!logged_user.data.user) return "error";

  //check if user is already in database by counting the number of users with the same auth_id
  const existing_user = await doesLoggedUserExistInDatabase();
  if (existing_user) return "success";

  const user = {
    auth_id: logged_user.data.user.id,
    Created_at: new Date().toISOString(),
    Email: logged_user.data.user.email ? logged_user.data.user.email : "",
    Name: logged_user.data.user.user_metadata.full_name ? logged_user.data.user.user_metadata.full_name : "",
    Surname: logged_user.data.user.user_metadata.surname ? logged_user.data.user.user_metadata.surname : "",
    User_Id: undefined,
    Username: logged_user.data.user.user_metadata.full_name ? logged_user.data.user.user_metadata.full_name : "",
  };

  const res = await supabase.from('User').insert(user);

  if (res.error) return "error";

  return "success";
}