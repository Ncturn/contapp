import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableRow from './TableRow';
import { handleFilterChange, handlePlusClick } from '../utils/TableEvents';
import '../assets/styles/components/AccountTable.scss';
import useCollection from '../hooks/useCollection';
import { getCollection, deleteItem } from '../utils/CollectionApi';

const Table = ({ title, name, fields, history }) => {
  const [collection, setCollection] = useCollection(name);

  const updateTable = async (identifier) => {
    const data = await getCollection(name, identifier);
    setCollection(data);
  };

  const removeRow = async (identifier) => {
    const data = await deleteItem(name, identifier);
    if (!data.error) {
      alert(data.body);
    } else {
      alert(data.error);
    }
    updateTable();
  };

  const createHotKeyPlusIcon = (event) => {
    if (event.key === '+') {
      event.preventDefault();
      handlePlusClick(history, name);
    }
  };

  const createListener = () => {
    window.addEventListener('keydown', createHotKeyPlusIcon);
  };

  const removeListener = () => {
    window.removeEventListener('keydown', createHotKeyPlusIcon);
  };

  useEffect(() => {
    createListener();
    return removeListener;
  }, []);

  return (
    <div>
      <div className='table-title'>
        <input className='filterInput' type='text' onChange={(event) => handleFilterChange(event, updateTable)} name='filter' placeholder='identificador' />
        <h1>{title}</h1>
        <FontAwesomeIcon onClick={() => handlePlusClick(history, name)} className='plus-icon' icon='plus-square' />
      </div>
      <table>
        <tbody>
          <tr>
            {
              fields.map((field) => <th key={field}>{field.toUpperCase()}</th>)
            }
          </tr>
          {
            collection.body.map((item) => <TableRow key={item.identifier} collection={name} itemData={item} removeRow={removeRow} history={history} />)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
