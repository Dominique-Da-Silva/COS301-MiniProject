import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage } from '@pages/index';
import './App.css';
import "./styles/tailwind.css";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </Router>
  );
};

export default App;
