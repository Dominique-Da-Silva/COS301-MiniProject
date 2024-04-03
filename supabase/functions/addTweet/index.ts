import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
import { corsHeaders } from '../_shared/cors.ts'

console.log("Hello from Functions!")

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {});
Deno.serve(async (req) => {
  // This is needed because we are planning to invoke this function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {

    const requestBody = await req.json();
    const User_Id = requestBody.User_Id;
    const Content = requestBody.Content;
    //instantiate a variable for a file and pass it to upload
    const { data: uploadedImage, error: imageError } = await supabase.storage
      .from('media')
      .upload(`tweet_images/${requestBody.Img_filename}`, requestBody.Img_file, { upsert: false,
        contentType: 'image/jpg', // Set the content type of the image
      });

    if (imageError) {
      console.log(imageError);
      throw imageError;
    }
    
    console.log("uploaded in media");

    const tweetData = {
      User_Id,
      Content,
      Img_Url: uploadedImage.fullPath
    };
    // Insert tweet data into the database
    const { data: insertedTweet, error: tweetError } = await supabase
      .from('Tweets')
      .insert([tweetData])
      .select();

    if (tweetError) {
      throw tweetError;
    }

    console.log('Tweet inserted successfully:', insertedTweet);

    // Return the inserted tweet as response
    return new Response(JSON.stringify(insertedTweet), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error posting tweet:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
