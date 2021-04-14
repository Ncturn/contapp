import React from 'react';

const BalanceTable = ({ account, policies, handleIdentifierChange }) => {
  return (
    <div>
      <div className='table-title'>
        <label htmlFor='identifier'>
          Cuenta:
          <input className='filterInput' type='text' onChange={handleIdentifierChange} name='identifier' placeholder='identificador' />
        </label>
        <h1> </h1>
        <label htmlFor='description'>
          Nombre:
          <input className='filterInput' type='text' readOnly name='description' value={account.description} />
        </label>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Poliza</th>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Cargos</th>
            <th>Abonos</th>
          </tr>
          {
            policies.length > 0 && policies.map((policy) => {
              return policy.movements.map((movement) => {
                if (account._id === movement.account) {
                  return (
                    <tr key={`${policy.identifier}`}>
                      <td>{ policy.identifier }</td>
                      <td>{ policy.date }</td>
                      <td>{ movement.concept }</td>
                      <td>{ movement.type === 'cargo' && movement.amount }</td>
                      <td>{ movement.type === 'abono' && movement.amount }</td>
                    </tr>
                  );
                }
                return false;
              });
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default BalanceTable;
