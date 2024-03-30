import React, { useState } from 'react';
import { Slider, Button } from '@nextui-org/react';

const DisplaySettings = () => {
  const [fontSize, setFontSize] = useState(50);
  const [color, setColor] = useState('#000000');

  return (
    <div className="bg-white p-4 rounded-lg w-96">
      <h2 className="text-black text-lg">Display</h2>
      <p className="text-gray-600 text-sm mb-4">
        Manage your font size, color, and background. These settings affect all the X accounts on this browser.
      </p>

      <div className="border-b border-gray-200 py-2 mb-4">
        <p className="text-black text-sm">@X - 11m</p>
        <p className="text-gray-800 text-xs">
          At the heart of X are short messages called posts — just like this one — which can include photos,
          videos, links, text hashtags, and mentions like @X.
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="fontSize" className="block text-black text-sm mb-2">Font Size</label>
        <Slider 
          value={fontSize}
          //onChange={(value) => setFontSize(value)}
          //min={0}
          //max={100}
          step={1}
          //filled
          //color="#3B82F6"
        />
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label htmlFor="" className="block text-black text-sm mb-2">Color</label>
        
        {/* Replace these colors with actual colors you want to use */}
        {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#9333EA'].map((c) => (
          <Button
            key={c}
            //color={c}
            onClick={() => setColor(c)}
            className={`mr-2 ${color === c ? 'border-2 border-blue-500' : ''}`}
          >
            {color === c && <span className="text-blue-500">✓</span>}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DisplaySettings;