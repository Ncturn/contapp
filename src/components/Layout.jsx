import React, { useEffect } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {

  useEffect(() => {
    document.body.style.backgroundColor = '#2F3E46';
    document.body.style.color = '#CAD2C5';
    document.body.style.fontSize = '16px';
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
