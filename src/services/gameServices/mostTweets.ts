import { supabase } from '@config/supabase';

async function mostTweets(userID: number) {
    try {
        // Retrieve the list of users that the userID is following
        const { data: following, error: followingError } = await supabase
           .from('Followers')
           .select('Followed_Id')
           .eq('Following_Id', userID);
        
        if (followingError) throw followingError;

        // Retrieve the count of tweets for each user that the userID is following
        const tweetCounts = await Promise.all(
            following.map(async (follow) => {
                const { count, error } = await supabase
                    .from('Tweets')
                    .select('count', { count: 'exact' })
                    .eq('User_Id', follow.Followed_Id ?? 0); // Use fallback value

                if (error) throw error;

                return { user: follow.Followed_Id, count: count ?? 0 }; // Ensure count is not null
            })
        );

        // Find the user with the most tweets, assuming this user has made any tweets
        const mostTweetingUser = tweetCounts.reduce((prev, current) => (current.count > prev.count ? current : prev), { user: 0, count: 0 }); // Initialize with fallback values

        // Choose 3 other random users from the following list
        const randomUsers = following.map(follow => follow.Followed_Id).filter(user => user !== mostTweetingUser.user).sort(() => 0.5 - Math.random()).slice(0, 3);

        // Combine the correct answer and the random users
        const answerChoices = [mostTweetingUser, ...randomUsers];
        return answerChoices;

    } catch (error) {
        console.error(error);
        return null;
    }
}
export { mostTweets };
