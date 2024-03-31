import { render } from '@testing-library/react';
import { describe, test} from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { countFollowers, followUser, unfollowUser } from '@services/index';

describe('ProfilePage component', () => {
    
    test("renders without crashing", () => {
      render(
        <Router>
            <Routes>
              <Route path="/" element={<ProfilePage />} />
            </Routes>
        </Router>);
    });

    /*test('followUser function successful', async () => {
        // Test following a user
        const loggedInUserId = 5011; // Replace with a valid logged-in user ID (5011)
        const userToFollowId = 5009; // Replace with a valid user ID to follow (5009)
        const followResult = await followUser(loggedInUserId, userToFollowId);
        expect(followResult).toHaveProperty('success', true);
    });

    test("throws error when trying to follow a user that is already followed", async () => {
        const loggedInUserId = 5009;
        const userToFollowId = 5011;
        await expect(followUser(loggedInUserId, userToFollowId)).rejects.toThrow();
    });


    test('unfollowUser function successful', async () => {
        // Test unfollowing a user
        const loggedInUserId = 5009; // Replace with a valid logged-in user ID (5009)
        const userToUnfollowId = 5011; // Replace with a valid user ID to unfollow (5011)
        const unfollowResult = await unfollowUser(loggedInUserId, userToUnfollowId);
        expect(unfollowResult).toHaveProperty('success', true);
    });


    test("throws error when trying to unfollow a user that is not followed", async () => {
        const loggedInUserId= 5009; 
        const userToUnfollowId = 2; 
        await expect(unfollowUser(loggedInUserId, userToUnfollowId)).rejects.toThrow();
    });*/

});