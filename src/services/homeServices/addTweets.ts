import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'
import { CreateTweetNotification } from './notifications';

const addTweet = async (tweetData: any) => {
  try {
    const { data, error } = await supabase.functions.invoke('addTweet', {
      body: {tweetData}
    });
    if(error) throw error;
    console.log(data[0].Tweet_Id);
    // Create a notification for the tweet
    CreateTweetNotification(data[0].Tweet_Id);
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