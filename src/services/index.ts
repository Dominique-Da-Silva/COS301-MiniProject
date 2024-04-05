import { signInWithGithub, signInWithGoogle, signInUser, signUpNewUser, signOut, isUserLoggedIn, addUserToDatabase  } from "./auth/auth.ts";
import { uploadProfile } from "./storage/storage.ts";
import { updateUsername } from './profileServices/updateUsername.ts';
import {fetchUsers} from "./homeServices/getUsersData.ts"
import {fetchTweets}  from "./homeServices/getTweets.ts"
import {fetchUserByUsername}  from "./usersProfileServices/getUserByUsername.ts"
import {followUser}  from "./usersProfileServices/followUser.ts"
import {unfollowUser}  from "./usersProfileServices/unfollowUser.ts"
import { insertProfileDetails, updateProfileDetails } from "./profileServices/updateProfileDetails";
import { addTweet } from "./homeServices/getTweets";
import { getTrendingTopics } from "./homeServices/getTweets.ts";

export { signInWithGithub, signInWithGoogle, signOut, signInUser,
    signUpNewUser, isUserLoggedIn, uploadProfile, updateUsername,
    fetchUsers, fetchTweets, fetchUserByUsername, addTweet,
    followUser, unfollowUser, insertProfileDetails, updateProfileDetails, addUserToDatabase,getTrendingTopics};
