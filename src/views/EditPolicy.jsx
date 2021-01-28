import React, { useState, useEffect } from 'react';
import PolicyForm from '../components/PolicyForm';

const EditPolicy = ({ history, match }) => {
  const [policy, setPolicy] = useState({
    date: '',
    identifier: '',
    consecutive: '',
    account: '',
    concept: '',
    amount: '',
    type: '',
  });
  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/policy/?identifier=${match.params.identifier}`);
    const data = await response.json();
    const refactPolicy = {
      ...data.body[0],
      date: data.body[0].date.slice(0, data.body[0].date.search('T')),
      account: data.body[0].account.identifier,
    };
    setPolicy(refactPolicy);
  }, []);
  return (
    <PolicyForm title='Editar Poliza' httpMethod='PATCH' formValues={policy} history={history} successMessage='Cambios guardados' />
  );
};

export default EditPolicy;
