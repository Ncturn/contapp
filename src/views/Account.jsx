import React from 'react';
import Table from '../components/Table';

const Account = ({ history }) => {
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
  return (
    <Table title={title} name={collection} fields={policyFields} history={history} />
  );
};

export default Account;
