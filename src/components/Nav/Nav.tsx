import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import './Nav.css'

const Nav = () => {
  return (
    <div className="sidebar ml-8">
      <div className="sidebar-item-logo">
        <FaTwitter size={30} />
      </div>
      
      <div className="sidebar-item">
        <GoHomeFill size={30} />
        Home
      </div>
      <div className="sidebar-item">
        <IoSearch size={30} />
        Explore
      </div>
      <div className="sidebar-item">
        <PiBellBold size={30} />
        Notifications
      </div>
      <div className="sidebar-item">
        <FaRegBookmark size={30} />
        Bookmarks
      </div>
      <div className="sidebar-item">
        <FaRegUserCircle size={30} />
        Profile
      </div>
      <div className="sidebar-item">
        <FiSettings size={30} />
        Settings
      </div>
      <div className="post-button bg-sky-500 w-56 p-3 rounded-full text-center font-bold text-white text-lg">
        Post
      </div>
    </div>
  )
}

export default Nav;