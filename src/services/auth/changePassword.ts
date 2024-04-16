import { supabase } from "@config/supabase";

export async function changePassword(oldPassword: string, newPassword: string): Promise<"success" | "error" | "same password"> {
    try {
        if (oldPassword === newPassword) {
            return "same password";
        }

        const { error } = await supabase.auth.update({
            oldPassword: oldPassword,
            newPassword: newPassword,
        });

        if (error) {
            //console.error('Error changing password:', error.message);
            return "error";
        }
        return "success";

    } catch (error) {
        console.error('Error changing password:', error.message);
    }
}
