import React, { useState, useEffect } from 'react';
import AccountForm from '../components/AccountForm';

const editAccount = ({ match, history }) => {
  const [account, setAccount] = useState({
    identifier: '',
    description: '',
    level: 0,
    type: '',
    keycontrol: '',
    balance: '',
  });
  useEffect(() => {
    fetch(`http://localhost:3000/account/?identifier=${match.params.identifier}`)
      .then((data) => data.json())
      .then((data) => {
        setAccount({
          ...data.body[0],
        });
      });
  }, []);
  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <AccountForm httpMethod='PATCH' formValues={account} onChange={handleChange} history={history} successMessage='Cambios guardados' disabled={true} />
  );
};

export default editAccount;
