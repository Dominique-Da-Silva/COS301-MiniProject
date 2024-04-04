import { supabase } from "@config/supabase";

// Function to fetch user profile data that is authorised
export const fetchUserData = async (): Promise<any> => {
  try {
        console.log(":pre")
        const { data: { user } } = await supabase.auth.getUser();
        console.log(":post")

        //console.log(user);
        if (!user) {
          return "User is not authenticated.";
        }
    
        const { data, error: error } = await supabase.from('User')
        .select('User_Id, Username, Name, Surname, Created_at, auth_id')
        .eq("auth_id", user.id).single();
    
        if (error) {
          throw error;
        }
        return data;
        
    } catch (error) {
        return "Error fetching authorised user.";
    }
};