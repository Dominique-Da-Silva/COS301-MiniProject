import { supabase } from "@config/supabase";

export const countFollowing = async (userId: string) => {
    try {
      const { data: followingData, error: followingError } = await supabase.from('Followers')
      .select('Following_Id').eq('Followed_Id', userId);
  
      if (followingError) {
        throw followingError;
      }
  
      return followingData.length;
    } catch (error) {
      console.error('Error counting following:', error);
    }
};