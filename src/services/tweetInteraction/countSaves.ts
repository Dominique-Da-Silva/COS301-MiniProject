import { supabase } from '@config/supabase';

export async function countSaves(tweetId: number): Promise<number> {
    try {
        const { data: saves, error } = await supabase
            .from('Saves')
            .select('Tweet_Id')
            .eq('Tweet_Id', tweetId);

        if (error) {
            throw error;
        }

        return saves.length || 0;
    } catch (error) {
        console.error('Error counting saves:', error.message);
    }
}