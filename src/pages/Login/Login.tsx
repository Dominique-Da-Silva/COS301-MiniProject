import { useState } from 'react';
import { supabase } from "@config/supabase";
import { loggedInUserStore } from '@store/index';
import {Card} from "@nextui-org/react";
import { Button, Input} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { twitterLogo } from "@assets/index"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userData, loginUser} = loggedInUserStore((state) => { return { userData: state.user, loginUser: state.loginUser}; });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      console.error('Error logging in:', res.error.message);
    } else {
      console.log('User logged in:', res.data.user);
      loginUser(res.data.user); // Update user data state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen"> 
      <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">Log In to Twitter</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="text-blue-500 mr-12 hover:underline">Forgot Password?</div>
            <div className="text-blue-500 hover:underline"><Link to="/signup">Sign Up</Link></div>
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