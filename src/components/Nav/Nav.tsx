import { FaTwitter } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from '@nextui-org/button';
import { NavLink, useLocation } from 'react-router-dom';


const Nav = () => {
  const location = useLocation();

  return (
    <div className="sidebar mt-0 mr-0 pl-12 border-r-0 font-semibold fixed h-full bg-white">
      {/* Logo */}
      <NavLink
        to="/home"
        className={`sidebar-item-logo w-16 h-16 flex items-center mb-2 cursor-pointer rounded-full hover:bg-slate-200 p-3 ${
          location.pathname === '/home' ? '' : ''
        }`}
      >
        <FaTwitter size={35} />
      </NavLink>

      {/* Home */}
      <NavLink
        to="/home"
        className={`sidebar-item font-medium cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/home' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <GoHomeFill size={28} className="mr-5" />
        Home
      </NavLink>

      {/* Explore */}
      <NavLink
        to="/explore"
        className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/explore' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <IoSearch size={28} className="mr-5" />
        Explore
      </NavLink>

      {/* Notifications */}
      <NavLink
        to="/notifications"
        className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/notifications' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <PiBellBold size={28} className="mr-5" />
        Notifications
      </NavLink>

      {/* Bookmarks */}
      <NavLink
        to="/bookmarks"
        className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/bookmarks' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <FaRegBookmark size={28} className="mr-5" />
        Bookmarks
      </NavLink>

      {/* Profile */}
      <NavLink
        to="/profile"
        className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/profile' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <FaRegUserCircle size={28} className="mr-5" />
        Profile
      </NavLink>

      {/* Settings */}
      <NavLink
        to="/settings"
        className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${
          location.pathname === '/settings' ? 'bg-gray-200 active-tab' : ''
        }`}
      >
        <FiSettings size={28} className="mr-5" />
        Settings
      </NavLink>

      {/* Post Button */}
      <Button size="lg" className="post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4">
        Post
      </Button>
    </div>
  );
};


export default Nav;
