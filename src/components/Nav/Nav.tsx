import { FaTwitter} from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from '@nextui-org/button';
import {Modal, ModalContent, useDisclosure, ModalHeader, ModalBody} from '@nextui-org/react';
import { NavLink, useLocation } from 'react-router-dom';
import { CreateTweet } from "..";
import { useState, useEffect } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';



const Nav = () => {
  const location = useLocation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1265);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1265);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sidebar left-0 top-0 h-full bg-white p-12">
      {/* Logo */}
      <NavLink
        to="/home"
        className={`sidebar-item-logo w-16 h-16 flex items-center mb-2 cursor-pointer rounded-full p-3 ${location.pathname === '/home' ? '' : ''
          }`}
      >
        <FaTwitter size={35} />
      </NavLink>
      {isLargeScreen && (
        <>
          {/* Home */}
          <NavLink
            to="/home"
            className={`sidebar-item font-medium cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <GoHomeFill size={28} className="mr-5" />
            Home
          </NavLink>

          {/* Explore */}
          <NavLink
            to="/explore"
            className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/explore' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <IoSearch size={28} className="mr-5" />
            Explore
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="/notifications"
            className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/notifications' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <PiBellBold size={28} className="mr-5" />
            Notifications
          </NavLink>

          {/* Bookmarks */}
          <NavLink
            to="/bookmarks"
            className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/bookmarks' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FaRegBookmark size={28} className="mr-5" />
            Bookmarks
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/profile' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FaRegUserCircle size={28} className="mr-5" />
            Profile
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={`sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FiSettings size={28} className="mr-5" />
            Settings
          </NavLink>

          {/* Post Button - will route to create tweet component */}
          <Button size="lg" className="post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4">
            Post
          </Button>
          <div className="active-user-tab flex items-center justify-center w-full h-16 border-t border-gray-200 mt-auto">
            <div className="user-icon w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
              {/* User icon (e.g., an icon component or an image) */}
              <FaUser size={20} color="#FFFFFF" />
            </div>
            <div className="user-info">
              <p className="text-sm font-semibold mb-1">Maybach Music</p>
              <p className="text-xs">@thebiggest</p>
            </div>
          </div>
        </>
      )}

      {/* Post Button */}
      <Button size="lg" className="post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4" onPress={onOpen}>
        Post
      </Button>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                {/* <Button endContent={<FaXmark />} onPress={onClose}></Button> */}
              </ModalHeader>
              <ModalBody>
                <CreateTweet/>
              </ModalBody>
            </>
        )}
        </ModalContent>
      </Modal>

      {!isLargeScreen && (
        <>
          {/* Home */}
          <NavLink
            to="/home"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/home' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <GoHomeFill size={28} />
          </NavLink>

          {/* Explore */}
          <NavLink
            to="/explore"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/explore' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <IoSearch size={28} />
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="/notifications"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/notifications' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <PiBellBold size={28} />
          </NavLink>

          {/* Bookmarks */}
          <NavLink
            to="/bookmarks"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/bookmarks' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FaRegBookmark size={28} />
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/profile' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FaRegUserCircle size={28} />
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 ${location.pathname === '/settings' ? 'bg-gray-200 active-tab' : ''
              }`}
          >
            <FiSettings size={28} />
          </NavLink>
          {/* Post */}
          <NavLink
            to="/" //will route to create a tweet component
            className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 bg-sky-500`}
          >
            <BiPlusCircle size={28} color="#FFFFFF" />
          </NavLink>
          <div className="active-user-tab flex items-center justify-center w-full h-16 border-t border-gray-200 mt-auto">
            <div className="user-icon w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
              {/* User icon (e.g., an icon component or an image) */}
              <FaUser size={20} color="#FFFFFF" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default Nav;

