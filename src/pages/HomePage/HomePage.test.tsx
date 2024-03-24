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