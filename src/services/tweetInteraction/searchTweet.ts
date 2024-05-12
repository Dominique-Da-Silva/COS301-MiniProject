import { supabase } from "@config/supabase";

// Define the type for tweet information for display purposes
interface TweetInfo {
    User_Id: number | undefined;
    username: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    content: string;
    image: string;
    created: any;
    Retweets: any;
    Likes: any;
    Saves: any;
    Comments: any;
}

const emptyTweet: TweetInfo = {
    User_Id: 0,
    username: '',
    name: '',
    surname: '',
    content: '',
    image: '',
    created: '',
    Retweets: 0,
    Likes: 0,
    Saves: 0,
    Comments: 0,
};

export async function searchTweet(query: string) {
    try {
        const { data: tweetsData, error: tweetsError } = await supabase
            .from('Tweets')
            .select(`User_Id, Content, Img_Url, Created_at,
                Retweets:Retweets (*),
                Likes:Likes (*),
                Saves:Saves (*),
                Comments:Comments (*)`)
            .ilike('Content', `%${query}%`);

        if (tweetsError) {
            console.error('Error searching for tweets.');
            return [emptyTweet];
        }

        const tweets: TweetInfo[] = []; // Change the type of the array to TweetInfo[]

        for (const tweet of tweetsData) {
            const { data: userData, error: userError } = await supabase
                .from('User')
                .select('User_Id, Username, Name, Surname')
                .eq('User_Id', tweet.User_Id)
                .single();

            if (userError) {
                console.error('Error fetching user data for the tweet.');
            }

            const tweetInfo: TweetInfo = {
                User_Id: userData?.User_Id,
                username: userData?.Username,
                name: userData?.Name,
                surname: userData?.Surname,
                content: tweet.Content ?? "",
                image: tweet.Img_Url || '',
                created: tweet.Created_at,
                Retweets: tweet.Retweets || 0,
                Likes: tweet.Likes || 0,
                Saves: tweet.Saves || 0,
                Comments: tweet.Comments || 0,
            };
            tweets.push(tweetInfo);
        }
        return tweets;

    } catch (error: any) {
        console.error('Error searching for tweets:', error.message);
        return [emptyTweet];
    }
}