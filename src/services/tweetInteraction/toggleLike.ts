import { supabase } from '@config/supabase';

export async function checkIfLiked(tweetId: number, userId: number): Promise<boolean> {
    try {
        // Check for existing like
        const { data: existingLike, error } = await supabase
            .from('Likes')
            .select('*')
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId)
            .single();

        if (error) {
            console.error('Error checking whether the tweet has been liked:', error.message);
            return false;
        }

        return true;; // Return true if existingLike is not null or undefined
    } catch (error) {
        console.error('Error checking whether the tweet has been liked:', error.message);
    }
}

export async function likeTweet(tweetId: number, userId: number): Promise<boolean> {
    try {
        // Like the tweet
        await supabase.from('Likes').insert([{ Tweet_Id: tweetId, User_Id: userId }]);
        return true;
    } catch (error) {
        console.error('Error liking the tweet:', error.message);
    }
}

export async function unlikeTweet(tweetId: number, userId: number): Promise<boolean> {
    try {
        // Unlike the tweet
        const { error } = await supabase
            .from('Likes')
            .delete()
            .eq('Tweet_Id', tweetId)
            .eq('User_Id', userId);

        if (error) {
            console.error('Error unliking the tweet:', error.message);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error unliking the tweet:', error.message);
    }
}
