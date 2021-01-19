import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountRow = ({ index, accountData, removeComponent, history }) => {
  const { identifier, description, level, type, keycontrol, balance, accounttype } = accountData;
  const sendRequestToDeleteAccount = () => {
    fetch('http://localhost:3000/account/', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          removeComponent(index);
          alert(response.body);
        } else {
          alert(response.error);
        }
      });
  };
  const handleTrashClick = () => {
    const deleteAccount = window.confirm(`¿Desea borrar la cuenta ${identifier}?`);
    if (deleteAccount) {
      sendRequestToDeleteAccount();
    }
  };
  const handlePencilClick = () => {
    history.push(`/edit/${identifier}`);
  };
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
          <FontAwesomeIcon onClick={handlePencilClick} icon='pencil-alt' />
          <FontAwesomeIcon onClick={handleTrashClick} icon='trash-alt' />
        </div>
      </td>
    </tr>
  );
};

export default AccountRow;
