import {supabase} from '@config/supabase';

export const fetchUserByUsername = async (username: string) => {
  try {
    // Query the users table to fetch user data
    const { data: userData, error } = await supabase.from('User').select('User_Id, Username, Name, Surname, Created_at, auth_id').eq('Username', username).single();

    if (error) {
      throw new Error('Failed to fetch user data based on username');
    }
    return userData;

  } catch (error) {
    console.error('Error fetching user data based on username:', error);
    throw error;
  }
};

//to fetch profile details (based on UserID) refer to /services/profileServices/getProfile.ts