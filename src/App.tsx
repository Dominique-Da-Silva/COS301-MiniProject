import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp, Login, SignIn, HomePage } from "@pages/index";
import "./App.css";
import "./styles/tailwind.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
