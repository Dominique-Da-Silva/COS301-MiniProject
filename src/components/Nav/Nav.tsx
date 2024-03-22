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
    <div className="sidebar mr-0 pl-12 border-r-0 font-semibold fixed">
      <div className="sidebar-item-logo w-16 flex items-center mb-4 cursor-pointer rounded-full hover:bg-slate-200 p-3">
        <FaTwitter className="w-10 h-10"/>
      </div>
      
      <div className="sidebar-item font-medium">
        <GoHomeFill className="w-8 h-8" />
        Home
      </div>
      <div className="sidebar-item font-normal">
        <IoSearch size={30} />
        Explore
      </div>
      <div className="sidebar-item font-normal">
        <PiBellBold radius="md" className='p-0 m-0' />
        Notifications
      </div>
      <div className="sidebar-item font-normal">
        <FaRegBookmark size={30} />
        Bookmarks
      </div>
      <div className="sidebar-item font-normal">
        <FaRegUserCircle size={30} />
        Profile
      </div>
      <div className="sidebar-item font-normal">
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