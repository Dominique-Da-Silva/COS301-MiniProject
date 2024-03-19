// ProfilePage.test.js
import { test } from 'vitest';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

// Mocking the supabase module to avoid actual API calls during testing
jest.mock('@config/supabase', () => ({
    // Mocking the supabase client object
    supabase: {
        // Mocking the auth object of the supabase client
        auth: {
            getUser: jest.fn().mockResolvedValue({ data: { user: { id: 1 } } })
        },

        from: () => ({

            //Promise.resolve() returns a new Promise object that is resolved with the given value.
            
            // Mocking the Select method to simulate a Select query 
            select: () => ({
                eq: () => ({ 
                    single: () => Promise.resolve({ data: {} })
                })
            }),

            // Mocking the update method to simulate a update query
            update: () => ({
                eq: () => ({
                    single: () => Promise.resolve({ data: {} })
                })
            }),

            // Mocking the storage object of supabase to simulate storage operations
            storage: {
                from: () => ({
                    upload: () => Promise.resolve({ data: { path: 'mock/path' } }),
                    getPublicUrl: () => Promise.resolve({ data: { publicUrl: 'mock/url' } })
                })
            }
        })
    }
}));

test('renders without crashing', () => {
  render(<ProfilePage />);
});
