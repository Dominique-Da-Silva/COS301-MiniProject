import { test, expect } from 'vitest';
import { addTweet } from './getTweets'; 

test('addTweet inserts a tweet successfully', async () => {

  // Mock tweet data
  const tweetData = {
    User_Id: 13,
    Content: 'Its playoff season, lets go!',
    Img_filename: 'testImage.jpg',
    Img_file: {} // Mock image file
  };

  // Call the addTweet function with mock Supabase
  const result = await addTweet(tweetData);

  // Expectations
  expect(result.length).toBeGreaterThan(0); // Check if result contains at least one item
  expect(result[0].Content).toBe('Its playoff season, lets go!'); // Check if the first item has the expected content
  expect(result[0].User_Id).toBe(13); // Check if the first item has the expected user ID

  // Additional assertions if needed
});
