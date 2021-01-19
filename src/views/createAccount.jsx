import React, { useState } from 'react';
import AccountForm from '../components/AccountForm';

const createAccount = ({ history }) => {
  const [account, setAccount] = useState({
    identifier: '',
    description: '',
    level: 0,
    type: '',
    keycontrol: '',
    balance: '',
  });
  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <AccountForm httpMethod='POST' formValues={account} onChange={handleChange} history={history} successMessage='Cuenta creada exitosamente' />
  );
};

export default createAccount;
