import React, { useEffect } from 'react';
import '../assets/styles/components/AccountForm.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AccountForm = ({ title, httpMethod, formValues, history, successMessage, readOnly = false }) => {
  const { register, handleSubmit, errors, reset } = useForm(
    {
      defaultValues: formValues,
    },
  );
  useEffect(() => {
    reset(formValues);
    document.getElementsByName('identifier')[0].focus();
  }, [formValues]);
  let assingAccounttype = true;
  let accounttype = '';
  const onSubmit = async (data) => {
    const account = {
      ...data,
      accounttype,
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
        accounttype = 'capital contable';
        break;
      case '4':
        accounttype = 'ingresos';
        break;
      case '5':
        accounttype = 'costos';
        break;
      case '6':
        accounttype = 'gastos generales';
        break;
      case '7':
        accounttype = 'financiamiento';
        break;
      case '8':
        accounttype = 'cuenta deudora';
        break;
      case '9':
        accounttype = 'cuenta acreedora';
        break;
      default:
        break;
    }
  };
  const firstNumberIdentifier = (value) => {
    const firstNumber = String(value).charAt(0);
    if (firstNumber > 0) {
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
    <form className='accountForm' onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <label className='accountLabel' htmlFor='identifier'>
        Identificador
        <input className='accountInput' ref={register({ required: 'Este campo es requirido', validate: (value) => firstNumberIdentifier(value) || 'la cuenta no debe empezar con 0', maxLength: { value: 8, message: 'El identificador no debe ser mayor a 8 digitos' } })} name='identifier' placeholder='Agrega un identificador de cuenta' type='text' readOnly={readOnly} maxLength='8' />
        <ErrorMessage errors={errors} name='identifier' as='p' className='errorMessage' />
      </label>
      <label className='accountLabel' htmlFor='description'>
        Nombre de la cuenta
        <textarea className='accountTextarea' ref={register({ required: 'Este campo es requirido' })} name='description' placeholder='Agrega un nombre' rows='5' />
        <ErrorMessage errors={errors} name='description' as='p' className='errorMessage' />
      </label>
      <label className='accountLabel' htmlFor='level'>
        Nivel
        <select className='accountSelect' ref={register({ required: 'Este campo es requirido', valueAsNumber: true })} name='level'>
          <option value=''>...</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <ErrorMessage errors={errors} name='level' as='p' className='errorMessage' />
      </label>
      <label className='accountLabel' htmlFor='type'>
        Tipo
        <select className='accountSelect' ref={register({ required: 'Este campo es requirido' })} name='type'>
          <option value=''>...</option>
          <option value='resumen'>Resumen</option>
          <option value='detalle'>Detalle</option>
        </select>
        <ErrorMessage errors={errors} name='type' as='p' className='errorMessage' />
      </label>
      <label className='accountLabel' htmlFor='keycontrol'>
        Llave de control
        <input className='accountInput' ref={register({ required: 'Este campo es requirido', validate: (value) => firstNumberIdentifier(value) || 'la cuenta no debe empezar con 0', maxLength: { value: 8, message: 'La llave no debe ser mayor a 8 digitos' } })} name='keycontrol' placeholder='Agrega una llave de control numerica valida' type='text' maxLength='8' />
        <ErrorMessage errors={errors} name='keycontrol' as='p' className='errorMessage' />
      </label>
      <label className='accountLabel' htmlFor='balance'>
        Tipo de saldo
        <select className='accountSelect' ref={register({ required: 'Este campo es requirido' })} name='balance'>
          <option value=''>...</option>
          <option value='deudor'>Deudor</option>
          <option value='acreedor'>Acreedor</option>
        </select>
        <ErrorMessage errors={errors} name='balance' as='p' className='errorMessage' />
      </label>
      <button type='submit'>Guardar</button>
    </form>
  );
};

export default AccountForm;
