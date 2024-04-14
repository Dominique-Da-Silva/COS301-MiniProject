import { supabase } from "@config/supabase";

export const countFollowers = async (userId: string) => {
    try {
      const { data: followersData, error: followersError } = await supabase.from('Followers')
      .select('Followed_Id')
      .eq('Following_Id', userId);
  
      if (followersError) {
        throw followersError;
      }
  
      return followersData.length;

    } catch (error) {
      console.error('Error counting followers:', error);
    }
    return undefined;
};