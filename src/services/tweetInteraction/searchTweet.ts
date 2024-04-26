import { supabase } from "@config/supabase";

export async function searchTweet(query: string): Promise<Tweet[]> {
    try {
        const { data: tweetsData, error: tweetsError } = await supabase
            .from('Tweets')
            .select('User_Id, Content, Img_Url, Created_at')
            .ilike('Content', `%${query}%`);

        if (tweetsError) {
            console.error('Error searching for tweets.');
            return [];
        }

        const tweets: string[] = [];

        for (const tweet of tweetsData) {

            const{data: userData, error: userError} = await supabase
                .from('User')
                .select('Username, Name, Surname')
                .eq('User_Id', tweet.User_Id)
                .single();

            if (userError) {
                console.error('Error fetching user data for the tweet.');
            }

            const tweetInfo = {
                username : userData?.Username,
                name : userData?.Name,
                surname : userData?.Surname,
                content : tweet.Content,
                image : tweet.Img_Url || '',
                created : tweet.Created_at,
            };
            tweets.push(tweetInfo);
        }
        return tweets;

    } catch (error) {
        console.error('Error searching for tweets:', error.message);
        return [];
    }
}
