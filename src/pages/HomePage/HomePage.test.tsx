import { render } from '@testing-library/react';
import getTimeDisplay from './HomePage';
import HomePage from './HomePage';
import { supabase } from '@config/supabase';




test('renders HomePage component without crashing', () => {
  render(<HomePage />);
});




// Mocking the funcs used for supa base
jest.mock('@config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({ data: [], error: null }),
    }),
  },
}));

// Mocking the diffrent rendering components
//These basically are mock functions that are called instead of the actual ones when a componnet is rendered

jest.mock('@components/index', () => ({
  Tweet: jest.fn().mockReturnValue(null),
  TrendingTopics: jest.fn().mockReturnValue(null),
  WhoToFollow: jest.fn().mockReturnValue(null),
  SideNavbar: jest.fn().mockReturnValue(null),
  CreateTweet: jest.fn().mockReturnValue(null),
}));


//function test for fetchtweets

describe('HomePage', () => {
  test('fetches Tweets from the Tweets table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('Tweets');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('Tweets').select).toHaveBeenCalled();

  });
});

// function test for fetchusers

describe('HomePage', () => {
  test('fetches users from the User table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('User');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('User').select).toHaveBeenCalled();

  });
});

// function test for fetchSaves

describe('HomePage', () => {
  test('fetches saves from the saves table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('Saves');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('Saves').select).toHaveBeenCalled();

  });
});

// function test for fetchComments

describe('HomePage', () => {
  test('fetches Comments from the Comments table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('Comments');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('Comments').select).toHaveBeenCalled();

  });
});

// function test for FetchRetweets

describe('HomePage', () => {
  test('fetches Retweets from the Retweets table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('Retweets');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('Retweets').select).toHaveBeenCalled();

  });
});

// function test for FetchLikes

describe('HomePage', () => {
  test('fetches Likes from the Likes table', async () => {
    // Render the component
    render(<HomePage />);

    // Check if supabase.from has been called with the correct table name
    expect(supabase.from).toHaveBeenCalledWith('Likes');

    // Check if supabase.from(...).select has been called
    expect(supabase.from('Likes').select).toHaveBeenCalled();

  });

// testing the getTimedisplay function


describe('getTimeDisplay function', () => {
  test('if diff is less than 60 mins', () => {
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes ago i think?
    expect(getTimeDisplay(pastTime.toISOString())).toBe('30m');
  });

  test('if diff is less than 24 hours but more than 60 mins', () => {
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - 5 * 3600000); // 5 hours ago i think?
    expect(getTimeDisplay(pastTime.toISOString())).toBe('5h');
  });

  test('if diff is more than 24 hours', () => {
    const pastTime = new Date('2024-03-20T12:00:00Z'); // just picked a date that will always be in the past
    expect(getTimeDisplay(pastTime.toISOString())).toBe('Mar 20');
  });
})
});
