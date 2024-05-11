import { supabase } from '@config/supabase';

interface TweetInfo {
    tweetid: number;
    userid: number;
    profile_img: string | null;
    name: string;
    surname: string;
    username: string;
    comments: number;
    likes: number;
    retweets: number;
    saves: number;
    content: string | null;
    img_url: string | null;
    created_at: string;
}

const emptyTweet: TweetInfo = {
    tweetid: 0,
    userid: 0,
    profile_img: null,
    name: '',
    surname: '',
    username: '',
    comments: 0,
    likes: 0,
    retweets: 0,
    saves: 0,
    content: null,
    img_url: null,
    created_at: ''
}

export async function getTweet(tweetId: number) {
    try {
        // Fetch tweets made by the user with the provided user ID
        const { data: tweet, error } = await supabase
            .from('Tweets')
            .select(`Tweet_Id,
                User_Id,
                Content,
                Img_Url,
                Created_at,
                Retweets:Retweets (*),
                Likes:Likes (*),
                Saves:Saves (*),
                Comments:Comments (*)`)
            .eq('Tweet_Id', tweetId).single();

        if (error) {
            console.error('Error fetching user tweets.');
            return emptyTweet;
        }

        if (!tweet) {
            return emptyTweet;
        }
        // console.log(tweet);

        const { data: profileData, error: profileError } = await supabase.from('Profile')
            .select('*')
            .eq('User_Id', tweet.User_Id).single();

        if (profileError) {
            throw profileError;
        }

        const { data: userData, error: usererror } = await supabase.from('User')
            .select('Username, Name, Surname')
            .eq('User_Id', tweet.User_Id).single();
            if (usererror) {
                throw new Error('Failed to fetch user data based on username');
              }
        

        // console.log(profileData);

        const tweetdetails: TweetInfo = {
            tweetid: tweet.Tweet_Id,
            userid: tweet.User_Id,
            profile_img: profileData.Img_Url,
            name: userData.Name,
            surname: userData.Surname,
            username: userData.Username,
            comments: tweet.Comments.length,
            likes: tweet.Likes.length,
            retweets: tweet.Retweets.length,
            saves: tweet.Saves.length,
            content: tweet.Content,
            img_url: tweet.Img_Url,
            created_at: tweet.Created_at
        }
        // console.log(tweetdetails);
        return tweetdetails;
       
    } catch (error: any) {
        console.error('Error fetching user tweets:', error.message);
        return emptyTweet;
    }
}
