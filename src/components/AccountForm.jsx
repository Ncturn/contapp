import React, { useEffect } from 'react';
import '../assets/styles/components/AccountForm.scss';
import { useForm } from 'react-hook-form';

const AccountForm = ({ title, httpMethod, formValues, history, successMessage, disable = false }) => {
  const { register, handleSubmit, errors, reset } = useForm(
    {
      defaultValues: formValues,
    },
  );
  useEffect(() => {
    reset(formValues);
  }, [formValues]);
  let assingAccounttype = true;
  let accounttype = '';
  const onSubmit = async (data) => {
    let identifier = '';
    if (disable) {
      identifier = formValues.identifier;
    } else {
      identifier = data.identifier;
    }
    const account = {
      ...data,
      accounttype,
      identifier,
    };
    const response = await fetch('http://localhost:3000/account/', {
      method: httpMethod,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(account),
    });
    const responseObject = await response.json();
    if (!responseObject.error) {
      alert(successMessage);
      history.push('/account');
    } else {
      alert(responseObject.error);
    }
  };
  const setAccountType = (number) => {
    switch (number) {
      case '1':
        accounttype = 'activo';
        break;
      case '2':
        accounttype = 'pasivo';
        break;
      case '3':
        accounttype = 'capital';
        break;
      case '4':
        accounttype = 'ingresos';
        break;
      case '5':
        accounttype = 'gastos';
        break;
      default:
        break;
    }
  };
  const firstNumberIdentifier = (value) => {
    const firstNumber = String(value).charAt(0);
    if (firstNumber > 0 && firstNumber <= 5) {
      if (assingAccounttype) {
        setAccountType(firstNumber);
        assingAccounttype = false;
      } else {
        assingAccounttype = true;
      }
      return true;
    }
    return false;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <label htmlFor='identifier'>
        Identificador
        <input ref={register({ required: 'Este campo es requirido', validate: (value) => firstNumberIdentifier(value) || 'el primer numero debe ser entre 1 y 5', maxLength: { value: 8, message: 'El identificador no debe ser mayor a 8 digitos' } })} name='identifier' placeholder='Agrega un identificador de cuenta' type='text' disabled={disable} />
        {errors.identifier && <p>{ errors.identifier.message }</p>}
      </label>
      <label htmlFor='description'>
        Descripcion
        <textarea ref={register({ required: 'Este campo es requirido' })} name='description' placeholder='Agrega una descripcion' rows='5' />
        {errors.description && <p>{ errors.description.message }</p>}
      </label>
      <label htmlFor='level'>
        Nivel
        <select ref={register({ required: 'Este campo es requirido', valueAsNumber: true })} name='level'>
          <option value=''>...</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        {errors.level && <p>{ errors.level.message }</p>}
      </label>
      <label htmlFor='type'>
        Tipo
        <select ref={register({ required: 'Este campo es requirido' })} name='type'>
          <option value=''>...</option>
          <option value='resumen'>Resumen</option>
          <option value='detalle'>Detalle</option>
        </select>
        {errors.type && <p>{ errors.type.message }</p>}
      </label>
      <label htmlFor='keycontrol'>
        Llave de control
        <input ref={register({ required: 'Este campo es requirido', validate: (value) => firstNumberIdentifier(value) || 'el primer numero debe ser entre 1 y 5', maxLength: { value: 8, message: 'La llave no debe ser mayor a 8 digitos' } })} name='keycontrol' placeholder='Agrega una llave de control numerica valida' type='text' />
        {errors.keycontrol && <p>{ errors.keycontrol.message }</p>}
      </label>
      <label htmlFor='balance'>
        Tipo de saldo
        <select ref={register({ required: 'Este campo es requirido' })} name='balance'>
          <option value=''>...</option>
          <option value='deudor'>Deudor</option>
          <option value='acreedor'>Acreedor</option>
        </select>
        {errors.balance && <p>{ errors.balance.message }</p>}
      </label>
      <button type='submit'>Guardar</button>
    </form>
  );
};

export default AccountForm;
