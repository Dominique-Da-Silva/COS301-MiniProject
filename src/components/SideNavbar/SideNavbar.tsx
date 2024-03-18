import "./SideNavbar.css";

const SideNavbar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        Home
      </div>
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        Explore
      </div>
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        Notifications
      </div>
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        Bookmarks
      </div>
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        Profile
      </div>
      <div className="sidebar-item">
        <svg viewBox="0 0 24 24"></svg>
        More
      </div>
    </div>
  );
};

export default SideNavbar;
