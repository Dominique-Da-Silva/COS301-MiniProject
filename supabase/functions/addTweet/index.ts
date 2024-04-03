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

    // Extract data from the request body
    const { User_Id, Content, Img_Url } = await req.json(); // Parse the entire request body once
    console.log('User_Id:', User_Id);
    console.log('Content:', Content);
    console.log('Img_Url:', Img_Url);


    // Insert the extracted data into the database
    const { data: insertedTweet, error } = await supabase
      .from('Tweets')
      .insert([{ User_Id, Content, Img_Url }])
      .select();

    if (error) {
      throw error;
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


