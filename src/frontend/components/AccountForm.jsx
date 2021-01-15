import React, { useState } from 'react';
import '../assets/styles/components/AccountForm.scss';
import { Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AccountForm = () => {
  const [redirect, setRedirect] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch('http://localhost:3000/account/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.error) {
          setRedirect(true);
          alert('Cuenta creada exitosamente');
        } else {
          alert(response.error);
        }
      });
  };
  const firstNumberIdentifier = (value) => {
    const firstNumber = String(value).charAt(0);
    if (firstNumber > 0 && firstNumber <= 5) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <Link to='/'>Home</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        { redirect && <Redirect to='/' />}
        <h1>Crea una nueva cuenta</h1>
        <label htmlFor='identifier'>
          Identificador
          <input ref={register({ required: 'Este campo es requirido', valueAsNumber: true, validate: (value) => firstNumberIdentifier(value) || 'el primer numero debe ser entre 1 y 5', maxLength: { value: 8, message: 'El identificador no debe ser mayor a 8 digitos' } })} name='identifier' placeholder='Agrega un identificador numerico' type='number' />
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
          <select ref={register({ required: 'Este campo es requirido', valueAsNumber: true })} name='type'>
            <option value=''>...</option>
            <option>1</option>
            <option>2</option>
          </select>
          {errors.type && <p>{ errors.type.message }</p>}
        </label>
        <label htmlFor='keycontrol'>
          Llave de control
          <input ref={register({ required: 'Este campo es requirido', valueAsNumber: true, validate: (value) => firstNumberIdentifier(value) || 'el primer numero debe ser entre 1 y 5', maxLength: { value: 8, message: 'La llave no debe ser mayor a 8 digitos' } })} name='keycontrol' placeholder='Agrega una llave de control numerica valida' type='number' />
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
        <button type='submit'>Crear</button>
      </form>
    </div>
  );
};

export default AccountForm;
