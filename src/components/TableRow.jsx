import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleTrashClick, handlePencilClick } from '../utils/TableEvents';

const TableRow = ({ collection, itemData, deleteItem, history }) => {
  const { identifier } = itemData;
  const values = Object.values(itemData);
  values.splice(values.length - 1, 1);
  values.splice(0, 1);
  const getElement = (key, value, isLastElement) => {
    if (isLastElement) {
      return (
        <td className='row-options' key={key}>
          {value}
          <div className='row-buttons'>
            <FontAwesomeIcon onClick={() => handlePencilClick(history, collection, identifier)} icon='pencil-alt' />
            <FontAwesomeIcon onClick={() => handleTrashClick(identifier, deleteItem)} icon='trash-alt' />
          </div>
        </td>
      );
    }
    return <td key={key}>{value}</td>;
  };
  return (
    <tr>
      {
        values.map((field, index) => {
          const addUniqueKey = index;
          const isLastElement = index === values.length - 1;
          if (typeof field === 'object') {
            if (field.identifier) {
              return getElement(field.identifier + addUniqueKey, field.identifier, isLastElement);
            }
            return getElement(field.length + addUniqueKey, field.length, isLastElement);
          }
          return getElement(field + addUniqueKey, field, isLastElement);
        })
      }

    </tr>
  );
};

export default TableRow;
