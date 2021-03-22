import React, { useState, useEffect } from 'react';
import Table from './Table';
import { handlePlusClick } from '../utils/TableEvents';

const Policy = ({ history }) => {
  const [policies, setPolicies] = useState({
    error: null,
    body: [],
  });
  const title = 'Pólizas';
  const collection = 'policy';
  const policyFields = [
    'identificador',
    'fecha',
    '# movimientos',
  ];
  const getPolicies = async (identifier) => {
    let parameter = '';
    if (identifier) {
      parameter = `?identifier=${identifier}`;
    }
    const response = await fetch(`http://localhost:3000/policy${parameter}`);
    const responseObject = await response.json();
    setPolicies(responseObject);
  };
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
      getPolicies();
      alert(responseObject.body);
    } else {
      alert(responseObject.error);
    }
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
  const createHotKeyPlusIcon = (event) => {
    if (event.key === '+') {
      event.preventDefault();
      handlePlusClick(history, collection);
    }
  };
  useEffect(() => {
    getPolicies();
    window.addEventListener('keydown', createHotKeyPlusIcon);
    return () => {
      window.removeEventListener('keydown', createHotKeyPlusIcon);
    };
  }, []);
  return (
    <Table title={title} items={removeDateTime()} collection={collection} fields={policyFields} getCollection={getPolicies} deleteItem={deletePolicy} history={history} />
  );
};

export default Policy;
