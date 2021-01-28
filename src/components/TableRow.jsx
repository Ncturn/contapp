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
          if (typeof field === 'object') {
            return <td key={field.identifier}>{field.identifier}</td>;
          }
          if (index === values.length - 1) {
            return (
              <td className='row-options' key={field}>
                {field}
                <div className='row-buttons'>
                  <FontAwesomeIcon onClick={() => handlePencilClick(identifier)} icon='pencil-alt' />
                  <FontAwesomeIcon onClick={() => handleTrashClick(identifier)} icon='trash-alt' />
                </div>
              </td>
            );
          }
          return <td key={field}>{field}</td>;
        })
      }

    </tr>
  );
};

export default TableRow;
