import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [redirected, setRedirected] = useState(() => {
    const savedRedirected = sessionStorage.getItem('redirected');
    return savedRedirected ? JSON.parse(savedRedirected) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('redirected', JSON.stringify(redirected));
  }, [redirected]);

  const resetStore = () => {
    setRedirected(false);
    sessionStorage.removeItem('redirected');
  };

  return (
    <StoreContext.Provider value={{ redirected, setRedirected, resetStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);