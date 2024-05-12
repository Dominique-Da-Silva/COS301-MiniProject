// context.js
import { createContext, useState } from 'react';

const IsFeatureEnabledContext = createContext({isEnabled: true, toggleEnabled: () => {}});

const IsFeatureEnabledProvider = ({ children }: any) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEnabled = () => setIsEnabled(!isEnabled);

  return (
    <IsFeatureEnabledContext.Provider value={{ isEnabled, toggleEnabled }}>
      {children}
    </IsFeatureEnabledContext.Provider>
  );
};

export { IsFeatureEnabledContext, IsFeatureEnabledProvider };
