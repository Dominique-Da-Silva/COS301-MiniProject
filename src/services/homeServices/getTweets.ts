import {supabase} from '@config/supabase';
// FETCHING TWEETS AND THEIR RESPECTIVE STATS
const fetchTweets = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('getTweets', {
        //this is part of the body of the http request that is passed into the function, I put it here
        // for post requests of making tweets and so forth
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
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
      body: JSON.stringify(tweetData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error adding tweet:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};

export { addTweet };