import { supabase } from "@config/supabase";

export const followUser = async (loggedInUserId: number, userToFollowId: number) => {
    try {
        // Check if the logged-in user is already following the userToFollow
        const { data: existingFollowData} = await supabase.from('Followers').select('id').eq('Following_Id', loggedInUserId).eq('Followed_Id', userToFollowId).single();

        if (existingFollowData) {
            console.log(`User ${loggedInUserId} is already following user ${userToFollowId}`);
            return; // Return early if the user is already following
        }

        // If not already following, insert a new entry in the Followers table
        await supabase.from('Followers').insert([{ Following_Id: loggedInUserId, Followed_Id: userToFollowId }]);


        console.log(`User ${loggedInUserId} followed user ${userToFollowId}`);
        // Return some response indicating success
        return { success: true };

    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
};