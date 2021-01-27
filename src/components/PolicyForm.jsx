import React from 'react';
import { useForm } from 'react-hook-form';

const PolicyForm = ({ title, httpMethod, formValues, history, successMessage }) => {
  const { date, identifier, consecutive, account, concept, amount, type } = formValues;
  const { register, handleSubmit, errors } = useForm(
    {
      defaultValues: {
        date,
        identifier,
        consecutive,
        account,
        concept,
        amount,
        type,
      },
    },
  );
  const onSubmit = (data) => {
    const policy = {
      ...data,
      consecutive: parseInt(data.consecutive, 10),
    };
    fetch('http://localhost:3000/policy/', {
      method: httpMethod,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(policy),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.error) {
          alert(successMessage);
          history.push('/policy');
        } else {
          alert(response.error);
        }
      });
  };
  const validateAccount = (value) => {
    const firstNumber = value.charAt(0);
    if (firstNumber > 0 && firstNumber <= 5) {
      return true;
    }
    return false;
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <label htmlFor='date'>
        Fecha
        <input ref={register({ required: 'Este campo es requirido' })} name='date' type='date' />
        {errors.date && <p>{ errors.date.message }</p>}
      </label>
      <label htmlFor='identifier'>
        Identificador
        <input ref={register({ required: 'Este campo es requirido', validate: { length: (value) => validateLength(value, 5) || 'El identificador dede ser de 5 caracteres', format: (value) => validatePolicyFormat(value) || 'El formato debe ser dos letras y tres numeros' } })} name='identifier' placeholder='Agrega un identificador de poliza' type='text' />
        {errors.identifier && <p>{ errors.identifier.message }</p>}
      </label>
      <label htmlFor='consecutive'>
        Consecutivo
        <input ref={register({ required: 'Este campo es requirido', validate: (value) => validateLength(value, 3) || 'El consecutivo debe ser de tres numeros' })} name='consecutive' type='number' placeholder='Agregar consecutivo' />
        {errors.consecutive && <p>{ errors.consecutive.message }</p>}
      </label>
      <label htmlFor='account'>
        Cuenta
        <input ref={register({ required: 'Este campo es requirido', validate: (value) => validateAccount(value) || 'el primer numero debe ser entre 1 y 5', maxLength: { value: 8, message: 'La cuenta no debe ser mayor a 8 caracteres' } })} name='account' placeholder='Agrega un identificador de cuenta' type='text' />
        {errors.account && <p>{ errors.account.message }</p>}
      </label>
      <label htmlFor='concept'>
        Concepto
        <input ref={register({ required: 'Este campo es requirido' })} name='concept' placeholder='Agrega el concepto de la poliza' type='text' />
        {errors.concept && <p>{ errors.concept.message }</p>}
      </label>
      <label htmlFor='amount'>
        Importe
        <input ref={register({ required: 'Este campo es requirido', valueAsNumber: true })} name='amount' type='number' step='0.01' placeholder='Agrega el importe de la poliza solo dos decimales' />
        {errors.amount && <p>{ errors.amount.message }</p>}
      </label>
      <label htmlFor='type'>
        Tipo
        <select ref={register({ required: 'Este campo es requirido' })} name='type'>
          <option value=''>...</option>
          <option value='cargo'>Cargo</option>
          <option value='abono'>Abono</option>
        </select>
        {errors.type && <p>{ errors.type.message }</p>}
      </label>
      <button type='submit'>Crear</button>
    </form>
  );
};

export default PolicyForm;
