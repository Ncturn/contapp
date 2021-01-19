import { useState, useEffect } from 'react';

const useAccount = () => {
  const [accounts, setAccounts] = useState({
    error: 'error',
    body: [],
  });
  useEffect(() => {
    fetch('http://localhost:3000/account/')
      .then((data) => data.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);
  return [accounts, setAccounts];
};

export default useAccount;
