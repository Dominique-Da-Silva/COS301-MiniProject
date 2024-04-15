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
    if(tweetData.Img_file)
    {
      //console.log("From add tweet: "+tweetData.Img_file);
      const { data: uploadedImage, error: imageError } = await supabase.storage
      .from('media')
      .upload(`tweet_images/${tweetData.Img_filename}`, tweetData.Img_file, { upsert: false});

    if (imageError) {
      console.log(imageError);
      throw imageError;

    
    console.log("uploaded in media");
    console.log(uploadedImage);

    const {data:image_url} = supabase.storage.from("media").getPublicUrl(uploadedImage.path);
    console.log(image_url);


    const tweet = {
      User_Id:tweetData.User_Id,
      Content:tweetData.Content,
      Img_Url: image_url.publicUrl
    };
    // Insert tweet data into the database
    const { data: insertedTweet, error: tweetError } = await supabase
      .from('Tweets')
      .insert([tweet])
      .select()
      addTags(insertedTweet);
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
      .select()
      addTags(insertedTweet);
    if (tweetError) {
      throw tweetError;
    }
    //console.log("From addTweet:"+insertedTweet);
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

async function addTags(tweetData: any) {
  const regex = /#[^\s#]+/g; // Matches hashtags (#) followed by non-whitespace characters
  const matches = tweetData[0].Content.match(regex);
  if (matches && matches.length > 0) { // Found tags
      for (const match of matches) {
        //console.log(match);
        // Trim the tag to remove the '#' character
        const trimmedTag = match.substring(1);
        //(trimmedTag);
            const { data: storedTags, error } = await supabase
            .from('Stored_Tags')
            .select('Tag_Id, Tag_Name')
            .eq('Tag_Name', trimmedTag);
          if (error) {
            throw error
          } else {
            //console.log('Stored tags:', storedTags);
          }

          if (storedTags && storedTags.length>0) { // Tag exists, insert into tweet tags directly
              const { error } = await supabase
                  .from('Tweet_Tags')
                  .insert([
                      { Tweet_Id: tweetData[0].Tweet_Id, Tag_Id: storedTags[0].Tag_Id },
                  ])
                  .select();
                  //console.log("Inserted tags:"+tags);
              if (error) throw error;
          } else { // Store new tag and then insert into tweet tags
              const { data: insertedTag, error: tagInsertError } = await supabase
                  .from('Stored_Tags')
                  .insert([{ Tag_Name: trimmedTag }])
                  .select();

              if (tagInsertError) throw tagInsertError;

              const { error } = await supabase
                  .from('Tweet_Tags')
                  .insert([
                      { Tweet_Id: tweetData[0].Tweet_Id, Tag_Id: insertedTag[0].Tag_Id },
                  ])
                  .select();
                  //console.log("Inserted new tag: "+tags);
              if (error) throw error;
          }
      }
  } else {
    console.log("Did not find tags");
      return; // No tags found
  }
}

 export {getTrendingTopics};

//  let { data: Stored_Tags, error } = await supabase
//  .from('Stored_Tags')
//  .select("*")

//  // Filters
//  .eq('Tag_Name', 'Equal to')