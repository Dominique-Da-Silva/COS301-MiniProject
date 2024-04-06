import { signInWithGithub, signInWithGoogle, signInUser, signUpNewUser, 
    signOut, isUserLoggedIn, addUserToDatabase, getUserData  } from "./auth/auth.ts";
import { uploadProfile } from "./storage/storage.ts";
import { updateUsername } from './profileServices/updateUsername.ts';
import {fetchUsers} from "./homeServices/getUsersData.ts"
import {fetchTweets}  from "./homeServices/getTweets.ts"
import {fetchUserByUsername}  from "./usersProfileServices/getUserByUsername.ts"
import {followUser}  from "./usersProfileServices/followUser.ts"
import {unfollowUser}  from "./usersProfileServices/unfollowUser.ts"
import { insertProfileDetails, updateProfileDetails } from "./profileServices/updateProfileDetails";
import { addTweet } from "./homeServices/getTweets";
<<<<<<< HEAD
import {fetchUserData} from "./profileServices/getAuthUser.ts";
import {countFollowers} from "./profileServices/countFollowers.ts";
import {countFollowing} from "./profileServices/countFollowing.ts";
import {fetchProfileDetails} from "./profileServices/getProfile.ts";
import {uploadImageAndGetURL} from "./profileServices/uploadProfileImage.ts";
=======
import { getTrendingTopics } from "./homeServices/getTweets.ts";
>>>>>>> b712f0ed3c89e4d32e409bed0d945aeee0540cdb

export { signInWithGithub, signInWithGoogle, signOut, signInUser,
    signUpNewUser, isUserLoggedIn, uploadProfile, updateUsername,
    fetchUsers, fetchTweets, fetchUserByUsername, addTweet,
<<<<<<< HEAD
    followUser, unfollowUser, insertProfileDetails, updateProfileDetails, addUserToDatabase,
    fetchUserData, countFollowers, countFollowing, fetchProfileDetails,
    uploadImageAndGetURL};
=======
    followUser, unfollowUser, insertProfileDetails, updateProfileDetails, 
    addUserToDatabase, getUserData, getTrendingTopics};
>>>>>>> b712f0ed3c89e4d32e409bed0d945aeee0540cdb
