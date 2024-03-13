import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn } from '@pages/index';
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  );
};

export default App;