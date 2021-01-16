import React from 'react';
import { Link } from 'react-router-dom';
import AccountRow from './AccountRow';
import getAccount from '../hooks/getAccount';
import '../assets/styles/components/AccountTable.scss';

const AccountTable = () => {
  const accounts = getAccount();
  return (
    <div>
      <Link to='/create'>Crear nueva cuenta</Link>
      <h1 id='title'>Account Table</h1>
      <table id='account'>
        <tbody>
          <tr>
            <th>Identificador</th>
            <th>Descripcion</th>
            <th>Tipo de cuenta</th>
            <th>Nivel</th>
            <th>Tipo</th>
            <th>LLave padre</th>
            <th>Balance</th>
          </tr>
          {
            !accounts.error && accounts.body.map((account) => <AccountRow key={account.identifier} account={account} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
