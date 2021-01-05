import React, { useState } from 'react';

const Account = () => {
  const [greting, setGreting] = useState('');

  const getGreeting = () => {
    console.log(window.location.hostname);
    fetch(`http://${window.location.hostname}:3000`)
      .then((data) => data.json())
      .then((data) => {
        setGreting(data.body);
      });
  };

  getGreeting();

  return (
    <div>{greting}</div>
  );
};

export default Account;
