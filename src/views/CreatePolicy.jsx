import React from 'react';
import PolicyForm from '../components/PolicyForm';

const CreatePolicy = ({ history }) => {
  const formValues = {
    identifier: '',
    date: '',
    consecutive: '',
    account: '',
    concept: '',
    amount: '',
    type: '',
  };
  return (
    <PolicyForm title='Crear Poliza' httpMethod='POST' formValues={formValues} history={history} successMessage='Poliza creada exitosamente' />
  );
};

export default CreatePolicy;
