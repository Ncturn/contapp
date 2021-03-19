import React, { useState, useEffect } from 'react';
import Table from './Table';
import { handlePlusClick } from '../utils/TableEvents';

const Account = ({ history }) => {
  const [accounts, setAccounts] = useState({
    error: null,
    body: [],
  });
  const title = 'Cuentas';
  const collection = 'account';
  const policyFields = [
    'identificador',
    'nombre de la cuenta',
    'nivel',
    'tipo',
    'llave de control',
    'balance',
    'tipo de cuenta',
  ];
  const getAccounts = async (identifier) => {
    let parameter = '';
    if (identifier) {
      parameter = `?identifier=${identifier}`;
    }
    const response = await fetch(`http://localhost:3000/account${parameter}`);
    const responseObject = await response.json();
    setAccounts(responseObject);
  };
  const deleteAccount = async (identifier) => {
    const response = await fetch('http://localhost:3000/account/', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
      }),
    });
    const responseObject = await response.json();
    if (!responseObject.error) {
      getAccounts();
      alert(responseObject.body);
    } else {
      alert(responseObject.error);
    }
  };
  const createHotKeyPlusIcon = (event) => {
    if (event.key === '+') {
      event.preventDefault();
      handlePlusClick(history, collection);
    }
  };
  useEffect(() => {
    getAccounts();
    window.addEventListener('keydown', createHotKeyPlusIcon);
    return () => {
      window.removeEventListener('keydown', createHotKeyPlusIcon);
    };
  }, []);
  return (
    <Table title={title} collection={collection} items={accounts.body} getCollection={getAccounts} fields={policyFields} deleteItem={deleteAccount} history={history} />
  );
};

export default Account;
