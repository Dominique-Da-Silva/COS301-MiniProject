import { Link, useNavigate } from 'react-router-dom';
import { HomeImage } from '@components/index';
import { github, google, twitterLogo } from '@assets/index';
import { useEffect } from 'react';
import { isUserLoggedIn, signInWithGithub, signInWithGoogle } from '@services/index';
import { Button } from '@nextui-org/react';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const signInWithProvider = async (provider: 'google' | 'github') => {
    if (provider === 'google') {
        await signInWithGoogle();
        navigate('/home');
    } else {
        await signInWithGithub();
        navigate('/home');
    }
  }

  useEffect(() => {
    // Create a new async function
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (result) {
        navigate('/home');
      }
    };
  
    // Call the async function
    checkUser();
  }, []);
  
  return (
    <div className='flex top-0 h-screen'>
      <div className='flex top-0 w-[60vw]'>
        <HomeImage />
      </div>
      <div className='flex flex-col items-center justify-center'>
          <div className='w-full'>
            <img src={twitterLogo} alt="logo" className="w-14 ml-2" />
          </div>
          <h1 className='text-black font-black text-[84px] mt-5'>Happening Now</h1>
          <h2 className='text-black font-black text-[42px] mt-5 mb-5'>Join Twitter today</h2>
          <Button radius="full" className="bg-transparent border flex items-center justify-center mb-4 w-[300px] h-[50px]" onClick={() => signInWithProvider("google")}>
            <img src={google} alt="logo" className="logo mr-2 w-5 h-5"/>
            Sign up with Google
          </Button>
          <Button radius="full" className="bg-transparent border flex items-center justify-center mb-4 w-[300px] h-[50px]" onClick={() => signInWithProvider("github")}>
            <img src={github} alt="logo" className="logo mr-2 w-5 h-5"/>
            Sign up with Github
          </Button>
          <div className="flex items-center justify-center pb-4">
            <span className="text-gray-500">OR</span>
          </div>
          <Button radius="full" className="bg-transparent border flex items-center justify-center mb-2 w-[300px] h-[50px]">
            <Link to="/signup">Sign up with phone or email</Link>
          </Button>
          <p className='text-[16px] mb-10'>
          By signing up, you agree to 
          the <a href='https://twitter.com/en/tos' className='text-blue-500'>Terms of Service</a> and <a href='https://twitter.com/en/privacy' className='text-blue-500'>Privacy Policy</a>, including <a href='https://help.twitter.com/en/rules-and-policies/x-cookies' className='text-blue-500'> Cookie Use</a>.
          </p>
          <p className='text-[16px]'>
            Already have an account? <Link to="/signin" className='text-blue-500'>Log In</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;