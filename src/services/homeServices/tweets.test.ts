import { test, expect } from 'vitest';
import { addTweet } from './getTweets'; // Adjust the path accordingly
import { supabase } from '@config/supabase';

test('addTweet inserts a tweet successfully', async () => {
  const tweetData = {
    User_Id: 123,
    Content: 'Hello, world!',
    Img_Url: 'https://example.com/image.jpg',
  };

  // Mock the supabase.functions.invoke method
  const mockInvoke = () => ({ data: 'Tweet inserted successfully' });
  // Save the original implementation of supabase.functions.invoke
  const originalInvoke = supabase.functions.invoke;
  // Replace supabase.functions.invoke with the mock function
  supabase.functions.invoke = mockInvoke;

  // Call the addTweet function
  const result = await addTweet(tweetData);

  // Expectations
  expect(result).toEqual('Tweet inserted successfully');

  // Restore the original implementation of supabase.functions.invoke
  supabase.functions.invoke = originalInvoke;
});
