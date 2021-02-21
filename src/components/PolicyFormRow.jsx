import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

const PolicyFormRow = ({ fieldName, index, register, errors, handleKeyDown, handleBlur, handleAmountsChange, handleTypesChange }) => {

  return (
    <div className='policyRows' name={fieldName}>
      <input type='hidden' name={`${fieldName}.account`} ref={register} />
      <input className='policyInput' readOnly={true} value={index + 1} ref={register({ required: 'Este campo es requirido' })} name={`${fieldName}.consecutive`} type='number' />
      <div>
        <input onKeyDown={handleKeyDown} onBlur={handleBlur} className='policyInput' ref={register({ required: 'Este campo es requirido', maxLength: { value: 8, message: 'La cuenta no debe ser mayor a 8 caracteres' } })} name={`${fieldName}.accountId`} placeholder='Agrega un identificador de cuenta' type='text' maxLength='8' />
        <ErrorMessage errors={errors} name={`${fieldName}.accountId`} as='p' className='errorMessage' />
      </div>
      <div>
        <input className='policyInput' readOnly={true} name={`${fieldName}.accountName`} type='text' ref={register({ required: 'Cuenta no encontrada' })} />
        <ErrorMessage errors={errors} name={`${fieldName}.accountName`} as='p' className='errorMessage' />
      </div>
      <div>
        <input onKeyDown={handleKeyDown} className='policyInput' ref={register({ required: 'Este campo es requirido' })} name={`${fieldName}.concept`} placeholder='Agrega el concepto de la poliza' type='text' />
        <ErrorMessage errors={errors} name={`${fieldName}.concept`} as='p' className='errorMessage' />
      </div>
      <div>
        <input onKeyDown={handleKeyDown} onChange={handleAmountsChange} className='policyInput' ref={register({ required: 'Este campo es requirido', valueAsNumber: true })} name={`${fieldName}.amount`} type='number' step='0.01' placeholder='importe dos decimales' />
        <ErrorMessage errors={errors} name={`${fieldName}.amount`} as='p' className='errorMessage' />
      </div>
      <div>
        <select onChange={handleTypesChange} className='policyInput' ref={register({ required: 'Este campo es requirido' })} name={`${fieldName}.type`}>
          <option value=''>...</option>
          <option value='cargo'>Cargo</option>
          <option value='abono'>Abono</option>
        </select>
        <ErrorMessage errors={errors} name={`${fieldName}.type`} as='p' className='errorMessage' />
      </div>
    </div>
  );
};

export default PolicyFormRow;
