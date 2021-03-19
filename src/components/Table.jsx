import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableRow from './TableRow';
import { handleFilterChange, handlePlusClick } from '../utils/TableEvents';
import '../assets/styles/components/AccountTable.scss';

const Table = ({ title, collection, items, fields, getCollection, deleteItem, history }) => {
  return (
    <div>
      <div className='table-title'>
        <input className='filterInput' type='text' onChange={(event) => handleFilterChange(event, getCollection)} name='filter' placeholder='identificador' />
        <h1>{title}</h1>
        <FontAwesomeIcon onClick={() => handlePlusClick(history, collection)} className='plus-icon' icon='plus-square' />
      </div>
      <table>
        <tbody>
          <tr>
            {
              fields.map((field) => <th key={field}>{field.toUpperCase()}</th>)
            }
          </tr>
          {
            items.map((item) => <TableRow key={item.identifier} collection={collection} itemData={item} deleteItem={deleteItem} history={history} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
