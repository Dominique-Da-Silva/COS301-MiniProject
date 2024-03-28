import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage, Explore, Notifications, Bookmarks, Settings } from '@pages/index';
import { EditProfile } from '@components/index';
import "./styles/tailwind.css";
import { useEffect } from 'react';
import { supabase } from '@config/index';
import { addUserToDatabase, signOut } from '@services/index';

const App = () => {

  useEffect(() => {
    supabase.auth.onAuthStateChange(async(event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const res = await addUserToDatabase();
        if(res === "error"){
          await signOut();
        }
      }
      else if(event === 'SIGNED_OUT') {
        console.log('signed out');
      }

    });
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
