import { Nav, Search, TrendingTopics, WhoToFollow } from '@components/index';
import { FiSettings } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';


const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
  };

  const handleSearchFocus = () => {
      setIsFocused(true);
  };

  const handleSearchBlur = () => {
      setIsFocused(false);
  };
  return (
    <div className="container flex">
      <div className="nav w-1/5 ml-20 mr-6">
        <Nav />
      </div>
      <div className="main-content flex-1 max-w-full m-0 p-0 border">
        <div className='searchbar px-4 py-1 flex items-center justify-between w-full'>
          <div className="flex justify-between items-center w-11/12">
            {isFocused || searchValue ? (
                <div onChange={handleSearchChange} onClick={handleSearchBlur} className='hover:bg-slate-200 p-3 mr-5 rounded-full cursor-pointer hover-t'>
                    <FaArrowLeft size={18}  onClick={handleSearchBlur} />
                </div>
            ) : null}
            <div className={`flex bg-gray-100 py-2 focus:ring-2 rounded-full items-center pl-4 w-full ${isFocused || searchValue ? 'border border-sky-500' : 'border-gray-200'}`}>
              <IoSearch size={20} color={`${isFocused || searchValue ? 'rgb(14 165 233)' : 'gray'}`}/>&nbsp;&nbsp;&nbsp;
              <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search..."
                  className="w-full rounded-full bg-transparent outline-0 border-none text-lg"
              />
            </div>
          </div>
          <div>
            <FiSettings size={18} />
          </div>
        </div>
        <p className='pl-3 mt-1 text-xl font-bold'>Trends for you</p>
        <div className="flex min-w-full flex-col m-0 p-0 justify-center">
        </div>  
      </div>
      <div className="sidebar-right w-1/4 mr-32 ml-7 mt-2 pl-1 pr-2">
        <div className="mb-3">
          <Search />
        </div>
        <TrendingTopics />
        <WhoToFollow users={[]} />
      </div>
    </div>
  );
};

export default Explore;
