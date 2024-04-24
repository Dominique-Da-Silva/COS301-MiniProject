import { supabase } from "@config/supabase";

//followers --> checkking for my fans --> i.e. my ID should be the followed id

export const countFollowers = async (userId: string) => {
    try {
      const { data: followersData, error: followersError } = await supabase.from('Followers')
      .select('Following_Id')
      .eq('Followed_Id', userId);
  
      if (followersError) {
        throw followersError;
      }
  
      return followersData.length;

    } catch (error) {
      console.error('Error counting followers:', error);
    }
    //return undefined;
};