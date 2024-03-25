import { signInWithGithub, signInWithGoogle, signInUser, signUpNewUser, signOut, isUserLoggedIn } from "./auth/auth";
import { uploadProfile } from "./storage/storage";
import { updateUsername } from './profileServices/updateUsername';

export { signInWithGithub, signInWithGoogle, signOut, signInUser,
    signUpNewUser, isUserLoggedIn, uploadProfile, updateUsername };