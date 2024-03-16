import { useState, useEffect } from 'react';
import { supabase } from "@config/supabase";
import { loggedInUserStore } from '@store/index';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button, Input, Card} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { twitterLogo } from "@assets/index"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { userData, loginUser } = loggedInUserStore((state) => { return { userData: state.user, loginUser: state.loginUser}; });

  useEffect(() => {
    // Create a new async function
    const checkUser = async () => {
      // Check if user is already logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        navigate('/profile'); // Redirect to profile page if user is logged in
      }
    };
  
    // Call the async function
    checkUser();
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      console.log('User logged in:', data);
      loginUser(data.user); // Update user data state
      navigate('/profile'); // Redirect user to /profile page
    }
  };

  return (
    <div className="flex items-center justify-center h-screen"> 
      <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">Log In to Twitter</h2>
        </div>
        <form onSubmit={handleSubmit} space-y-4>
          <Input
            type="email"
            placeholder="Phone, email, or username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mb-4"
          />
          <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg'>Login</Button>
        </form>
        <div className="text-center mt-6">
          <p>
            <a className="text-blue-500 mr-12 hover:underline">Forgot Password?</a>
            <a className="text-blue-500 hover:underline"><Link to="/signup">Sign Up</Link></a>
          </p>
        </div>
        {userData && ( 
          <div>
            <h2>User Data:</h2>
            <p>Email: {userData.email}</p>
            <p>UID: {userData.id}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
