import React, { useState, useEffect } from 'react';
import Table from './Table';

const Account = ({ history }) => {
  const [accounts, setAccounts] = useState({
    error: null,
    body: [],
  });
  const title = 'Cuentas';
  const policyFields = [
    'identificador',
    'nombre de la cuenta',
    'nivel',
    'tipo',
    'llave de control',
    'balance',
    'tipo de cuenta',
  ];
  const getAccounts = async () => {
    const response = await fetch('http://localhost:3000/account/');
    const responseObject = await response.json();
    setAccounts(responseObject);
  };
  useEffect(() => {
    getAccounts();
  }, []);
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
  const handleTrashClick = (identifier) => {
    const confirmDelete = window.confirm(`¿Desea borrar la cuenta ${identifier}?`);
    if (confirmDelete) {
      deleteAccount(identifier);
    }
  };
  const handlePencilClick = (identifier) => {
    history.push(`/account/edit/${identifier}`);
  };
  const handlePlusClick = () => {
    history.push('/account/create/');
  };
  return (
    <Table title={title} items={accounts.body} fields={policyFields} handleTrashClick={handleTrashClick} handlePencilClick={handlePencilClick} handlePlusClick={handlePlusClick} />
  );
};

export default Account;
