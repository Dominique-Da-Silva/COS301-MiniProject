import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'
// FETCHING TWEETS AND THEIR RESPECTIVE STATS
const fetchTweets = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('getTweets', {
        //this is part of the body of the http request that is passed into the function, I put it here
        // for post requests of making tweets and so forth
        body: {},
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (error) {
        throw error;
      }
      return data;

    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

   export {fetchTweets};

  const addTweet = async (tweetData: any) => {
  try {
    const { data, error } = await supabase.functions.invoke('addTweet', {
      body: {tweetData}
    });
    if(error) throw error;
    return data;

  } catch (error) {
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};

export { addTweet };

const getTrendingTopics = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('getTrendingTopics', {
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (error) {
      throw error;
    }
    return data;

  } catch (error) {
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};
/**Here's the structure of getTrending JSON data:

The JSON data is an array of objects.
Each object represents a tag and contains the following key-value pairs:
 "Tag_Id": The ID of the tag.
 "Tag_Name": The name of the tag.
 "Tweet_Tags": An array of objects representing tweet tags associated with this tag. Each tweet tag object contains:
    "Tweets": An object representing one tweet associated with this tweet tag. The tweet object contains:
          "Content": The content of the tweet.
          "Img_Url": The URL of the image attached to the tweet (if any).
          "User_Id": The ID of the user who posted the tweet.
          "Tweet_Id": The ID of the tweet.
          "Created_at": The timestamp when the tweet was created.
  "created_at": The timestamp when the tweet tag was created.
"tweet_count": The count of tweets associated with this tag. */

 export {getTrendingTopics};

 const likeTweet = async (tweetData: any) => {//the functions expects User_Id,Tweet_Id only
    if(tweetData.User_Id != null){
      try {
       const { data:like, error } = await supabase
      .from('Likes')
      .insert([
        { tweetData },
      ])
      .select()
      if(error) throw error;

      return like;
      } catch (error) {
        if (error instanceof FunctionsHttpError) {
          const errorMessage = await error.context.json()
          console.log('Function returned an error', errorMessage)
        } else if (error instanceof FunctionsRelayError) {
          console.log('Relay error:', error.message)
        } else if (error instanceof FunctionsFetchError) {
          console.log('Fetch error:', error.message)
        }
        throw error; // Re-throw the error to handle it in the calling code if needed
      }
      
    }
    else {
      return { error: "User ID is missing or invalid." };
    }
 };
 export {likeTweet};

 const unlikeTweet = async (tweetData: any) => {//the functions expects User_Id,Tweet_Id only
  if(tweetData.User_Id != null){
    try {

      const { error } = await supabase
      .from('Likes')
      .delete()
      .eq('Tweet_Id', tweetData.Tweet_Id)
      .eq('User_Id',tweetData.User_Id)
              
    if(error) throw error;

    return { success: "Tweet unliked successfully." };

    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
    
  }
  else {
    return { error: "User ID is missing or invalid." };
  }
};
export {unlikeTweet};

const reTweet = async (tweetData: any) => {//the functions expects User_Id,Tweet_Id only
  if(tweetData.User_Id != null){
    try {
     const { data:retweet, error } = await supabase
    .from('Retweets')
    .insert([
      { tweetData },
    ])
    .select()

    if(error) throw error;

    return retweet;
    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
    
  }
  else {
    return { error: "User ID is missing or invalid." };
  }
};
export {reTweet};
const undoRetweet = async (tweetData: any) => {//the functions expects User_Id,Tweet_Id only
  if(tweetData.User_Id != null){
    try {
     
    const { error } = await supabase
    .from('Retweets')
    .delete()
    .eq('Tweeter_Id', tweetData.User_Id)
    .eq('Tweet_Id',tweetData.Tweet_Id)
        
    if(error) throw error;

    return { success: "Tweet unretweeted successfully." };
    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
    
  }
  else {
    return { error: "User ID is missing or invalid." };
  }
};
export {undoRetweet};

const follow = async (followData: any) => {//the functions expects User_Id,following_Id(following) only
  if(followData.User_Id != null){
    try {
     const { data:follow, error } = await supabase
    .from('Followers')
    .insert([
      { followData },
    ])
    .select()

    if(error) throw error;

    return follow;
    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
    
  }
  else {
    return { error: "User ID is missing or invalid." };
  }
};
export {follow};

const unfollow = async (followData: any) => {//the functions expects User_Id,following_Id(following) only
  if(followData.User_Id != null){
    try {
     const { error } = await supabase
    .from('Followers')
    .delete()
    .eq("Followed_Id",followData.User_Id)
    .eq("Following_Id",followData.following_Id)

    if(error) throw error;

    return { success: "unfollowed succesfully." };

    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
    
  }
  else {
    return { error: "User ID is missing or invalid." };
  }
};
export {unfollow};

