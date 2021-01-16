import React from 'react';

const AccountRow = (account) => {
  const { identifier, description, level, type, keycontrol, balance, accounttype } = account.account;
  return (
    <tr>
      <td>{identifier}</td>
      <td>{description}</td>
      <td>{accounttype.toUpperCase()}</td>
      <td>{`NIVEL ${level}`}</td>
      <td>{type.toUpperCase()}</td>
      <td>{keycontrol}</td>
      <td>{balance.toUpperCase()}</td>
    </tr>
  );
};

export default AccountRow;
