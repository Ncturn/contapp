import { useState, useEffect } from 'react';

const getAccount = () => {
  const [accounts, setAccounts] = useState({
    error: 'error',
    body: [],
  });
  useEffect(() => {
    fetch(`http://${window.location.hostname}:3000/account/`)
      .then((data) => data.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);
  return accounts;
};

export default getAccount;
