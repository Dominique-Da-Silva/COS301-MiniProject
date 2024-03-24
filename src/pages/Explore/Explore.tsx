import React from 'react';
import { Nav } from '@components/index';

const Explore = () => {
  return (
    <div className="explore-page flex">
      < Nav />
      <div className="main-content flex-grow ml-72">
        <h1 className="text-2xl font-bold p-4">Explore</h1>
        <p className="p-4">This is the Explore page content.</p> 
    </div>
    </div>
  );
};

export default Explore;
