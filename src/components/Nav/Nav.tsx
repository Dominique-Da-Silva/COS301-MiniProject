import { FaTwitter } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from '@nextui-org/button';

const Nav = () => {
  return (
    <div className="sidebar mt-0 mr-0 pl-12 border-r-0 font-semibold fixed h-full bg-white w-1/5 overflow-y-auto overflow-x-hidden">
      <div className="sidebar-item-logo w-16 h-16 flex items-center mb-2 cursor-pointer rounded-full hover:bg-slate-200 p-3">
        <FaTwitter size={35} />
      </div>
      
      <div className="sidebar-item font-medium cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <GoHomeFill size={28} className=" mr-5" />
        Home
      </div>
      <div className="sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <IoSearch size={28} className="mr-5" />
        Explore
      </div>
      <div className="sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <PiBellBold size={28} className="mr-5" />
        Notifications
      </div>
      <div className="sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <FaRegBookmark size={28} className="mr-5" />
        Bookmarks
      </div>
      <div className="sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <FaRegUserCircle size={28} className="mr-5" />
        Profile
      </div>
      <div className="sidebar-item font-normal cursor-pointer flex items-center pl-2 pr-7 text-xl w-fit transition-[background-color 0.2s ease-in-out] rounded-3xl h-12 my-0 hover:bg-gray-200">
        <FiSettings size={28} className="mr-5" />
        Settings
      </div>
      <Button size="lg" className="post-button bg-sky-500 w-36 p-3 cursor-pointer rounded-full text-center font-semibold text-white text-lg my-4">
        Post
      </Button>
    </div>
  );
}

export default Nav;
