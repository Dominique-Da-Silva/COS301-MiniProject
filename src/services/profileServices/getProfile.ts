import { supabase } from "@config/supabase";

export const fetchProfileDetails = async (userId: number): Promise<any> => {
    try {
      const { data: profileData, error: profileError } = await supabase.from('Profile')
      .select('*')
      .eq('User_Id', userId).single();
  
      if (profileError) {
        throw profileError;
      }
  
      return profileData;
      
    } catch (error) {
      return "Error fetching profile details.";
    }
};