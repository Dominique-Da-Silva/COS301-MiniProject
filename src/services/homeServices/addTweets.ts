import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const addTweet = async (tweetData: any) => {
    try {
      //console.log(tweetData);
      if(tweetData.Img_file)
      {
        const { data: uploadedImage, error: imageError } = await supabase.storage
        .from('media')
        .upload(`tweet_images/${tweetData.Img_filename}`, tweetData.Img_file, { upsert: false});
  
      if (imageError) {
        console.log(imageError);
        throw imageError;
      }
      
      //console.log("uploaded in media");
  
      const tweet = {
        User_Id:tweetData.User_Id,
        Content:tweetData.Content,
        Img_Url: uploadedImage.path
      };
      // Insert tweet data into the database
      const { data: insertedTweet, error: tweetError } = await supabase
        .from('Tweets')
        .insert([tweet])
  
      if (tweetError) {
        throw tweetError;
      }
      return insertedTweet;
    }
    else{
      const tweet = {
        User_Id:tweetData.User_Id,
        Content:tweetData.Content,
        Img_Url: null
      };
      // Insert tweet data into the database
      const { data: insertedTweet, error: tweetError } = await supabase
        .from('Tweets')
        .insert([tweet])
  
      if (tweetError) {
        throw tweetError;
      }
      return insertedTweet;
    }
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