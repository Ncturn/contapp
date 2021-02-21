import React, { useState, useEffect } from 'react';
import PolicyForm from '../components/PolicyForm';

const EditPolicy = ({ history, match }) => {
  const [policy, setPolicy] = useState({
    date: '',
    identifier: '',
    movements: [],
  });
  const getRefactorPolicy = (policy) => {
    const newPolicy = {
      ...policy,
      date: policy.date.slice(0, policy.date.search('T')),
    };
    for (let index = 0; index < newPolicy.movements.length; index++) {
      newPolicy.movements[index].accountId = newPolicy.movements[index].account.identifier;
      newPolicy.movements[index].accountName = newPolicy.movements[index].account.description;
      newPolicy.movements[index].account = newPolicy.movements[index].account._id;
    }
    return newPolicy;
  };
  const getIndexArray = () => {
    const indexes = [];
    for (let index = 0; index < policy.movements.length; index++) {
      indexes.push(index);
    }
    return indexes;
  };
  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/policy/?identifier=${match.params.identifier}`);
    const data = await response.json();
    const refactPolicy = getRefactorPolicy(data.body[0]);
    setPolicy(refactPolicy);
  }, []);
  return (
    <PolicyForm title='Editar Poliza' httpMethod='PATCH' formValues={policy} history={history} successMessage='Cambios guardados' readOnly={true} initialIdex={getIndexArray()} initialCounter={policy.movements.length} />
  );
};

export default EditPolicy;
