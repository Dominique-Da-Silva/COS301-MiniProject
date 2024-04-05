import { Nav } from '@components/index';
import { isUserLoggedIn } from '@services/index';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    }
    
    // Call the async function
    checkUser();
  }, [navigate]);
  
  return (
    <div className="bookmark-page flex">
      < Nav />
      <div className="main-content flex-grow ml-72">
        <h1 className="text-2xl font-bold p-4">Bookmarks</h1>
        <p className="p-4">This is the Bookmarks page content.</p> 
    </div>
    </div>
  );
};

export default Bookmarks;
