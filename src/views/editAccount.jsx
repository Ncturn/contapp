import React, { useState, useEffect } from 'react';
import AccountForm from '../components/AccountForm';

const EditAccount = ({ match, history }) => {
  const title = 'Editar cuenta';
  const [account, setAccount] = useState({
    identifier: '',
    description: '',
    level: 0,
    type: '',
    keycontrol: '',
    balance: '',
  });
  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/account/?identifier=${match.params.identifier}`);
    const responseObject = await response.json();
    setAccount({
      ...responseObject.body[0],
    });
  }, []);
  console.log(account);
  return (
    <AccountForm title={title} httpMethod='PATCH' formValues={account} history={history} successMessage='Cambios guardados' disable={true} />
  );
};

export default EditAccount;
