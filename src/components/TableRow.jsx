import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableRow = ({ itemData, handleTrashClick, handlePencilClick }) => {
  const { identifier } = itemData;
  const values = Object.values(itemData);
  values.splice(values.length - 1, 1);
  values.splice(0, 1);
  return (
    <tr>
      {
        values.map((field, index) => {
          const addUniqueKey = index;
          if (typeof field === 'object') {
            return <td key={field.identifier + addUniqueKey}>{field.identifier}</td>;
          }
          if (index === values.length - 1) {
            return (
              <td className='row-options' key={field + addUniqueKey}>
                {field}
                <div className='row-buttons'>
                  <FontAwesomeIcon onClick={() => handlePencilClick(identifier)} icon='pencil-alt' />
                  <FontAwesomeIcon onClick={() => handleTrashClick(identifier)} icon='trash-alt' />
                </div>
              </td>
            );
          }
          return <td key={field + addUniqueKey}>{field}</td>;
        })
      }

    </tr>
  );
};

export default TableRow;
