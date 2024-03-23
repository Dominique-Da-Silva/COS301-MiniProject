import {
  Home,
  Explore,
  Notifications,
  Bookmark,
  AccountCircle,
  Menu,
  Search,
  Inbox,
  List,
  PostAdd,
  BubbleChart,
} from "@mui/icons-material";

const SideNavbar = () => {
  return (
    <div className="flex flex-col justify-between h-full bg-white-800 text-grey">
      <div className="mt-8">
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Home sx={{ mr: 2 }} />
          Home
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Notifications sx={{ mr: 2 }} />
          Notifications
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Explore sx={{ mr: 2 }} />
          Explore
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <List sx={{ mr: 2 }} />
          List
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Search sx={{ mr: 2 }} />
          Search
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <BubbleChart sx={{ mr: 2 }} />
          Premium
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Inbox sx={{ mr: 2 }} />
          Inbox
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <Bookmark sx={{ mr: 2 }} />
          Bookmark
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <PostAdd sx={{ mr: 2 }} />
          Post
        </div>
        <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
          <AccountCircle sx={{ mr: 2 }} />
          Account
        </div>
      </div>
      <div className="sidebar-item flex items-center px-4 py-2 text-sm font-medium cursor-pointer">
        <Menu sx={{ mr: 2 }} />
        More
      </div>
    </div>
  );
};

export default SideNavbar;
