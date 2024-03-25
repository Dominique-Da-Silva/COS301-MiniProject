import { supabase } from '@config/supabase'

export async function uploadProfile(file: File) {
    //get current users id
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    const { error } = await supabase.storage.
        from("media").upload(`profile_images/${user.data.user.id}`, file, {
            upsert: true,
        });

    if (error) {
        return "error";
    } else {
        return "success";
    }
}