import {supabase} from '@config/supabase';

export const updateUsername = async (username: string) => {
    const logged_user = await supabase.auth.getUser();
    if (!logged_user.data.user) return "error";

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