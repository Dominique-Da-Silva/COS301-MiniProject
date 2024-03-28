import {supabase} from '@config/supabase';

export const updateProfileDetails = async(UserData:  {
    Bio?: string;
    Theme?: boolean;
    Profile_Type?: string;
    Location?: string;
    Website?: string;
    }
) => 
{
    const { error } = await supabase
        .from('Profile')
        .update({
            Bio: UserData.Bio,
            Theme: UserData.Theme,
            Profile_Type: UserData.Profile_Type,
            Img_Url: import.meta.env.VITE_SUPABASE_URL + "/storage/v1/object/sign/media/profile_images/" + "" + "?token=" + import.meta.env.VITE_SUPABASE_KEY + "&t=" + new Date().toISOString(),
            Banner_Url: import.meta.env.VITE_SUPABASE_URL + "/storage/v1/object/sign/media/banner_images/" + "" + "?token=" + import.meta.env.VITE_SUPABASE_KEY + "&t=" + new Date().toISOString(),
            Location: UserData.Location,
            Website: UserData.Website,
        })
        .eq('User_Id', 1)
}