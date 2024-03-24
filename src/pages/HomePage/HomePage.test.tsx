import { render, waitFor } from '@testing-library/react';
import HomePage from './HomePage';

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
    expect(supabase.from().select).toHaveBeenCalled();

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
    expect(supabase.from().select).toHaveBeenCalled();

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
    expect(supabase.from().select).toHaveBeenCalled();

  });
});



