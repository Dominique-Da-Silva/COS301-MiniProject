import { supabase } from "@config/supabase";

//following --> I am the fan --> i.e. my ID should be the following id

export const countFollowing = async (userId: string) => {
    try {
      const { data: followingData, error: followingError } = await supabase.from('Followers')
      .select('Followed_Id').eq('Following_Id', userId);
  
      if (followingError) {
        throw followingError;
      }
  
      return followingData.length;
    } catch (error) {
      console.error('Error counting following:', error);
    }
};