import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <td className='row-options'>
        {balance.toUpperCase()}
        <div className='row-buttons'>
          <FontAwesomeIcon icon='pencil-alt' />
          <FontAwesomeIcon icon='trash-alt' />
        </div>
      </td>
    </tr>
  );
};

export default AccountRow;
