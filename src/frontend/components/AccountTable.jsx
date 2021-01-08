import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account';
import getAccount from '../hooks/getAccount';
import '../assets/styles/components/AccountTable.scss';

const AccountTable = () => {
  const accounts = getAccount();
  return (
    <div>
      <Link to='/create'>create</Link>
      <h1 id='title'>Account Table</h1>
      <table id='account'>
        <tbody>
          <tr>
            <th>Identifier</th>
            <th>Description</th>
            <th>Level</th>
            <th>Type</th>
            <th>Keycontrol</th>
            <th>Balance</th>
          </tr>
          {
            !accounts.error && accounts.body.map((account) => <Account key={account.identifier} account={account} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
