// ProfilePage.test.js
import { test } from 'vitest';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

// Mock supabase configuration
jest.mock('@config/supabase', () => ({
  supabaseUrl: '',
  supabaseKey: ''
}));

test('renders without crashing', () => {
  render(<ProfilePage />);
});
