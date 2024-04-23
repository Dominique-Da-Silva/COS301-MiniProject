import { supabase } from '@config/supabase';

export async function countComments(tweetId: number): Promise<number> {
    try {
        const { data: comments, error } = await supabase
            .from('Comments')
            .select('Tweet_Id')
            .eq('Tweet_Id', tweetId);

        if (error) {
            throw error;
        }

        return comments.length || 0;
    } catch (error) {
        console.error('Error counting comments:', error.message);
    }
}