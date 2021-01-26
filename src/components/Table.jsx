import React from 'react';
import TableRow from './TableRow';
import '../assets/styles/components/AccountTable.scss';

const Table = ({ title, items, fields, handleTrashClick, handlePencilClick }) => {
  return (
    <div>
      <h1 id='title'>{title}</h1>
      <table id='account'>
        <tbody>
          <tr>
            {
              fields.map((field) => <th key={field}>{field.toUpperCase()}</th>)
            }
          </tr>
          {
            items.map((item) => <TableRow key={item.identifier} itemData={item} handleTrashClick={handleTrashClick} handlePencilClick={handlePencilClick} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
