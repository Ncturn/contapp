import React, { useState, useEffect } from 'react';
import Table from './Table';

const Policy = ({ history }) => {
  const [policies, setPolicies] = useState({
    error: null,
    body: [],
  });
  const title = 'Pólizas';
  const policyFields = [
    'identificador',
    'fecha',
    'consecutivo',
    'cuenta',
    'concepto',
    'importe',
    'tipo',
  ];
  useEffect(async () => {
    const response = await fetch('http://localhost:3000/policy/');
    const responseObject = await response.json();
    setPolicies(responseObject);
  }, []);
  const deletePolicy = async (identifier) => {
    const response = await fetch('http://localhost:3000/policy/', {
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
      alert(responseObject.body);
    } else {
      alert(responseObject.error);
    }
  };
  const handleTrashClick = (identifier) => {
    const confirmDelete = window.confirm(`¿Desea borrar la poliza ${identifier}?`);
    if (confirmDelete) {
      deletePolicy(identifier);
    }
  };
  const handlePencilClick = (identifier) => {
    history.push(`/policy/edit/${identifier}`);
  };
  const handlePlusClick = () => {
    history.push('/policy/create/');
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
    <Table title={title} items={removeDateTime()} fields={policyFields} handleTrashClick={handleTrashClick} handlePencilClick={handlePencilClick} handlePlusClick={handlePlusClick} />
  );
};

export default Policy;
