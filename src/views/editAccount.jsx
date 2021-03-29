import React, { useState, useEffect } from 'react';
import AccountForm from '../components/AccountForm';
import { getCollection } from '../utils/CollectionApi';

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
    const data = await getCollection('account', match.params.identifier);
    setAccount({
      ...data.body[0],
    });
  }, []);
  return (
    <AccountForm title={title} httpMethod='PATCH' formValues={account} history={history} successMessage='Cambios guardados' readOnly={true} />
  );
};

export default EditAccount;
