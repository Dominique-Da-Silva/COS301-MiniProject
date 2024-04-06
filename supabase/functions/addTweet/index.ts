import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
import { corsHeaders } from '../_shared/cors.ts'

//console.log("Hello from Functions!")

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
    const request = await req.json();
    //console.log(request);
    if(request.tweetData.Img_file){
    //const {User_Id,Content,Img_filename,Img_file} = await req.json();
    console.log(request.tweetData.Img_file);
    //instantiate a variable for a file and pass it to upload
    const { data: uploadedImage, error: imageError } = await supabase.storage
      .from('media')
      .upload(`tweet_images/${request.tweetData.Img_filename}`, request.tweetData.Img_file, { upsert: false});

    if (imageError) {
      console.log(imageError);
      throw imageError;
    }
    
    //console.log("uploaded in media");

    const tweetData = {
      User_Id:request.tweetData.User_Id,
      Content:request.tweetData.Content,
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
    });}
    else{
      //const {User_Id,Content} = await req.json();
      const tweet = {
        User_Id:request.tweetData.User_Id,
        Content:request.tweetData.Content,
        Img_Url: null
      };
      // Insert tweet data into the database
      const { data: insertedTweet, error: tweetError } = await supabase
        .from('Tweets')
        .insert([tweet])
  
      if (tweetError) {
        throw tweetError;
      }
      // Return the inserted tweet as response
    return new Response(JSON.stringify(insertedTweet), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    }
  } catch (error) {
    console.error('Error posting tweet:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
