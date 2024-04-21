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
import {fetchUserData} from "./profileServices/getAuthUser.ts";
import {countFollowers} from "./profileServices/countFollowers.ts";
import {countFollowing} from "./profileServices/countFollowing.ts";
import {fetchProfileDetails} from "./profileServices/getProfile.ts";
import {uploadImageAndGetURL} from "./profileServices/uploadProfileImage.ts";
import {fetchLikedPosts} from "./profileServices/getLikedPosts.ts";
import {fetchUserMedia} from "./profileServices/getUserMedia.ts";
import {getUserTweets} from "./profileServices/getUserTweets.ts";
import {getUserComments} from "./profileServices/getUserComments.ts"
import {toggleLike} from "./tweetInteraction/toggleLike.ts";
import {toggleSave} from "./tweetInteraction/toggleSave.ts";
import {toggleRetweet} from "./tweetInteraction/toggleRetweet.ts";
import {countLikes} from "./tweetInteraction/countLikes.ts"
import {countRetweets} from "./tweetInteraction/countRetweets.ts"
import {countSaves} from "./tweetInteraction/countSaves.ts"
import {countComments} from "./tweetInteraction/countComments.ts"

export { signInWithGithub, signInWithGoogle, signOut, signInUser,
    signUpNewUser, isUserLoggedIn, uploadProfile, updateUsername,
    fetchUsers, fetchTweets, fetchUserByUsername, addTweet,
    followUser, unfollowUser, insertProfileDetails, updateProfileDetails, addUserToDatabase,
    fetchUserData, countFollowers, countFollowing, fetchProfileDetails,
    uploadImageAndGetURL, fetchLikedPosts, fetchUserMedia, getUserTweets, getUserComments,
    toggleLike,toggleSave,toggleRetweet, countLikes, countRetweets, countSaves, countComments,
    
};