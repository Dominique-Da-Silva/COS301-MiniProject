import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage, Explore, Notifications, Bookmarks, Settings } from '@pages/index';
import { EditProfile } from '@components/index';
import "./styles/tailwind.css";
import { useEffect, useRef  } from 'react';
import { supabase } from '@config/index';
import { addUserToDatabase, signOut } from '@services/index';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const App = () => {
  const isMountedRef = useRef(true); // Flag to track component mount status
  const isEffectExecutedRef = useRef(false); // Flag to track whether useEffect has been executed

  useEffect(() => {
    const handleAuthStateChange = async(event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_IN' && session) {
        if(isEffectExecutedRef.current === true)return;
        isEffectExecutedRef.current = true;
        const res = await addUserToDatabase();
        if(res === "error"){
          await signOut();
        }
      }
      else if(event === 'SIGNED_OUT') { }
    }

    supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      isMountedRef.current = false;
      isEffectExecutedRef.current = false;
    };
  }, [isMountedRef])

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
