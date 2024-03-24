import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage,  } from '@pages/index';
import { EditProfile } from '@components/index';
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
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
