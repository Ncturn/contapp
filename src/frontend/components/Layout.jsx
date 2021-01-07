import React, { useEffect } from 'react';

const Layout = ({ children }) => {

  useEffect(() => {
    document.body.style.backgroundColor = '#2F3E46';
    document.body.style.color = '#CAD2C5';
    document.body.style.fontSize = '16px';
  }, []);
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
