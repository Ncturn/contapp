import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import PolicyFormRow from './PolicyFormRow';

const PolicyFormPresentational = ({ title, handleSubmit, onSubmit, register, readOnly, errors, addMovement, handleMinusClick, movements, handleKeyDown, handleBlur, handleAmountsChange, handleTypesChange, chargesValue, paymentsValue }) => {

  const validateLength = (value, validLength) => {
    const policyLength = value.length;
    if (policyLength === validLength) {
      return true;
    }
    return false;
  };
  const validatePolicyFormat = (value) => {
    const letters = value.slice(0, 2);
    const numbers = value.slice(2, 5);
    const matchLetters = letters.match(/[a-zA-Z]/g);
    const matchNumbers = numbers.match(/[0-9]/g);
    if (matchLetters && matchNumbers) {
      if (matchLetters.length === 2 && matchNumbers.length === 3) {
        return true;
      }
    }
    return false;
  };
  return (
    <div>
      <form className='policyForm' onSubmit={handleSubmit(onSubmit)}>
        <h1>{title}</h1>
        <div className='policyHeader'>
          <div className='HeaderLeft'>
            <label htmlFor='identifier'>
              Identificador
              <div>
                <input ref={register({ required: 'Este campo es requirido', validate: { length: (value) => validateLength(value, 5) || 'El identificador dede ser de 5 caracteres', format: (value) => validatePolicyFormat(value) || 'El formato debe ser dos letras y tres numeros' } })} name='identifier' placeholder='Agrega un identificador de poliza' maxLength='5' type='text' readOnly={readOnly} />
                <ErrorMessage errors={errors} name='identifier' as='p' className='errorMessage' />
              </div>
            </label>
            <label htmlFor='date'>
              Fecha
              <div>
                <input ref={register({ required: 'Este campo es requirido' })} name='date' type='date' />
                <ErrorMessage errors={errors} name='date' as='p' className='errorMessage' />
              </div>
            </label>
          </div>
          <div>
            <FontAwesomeIcon onClick={addMovement} className='plus-icon' icon='plus-square' />
            <FontAwesomeIcon onClick={handleMinusClick} className='plus-icon' icon='minus-square' />
          </div>
        </div>
        <div className='policyTitles'>
          <p className='policyP'>
            Consecutivo
          </p>
          <p className='policyP'>
            Cuenta
          </p>
          <p className='policyP'>
            Nombre de la cuenta
          </p>
          <p className='policyP'>
            Concepto
          </p>
          <p className='policyP'>
            Importe
          </p>
          <p className='policyP'>
            Tipo
          </p>
        </div>
        {movements.map((index) => <PolicyFormRow fieldName={`movements[${index}]`} key={`movement[${index}]`} index={index} register={register} errors={errors} handleKeyDown={handleKeyDown} handleBlur={handleBlur} handleAmountsChange={handleAmountsChange} handleTypesChange={handleTypesChange} />)}
        <button type='submit'>Guardar</button>
      </form>
      <div className='policyFooter'>
        <div className='footerInputs'>
          <label htmlFor='charges'>
            Cargos
            <div>
              <input name='charges' type='number' value={chargesValue} readOnly />
            </div>
          </label>
          <label htmlFor='payments'>
            Abonos
            <div>
              <input name='payments' type='number' value={paymentsValue} readOnly />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PolicyFormPresentational;
