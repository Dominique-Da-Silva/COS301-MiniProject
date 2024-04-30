import { test, 
  expect 
} from 'vitest';
import { addTweet } from './addTweets'; 

test('addTweet inserts a tweet successfully', async () => {
///check the validity of the function addTweet


  // Mock tweet data
  const tweetData = {
    User_Id: 13,
    Content: 'making this tweet from a test file',
    Img_filename: 'null',
    Img_file: null // Mock image file
  };

  // Call the addTweet function with mock Supabase
  const result = await addTweet(tweetData);

  // Expectations
  expect(result.length).toBeGreaterThan(0); // Check if result contains at least one item
  expect(result[0].Content).toBe('making this tweet from a test file'); // Check if the first item has the expected content
  expect(result[0].User_Id).toBe(13); // Check if the first item has the expected user ID

  // Additional assertions if needed
});
