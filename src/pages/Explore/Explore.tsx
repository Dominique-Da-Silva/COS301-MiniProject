import { Nav, Search, TrendingTopics, WhoToFollow } from '@components/index';

const Explore = () => {
  return (
    <div className="container flex">
      <div className="nav w-1/5 ml-20 mr-6">
        <Nav />
      </div>
      <div className="main-content flex-1 max-w-full m-0 p-0 border">
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
