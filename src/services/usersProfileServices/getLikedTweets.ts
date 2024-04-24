import { supabase } from '@config/supabase';

const getLikedTweets = async(userId: number)=>{
    try {
        // Fetch all tweets (ids) liked by the user
        const { data: likedTweets, error } = await supabase
            .from('Likes')
            .select('Tweet_Id')
            .eq('User_Id', userId);

        if (error) {
            throw error;
        }

        // Fetch details of the liked tweets from the Tweets table
        const { data: tweetsData, error: tweetsError } = await supabase
            .from('Tweets')
            .select(`
            *,
            Retweets (
             count()
            ),
            Likes(
              count()
            ),
            Saves(
              count()
            ),
            Comments(
              count()
            )`)
            .in('Tweet_Id', likedTweets);

        if (tweetsError) {
            throw error;
        }
        //no tweets with the id could be found in the Tweets table
        if (!tweetsData || tweetsData.length === 0) {
            return [];
        }

        return tweetsData;

    } catch (error) {
        console.error('Error fetching liked tweets:', error);
        throw error;
    }
};
export{getLikedTweets};
