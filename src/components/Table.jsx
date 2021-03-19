import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableRow from './TableRow';
import { handleFilterChange } from '../utils/TableEvents';
import '../assets/styles/components/AccountTable.scss';

const Table = ({ title, items, fields, getCollection, handleTrashClick, handlePencilClick, handlePlusClick }) => {
  return (
    <div>
      <div className='table-title'>
        <input className='filterInput' type='text' onChange={(event) => { handleFilterChange(event, getCollection); }} name='filter' placeholder='identificador' />
        <h1>{title}</h1>
        <FontAwesomeIcon onClick={handlePlusClick} className='plus-icon' icon='plus-square' />
      </div>
      <table>
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
