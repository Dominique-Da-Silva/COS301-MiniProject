import React from 'react';

const DisplaySettings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Display</h2>
      <p className="text-gray-600 mb-6">
        Manage your font size, color, and background. These settings affect all the X accounts on this browser.
      </p>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-gray-600">
          At the heart of X are short messages called posts — just like this one — which can include photos, videos,
          links, text, hashtags, and mentions like @X.
        </p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Font size</label>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Aa</span>
          <input
            type="range"
            className="w-full"
            min="1"
            max="5"
            step="1"
            defaultValue="3"
          />
          <span className="text-sm text-gray-500 ml-2">Aa</span>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Color</label>
        <div className="flex items-center">
          <button className="w-6 h-6 rounded-full mr-2 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"></button>
          <button className="w-6 h-6 rounded-full mr-2 bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"></button>
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Background</label>
        <div className="flex items-center">
          <button className="flex items-center mr-4 focus:outline-none">
            <div className="w-6 h-6 rounded-full bg-white border border-gray-300"></div>
            <span className="ml-2 text-gray-700">Default</span>
          </button>
          <button className="flex items-center mr-4 focus:outline-none">
            <div className="w-6 h-6 rounded-full bg-gray-300"></div>
            <span className="ml-2 text-gray-700">Dim</span>
          </button>
          <button className="flex items-center focus:outline-none">
            <div className="w-6 h-6 rounded-full bg-black"></div>
            <span className="ml-2 text-gray-700">Lights out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;