import { supabase } from '@config/supabase';

export async function countRetweets(tweetId: number): Promise<number> {
    try {
        const { data: retweets, error } = await supabase
            .from('Retweets')
            .select('Tweet_Id')
            .eq('Tweet_Id', tweetId);

        if (error) {
            throw error;
        }

        return retweets.length || 0;
    } catch (error) {
        console.error('Error counting retweets:', error.message);
    }
}