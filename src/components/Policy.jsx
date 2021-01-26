import React, { useState, useEffect } from 'react';
import Table from './Table';

const Policy = ({ history }) => {
  const [policies, setPolicies] = useState({
    error: null,
    body: [],
  });
  const title = 'Pólizas';
  const policyFields = [
    'date',
    'identifier',
    'consecutive',
    'account',
    'concept',
    'amount',
    'type',
  ];
  useEffect(() => {
    fetch('http://localhost:3000/policy/')
      .then((data) => data.json())
      .then((data) => {
        setPolicies(data);
      });
  }, [policies]);
  const deletePolicy = (identifier) => {
    fetch('http://localhost:3000/policy/', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          alert(response.body);
        } else {
          alert(response.error);
        }
      });
  };
  const handleTrashClick = (identifier) => {
    const confirmDelete = window.confirm(`¿Desea borrar la cuenta ${identifier}?`);
    if (confirmDelete) {
      deletePolicy(identifier);
    }
  };
  const handlePencilClick = (identifier) => {
    // history.push(`/edit/${identifier}`);
  };
  const removeDateTime = () => {
    const policiesRefact = [];
    policies.body.forEach((policy) => {
      policiesRefact.push({
        ...policy,
        date: policy.date.slice(0, policy.date.search('T')),
      });
    });
    return policiesRefact;
  };
  return (
    <Table title={title} items={removeDateTime()} fields={policyFields} handleTrashClick={handleTrashClick} handlePencilClick={handlePencilClick} />
  );
};

export default Policy;
