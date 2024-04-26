import { supabase } from '@config/supabase';

export async function countSaves(tweetId: number): Promise<number> {
    try {
        const { count} = await supabase
            .from('Saves')
            .select('Tweet_Id', {count: 'exact'})
            .eq('Tweet_Id', tweetId);

        return count ?? 0;
    } catch (error) {
        console.error('Error counting saves:', error.message);
    }
}