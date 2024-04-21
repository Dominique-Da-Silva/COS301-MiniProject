import { supabase } from '@config/supabase';

export async function countLikes(tweetId: number): Promise<number> {
    try {
        const { data: likes, error } = await supabase
            .from('Likes')
            .select('Tweet_Id')
            .eq('Tweet_Id', tweetId);

        if (error) {
            throw error;
        }

        return likes.length || 0;
    } catch (error) {
        console.error('Error counting likes:', error.message);
    }
}