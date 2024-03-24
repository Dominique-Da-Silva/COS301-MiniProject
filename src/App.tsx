import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage, Explore, Notifications, Bookmarks, Settings } from '@pages/index';
import './App.css';
import "./styles/tailwind.css";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
    </Router>
  );
};

export default App;
