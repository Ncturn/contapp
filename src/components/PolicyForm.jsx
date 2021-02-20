import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import PolicyFormRow from './PolicyFormRow';
import '../assets/styles/components/PolicyForm.scss';

const PolicyForm = ({ title, httpMethod, formValues, history, successMessage, disable = false }) => {
  const [indexes, setIndexes] = useState([0]);
  const [counter, setCounter] = useState(1);
  const { register, handleSubmit, errors, reset, setValue } = useForm(
    {
      defaultValues: formValues,
    },
  );
  useEffect(() => {
    reset(formValues);
  }, [formValues]);
  const addMovement = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeMovement = () => {
    setIndexes((prevIndexes) => {
      prevIndexes.pop();
      return prevIndexes;
    });
    setCounter((prevCounter) => prevCounter - 1);
  };
  const onSubmit = async (data) => {
    let identifier = '';
    if (disable) {
      identifier = formValues.identifier;
    } else {
      identifier = data.identifier;
    }
    const policy = {
      ...data,
      identifier,
    };
    const response = await fetch('http://localhost:3000/policy/', {
      method: httpMethod,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(policy),
    });
    const responseObject = await response.json();
    if (!responseObject.error) {
      alert(successMessage);
      history.push('/policy');
    } else {
      alert(responseObject.error);
    }
  };
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
  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && event.target.value === '' && counter > 1) {
      const inputName = event.target.name;
      const lastElementName = inputName.replace(counter - 1, (counter - 2));
      const lastElementValue = document.getElementsByName(lastElementName)[0].value;
      setValue(inputName, lastElementValue);
    }
  };
  const getAccountName = async (accountId, accountNameInput) => {
    const response = await fetch(`http://localhost:3000/account/?identifier=${accountId}`);
    const responseObject = await response.json();
    if (responseObject.body.length > 0) {
      setValue(accountNameInput, responseObject.body[0].description);
    } else {
      setValue(accountNameInput, '');
      alert('Identificador de cuenta no encontrado');
    }
  };
  const handleBlur = (event) => {
    const accountNameInput = event.target.name.replace('account', 'accountName');
    const accountValue = event.target.value;
    if (accountValue !== '') {
      getAccountName(accountValue, accountNameInput);
    }
  };
  return (
    <form className='policyForm' onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <div className='policyHeader'>
        <div className='HeaderLeft'>
          <label htmlFor='identifier'>
            Identificador
            <div>
              <input ref={register({ required: 'Este campo es requirido', validate: { length: (value) => validateLength(value, 5) || 'El identificador dede ser de 5 caracteres', format: (value) => validatePolicyFormat(value) || 'El formato debe ser dos letras y tres numeros' } })} name='identifier' placeholder='Agrega un identificador de poliza' maxLength='5' type='text' disabled={disable} />
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
          <FontAwesomeIcon onClick={removeMovement} className='plus-icon' icon='minus-square' />
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
      {indexes.map((index) => <PolicyFormRow fieldName={`movements[${index}]`} key={`movement[${index}]`} index={index} register={register} errors={errors} handleKeyDown={handleKeyDown} handleBlur={handleBlur} />)}
      <button type='submit'>Guardar</button>
    </form>
  );
};

export default PolicyForm;
