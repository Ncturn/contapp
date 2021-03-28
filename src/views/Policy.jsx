import React from 'react';
import Table from '../components/Table';

const Policy = ({ history }) => {
  const title = 'Pólizas';
  const collection = 'policy';
  const policyFields = [
    'identificador',
    'fecha',
    '# movimientos',
  ];
  return (
    <Table title={title} name={collection} fields={policyFields} history={history} />
  );
};

export default Policy;
