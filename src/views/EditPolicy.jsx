import React, { useState, useEffect } from 'react';
import PolicyForm from '../components/PolicyForm';
import { getCollection } from '../utils/CollectionApi';

const EditPolicy = ({ history, match }) => {
  const [policy, setPolicy] = useState({
    date: '',
    identifier: '',
    movements: [],
  });
  const getAmounts = (type) => {
    const amount = {
      value: 0,
      names: [],
    };
    policy.movements.forEach((movement, index) => {
      if (movement.type === type) {
        amount.value += parseInt(movement.amount, 10);
        const amountName = `movements[${index}].amount`;
        amount.names.push(amountName);
      }
    });
    return amount;
  };
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
    const data = await getCollection('policy', match.params.identifier);
    const refactPolicy = getRefactorPolicy(data.body[0]);
    setPolicy(refactPolicy);
  }, []);
  return (
    <PolicyForm title='Editar Poliza' httpMethod='PATCH' formValues={policy} history={history} successMessage='Cambios guardados' readOnly={true} initialMovements={getIndexArray()} initialPayments={getAmounts('abono')} initialCharges={getAmounts('cargo')} />
  );
};

export default EditPolicy;
