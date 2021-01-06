import React from 'react';
import Account from './Account';
import getAccount from '../hooks/getAccount';

const AccountTable = () => {
  const accounts = getAccount();
  return (
    <div>
      <h1 id='title'>Account Table</h1>
      <table id='students'>
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
