import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { HomeImage } from '@components/index';
import { github, google } from '@assets/index';
import { useEffect } from 'react';
import { isUserLoggedIn, signInWithGithub, signInWithGoogle } from '@services/index';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Create a new async function
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (result) {
        navigate('/profile'); // Redirect to profile page if user is logged in
      }
    };
  
    // Call the async function
    checkUser();
  }, [navigate]);
  
  return (
    <div className='pageContainer'>
      <div className='imageContainer'>
        <HomeImage />
      </div>
      <div className='signInContainer'>
        <h2>Sign In Page</h2>
        
        <Link to="/signup">Sign up with phone or email</Link>
        <p className='terms'>
        By singing up you agree to the <a href='https://twitter.com/en/tos'>Terms of Service</a>
        and <a href='https://twitter.com/en/privacy'>Privacy Policy</a>, including <a href='https://help.twitter.com/en/rules-and-policies/x-cookies'> Cookie Use</a>.
        </p>
        <div className='login'>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;