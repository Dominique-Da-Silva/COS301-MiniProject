import { Nav } from '@components/index';
import React from 'react';

const Bookmarks = () => {
  return (
    <div className="bookmark-page flex">
      < Nav />
      <div className="main-content flex-grow ml-72">
        <h1 className="text-2xl font-bold p-4">Bookmarks</h1>
        <p className="p-4">This is the Bookmarks page content.</p> 
    </div>
    </div>
  );
};

export default Bookmarks;
