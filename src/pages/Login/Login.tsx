import { useState } from 'react';
import { supabase } from "@config/supabase";
import { loggedInUserStore } from '@store/index';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userData, loginUser} = loggedInUserStore((state) => { return { userData: state.user, loginUser: state.loginUser}; });


  const handleSubmit = async (event: any) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Login" />
      </form>
      {userData && ( // Conditionally render user data if available
        <div>
          <h2>User Data:</h2>
          <p>Email: {userData.email}</p>
          <p>UID: {userData.id}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Login;