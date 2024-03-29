import {supabase} from '@config/supabase';

export const updateUsername = async (username: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

    //check if username is already taken
    const { data: users, error: error2 } = await supabase.from("User").select("Username").eq('Username', username);
    if (users && users.length > 0) {
        return "Username already taken";
    }

    const { error} = await supabase.from("User").update({
        Username: username,
    }).eq('auth_id', logged_user.data.user.id);

    if (error) {
        return "Error updating username";
    }
    else {
        return "Username updated successfully";
    }
};