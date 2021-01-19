import React from 'react';
import { Link } from 'react-router-dom';
import AccountRow from './AccountRow';
import useAccount from '../hooks/useAccount';
import '../assets/styles/components/AccountTable.scss';

const AccountTable = ({ history }) => {
  const [accounts, setAccounts] = useAccount();
  const removeComponent = (index) => {
    accounts.body.splice(index, 1);
    setAccounts({
      error: accounts.error,
      body: accounts.body,
    });
  };
  console.log(accounts.body);
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
            !accounts.error && accounts.body.map((account, index) => <AccountRow key={account.identifier} history={history} removeComponent={removeComponent} index={index} accountData={account} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
