import { supabase } from "@config/supabase";

interface UserProfile {
    username: string;
    name: string;
    surname: string;
    bio: string;
    img_url: string;
}

export async function searchUsers(query: string): Promise<UserProfile[]> {
    try {
        const { data: usersData, error: usersError } = await supabase
            .from('User')
            .select('User_Id, Username, Name, Surname')
            .or(`Username.ilike.%${query}%,Name.ilike.%${query}%,Surname.ilike.%${query}%`);

        if (usersError) {
            console.error('Error searching for users.');
            return [];
        }
        
        const profiles: UserProfile[] = [];

        for (const user of usersData) {
            const { data: profileData, error: profileError } = await supabase
                .from('Profile')
                .select('Bio, Img_Url')
                .eq('User_Id', user.User_Id)
                .single();

            if (profileError) {
                console.error('Error fetching profile for user.');
            }
            const userProfile: UserProfile = {
                username: user.Username,
                name: user.Name,
                surname: user.Surname,
                bio: profileData?.Bio || '',
                img_url: profileData?.Img_Url || '',
            };
            console.log(userProfile);
            profiles.push(userProfile);
        }

        return profiles;

    } catch (error: any) {
        console.error('Error searching for users:', error.message);
        return [];
    }
}
