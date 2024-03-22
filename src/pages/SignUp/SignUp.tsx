import { useState } from 'react';
//import { supabase } from "@config/supabase";
//import { loggedInUserStore } from '@store/index';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userData, loginUser, logoutUser} = loggedInUserStore((state) => { return { userData: state.user, loginUser: state.loginUser, logoutUser: state.logoutUser}; });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await supabase.auth.signUp({
      email,
      password,
    });

    if (res.error) {
      console.error('Error signing up:', res.error.message);
    } else {
      console.log('User signed up:', res.data.user);
      console.log(res.data.user);
      if(res.data.user)loginUser(res.data.user); // Update user data state
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
        <input type="submit" value="Sign Up" />
      </form>
      {userData && ( // Conditionally render user data if available
        <div>
          <h2>User Data:</h2>
          <p>Email: {userData.email}</p>
          <p>UID: {userData.id}</p>
          {/* Add more fields as needed */}

          <button onClick={() => {
            logoutUser(); // Clear user data state
            supabase.auth.signOut();
            }}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;