import { IoSearch } from "react-icons/io5";

const Search = () => {

  return (
    <div className="flex bg-gray-200 py-1.5 focus:ring-2 rounded-full items-center pl-3">
        <IoSearch size={20} color='gray'/>&nbsp;&nbsp;&nbsp;
        <input type="search" placeholder="Search..." className="w-full rounded-full focus:ring-blue-500 focus:ring-opacity-50 bg-transparent outline-0 border-none text-lg" />
    </div>
  )
}

export default Search