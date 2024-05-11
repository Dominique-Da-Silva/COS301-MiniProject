import { supabase } from "@config/supabase";

async function longestFollowing(userID: number) {
  try {
      // Retrieve the list of users that the userID is following
      const { data: following, error } = await supabase
          .from('Followers')
          .select('Followed_Id, Follow_date')
          .eq('Following_Id', userID);

      if (error) throw error;

      // Sort the following array based on the Follow_date in ascending order
      following.sort((a, b) => new Date(a.Follow_date).getTime() - new Date(b.Follow_date).getTime());

      // Find the user who has been followed the longest
      const longestFollowedUser = following[0];

      // Choose 3 other random users from the following list
      const randomUsers = following.slice(1).sort(() => 0.5 - Math.random()).slice(0, 3);

      // Combine the correct answer and the random users
      const answerChoices = [longestFollowedUser, ...randomUsers];

      return answerChoices;
  } catch (error) {
      console.error(error);
      return null;
  }
}
export { longestFollowing };