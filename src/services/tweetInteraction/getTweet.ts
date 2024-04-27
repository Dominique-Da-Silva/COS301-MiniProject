import { supabase } from '@config/supabase';

export async function getTweet(tweetId: number): Promise<any[]> {
    try {
        // Fetch tweets made by the user with the provided user ID
        const { data: tweet, error } = await supabase
            .from('Tweets')
            .select('*, User (*, Profile (Img_Url))')
            .eq('Tweet_Id', tweetId);

        if (error) {
            console.error('Error fetching user tweets.');
            return [];
        }

        if (!tweet || tweet.length === 0) {
            return [];
        }

        return tweet;
    } catch (error) {
        console.error('Error fetching user tweets:', error.message);
    }
}
