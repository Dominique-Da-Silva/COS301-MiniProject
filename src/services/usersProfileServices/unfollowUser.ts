import { supabase } from "@config/supabase";

export const unfollowUser = async (loggedInUserId: number, userToUnfollowId: number) => {
    try {
        // Check if the logged-in user is following the userToUnfollow
        const { data: existingFollowData} = await supabase.from('Followers').select('id').eq('Following_Id', loggedInUserId).eq('Followed_Id', userToUnfollowId).single();

        if (!existingFollowData) {
            console.log(`User ${loggedInUserId} is not following user ${userToUnfollowId}`);
            return; // Return early if the user is not following
        }

        // If following, delete the entry from the Followers table
        const { error: deleteError } = await supabase.from('Followers').delete().eq('Following_Id', loggedInUserId).eq('Followed_Id', userToUnfollowId);

        if (deleteError) {
            throw deleteError;
        }

        console.log(`User ${loggedInUserId} unfollowed user ${userToUnfollowId}`);
        // Return some response indicating success
        return { success: true };


    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
};