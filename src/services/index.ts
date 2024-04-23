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
import { addTweet } from "./homeServices/addTweets.ts";
import {fetchUserData} from "./profileServices/getAuthUser.ts";
import {countFollowers} from "./profileServices/countFollowers.ts";
import {countFollowing} from "./profileServices/countFollowing.ts";
import {fetchProfileDetails} from "./profileServices/getProfile.ts";
import {uploadImageAndGetURL} from "./profileServices/uploadProfileImage.ts";
import {checkIfFollowing} from "./usersProfileServices/checkIfFollowing.ts";
import {getLoggedUserId} from "./usersProfileServices/getLoggedUserId.ts";
import {changePassword} from "./auth/changePassword.ts";
import { getTrendingTopics } from "./homeServices/getTrendingTopics.ts";
import {getBookmarkedTweets} from "./usersProfileServices/getBookmarkedTweets.ts";
import {toggleLike} from "./tweetInteraction/toggleLike.ts";
import {toggleSave} from "./tweetInteraction/toggleSave.ts";
import {toggleRetweet} from "./tweetInteraction/toggleRetweet.ts";
import {countLikes} from "./tweetInteraction/countLikes.ts"
import {countRetweets} from "./tweetInteraction/countRetweets.ts"
import {countSaves} from "./tweetInteraction/countSaves.ts"
import {countComments} from "./tweetInteraction/countComments.ts"
import { CreateFollowNotification,CreateLikeNotification,CreateCommentNotification,
    CreateRetweetNotification,CreateTweetNotification,updateNotifications,getUserNotifications } from "./homeServices/notifications.ts";

export { signInWithGithub, signInWithGoogle, signOut, signInUser,
    signUpNewUser, isUserLoggedIn, uploadProfile, updateUsername,
    fetchUsers, fetchTweets, fetchUserByUsername, addTweet,
    followUser, unfollowUser, insertProfileDetails, updateProfileDetails, addUserToDatabase,
    fetchUserData, countFollowers, countFollowing, fetchProfileDetails,
    uploadImageAndGetURL,checkIfFollowing, getLoggedUserId, getUserData,toggleLike,toggleSave,toggleRetweet, countLikes, countRetweets, countSaves, countComments, changePassword, getBookmarkedTweets
    ,getTrendingTopics,CreateFollowNotification,getUserNotifications,CreateLikeNotification,
    CreateCommentNotification,CreateRetweetNotification,CreateTweetNotification,updateNotifications
    };
