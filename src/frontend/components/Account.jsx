import React from 'react';

const Account = (account) => {
  const { identifier, description, level, type, keycontrol, balance } = account.account;
  return (
    <tr>
      <td>{identifier}</td>
      <td>{description}</td>
      <td>{level}</td>
      <td>{type}</td>
      <td>{keycontrol}</td>
      <td>{balance}</td>
    </tr>
  );
};

export default Account;
