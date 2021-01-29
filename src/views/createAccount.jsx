import React from 'react';
import AccountForm from '../components/AccountForm';

const CreateAccount = ({ history }) => {
  const formValues = {
    identifier: '',
    description: '',
    level: 0,
    type: '',
    keycontrol: '',
    balance: '',
  };
  return (
    <AccountForm title='Crear cuenta' httpMethod='POST' formValues={formValues} history={history} successMessage='Cuenta creada exitosamente' />
  );
};

export default CreateAccount;
