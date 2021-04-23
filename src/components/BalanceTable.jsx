import React, { useState, useEffect } from 'react';

const BalanceTable = ({ account, policies, handleIdentifierChange, handleMonthChange }) => {
  const [payments, setPayments] = useState(0);
  const [charges, setCharges] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let pay = 0;
    let char = 0;
    const tableRows = policies.map((policy) => {
      return policy.movements.map((movement) => {
        if (account._id === movement.account) {
          if (movement.type === 'cargo') {
            char += parseFloat(movement.amount);
          } else {
            pay += parseFloat(movement.amount);
          }
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
    });
    setRows(tableRows);
    setCharges(char);
    setPayments(pay);
  }, [policies]);

  return (
    <div>
      <div className='table-title'>
        <label htmlFor='identifier'>
          Cuenta:
          <input className='filterInput' type='text' onChange={handleIdentifierChange} name='identifier' placeholder='identificador' />
        </label>
        <label htmlFor='month' onChange={handleMonthChange}>
          Mes:
          <select className='filterInput' name='month'>
            <option value=''>...</option>
            <option value='01'>Enero</option>
            <option value='02'>Febrero</option>
            <option value='03'>Marzo</option>
            <option value='04'>Abril</option>
            <option value='05'>Mayo</option>
            <option value='06'>Junio</option>
            <option value='07'>Julio</option>
            <option value='08'>Agosto</option>
            <option value='09'>Septiembre</option>
            <option value='10'>Octubre</option>
            <option value='11'>Noviembre</option>
            <option value='12'>Diciembre</option>
          </select>
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
          {rows}
          <tr>
            <th>Totales</th>
            <th> </th>
            <th> </th>
            <th>{charges}</th>
            <th>{payments}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BalanceTable;
