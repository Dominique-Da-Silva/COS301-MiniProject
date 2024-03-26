import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

// Importing the supabase module to mock it
import { supabase } from '@config/supabase';

// Mocking the supabase module to avoid actual API calls during testing
jest.mock('@config/supabase', () => ({
    // Mocking the supabase client object
    supabase: {
        // Mocking the auth object of the supabase client
        auth: {
            getUser: jest.fn().mockResolvedValue({ data: { user: { id: 1 } } }) as jest.Mock,
            
        },

        from: () => ({
            // Mocking the Select method to simulate a Select query 
            select: () => ({
                eq: () => ({ 
                    single: () => Promise.resolve({ data: {} })
                })
            }),

            // Mocking the update method to simulate an update query
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

console.error = jest.fn();

test('renders without crashing', () => {
    render(<ProfilePage />);
});

describe('fetchUserProfile', () => {
    test('fetches user profile data successfully', async () => {
        // Render ProfilePage component
        render(<ProfilePage />);
        
        // Wait for Profile page to be mounted
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Ensure that getUser and related methods are called, the ones we mocked earlier 
        expect(supabase.from('User').select().eq('User','User_Id').single).toHaveBeenCalled();
        expect(supabase.auth.getUser).toHaveBeenCalled();

        // make sure no error is called
        expect(console.error).not.toHaveBeenCalled();
    });

    test('handles errors gracefully', async () => {
        // Render ProfilePage component
        render(<ProfilePage />);

        // Wait for ProfilePage component to be mounted and ensure that fetchUserProfile function is called
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Ensure that getUser and related methods are called
        expect(supabase.auth.getUser).toHaveBeenCalled();

        // Ensure that console.error is called with the correct error message
        expect(console.error).toHaveBeenCalledWith('Error fetching user profile:', 'getUser error');
    });
});