import { test, expect } from 'vitest';
import { addTweet } from './getTweets'; 
import { supabase } from '@config/supabase';

test('addTweet inserts a tweet successfully', async () => {
  const tweetData = {
    User_Id: 13,
    Content: 'Hello, world!',
    Img_Url: 'https://example.com/image.jpg',
  };

  // Mock the supabase.functions.invoke method
  // const mockInvoke = () => ({ data: 'Tweet inserted successfully' });
  // Save the original implementation of supabase.functions.invoke
  const originalInvoke = supabase.functions.invoke;
  // Replace supabase.functions.invoke with the mock function
 // supabase.functions.invoke = mockInvoke;

  // Call the addTweet function
  const result = await addTweet(tweetData);

  // Expectations
  expect(result.length).toBeGreaterThan(0); // Check if result contains at least one item
  expect(result[0].Content).toBe('Hello, world!'); // Check if the first item has the expected content
  expect(result[0].User_Id).toBe(13); // Check if the first item has the expected user ID
  

  // Restore the original implementation of supabase.functions.invoke
  supabase.functions.invoke = originalInvoke;
});
