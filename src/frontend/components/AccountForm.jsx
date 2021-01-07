import React from 'react';

const AccountForm = () => {
  return (
    <form>
      <label htmlFor='identifier'>
        Identificador
        <input className='form-control' id='identifier' placeholder='Agrega un identificador' type='text' />
      </label>
      <label htmlFor='description'>
        Descripcion
        <input className='form-control' id='description' placeholder='Agrega una descripcion' type='textarea' />
      </label>
      <label htmlFor='level'>
        Nivel
        <input className='form-control' id='level' placeholder='Agrega un nivel del 1 al 5' type='number' min='1' max='5' />
      </label>
      <label htmlFor='type'>
        Tipo
        <input className='form-control' id='type' placeholder='Selecciona un tipo' type='number' min='1' max='2' />
      </label>
      <label htmlFor='keycontrol'>
        Llave de control
        <input className='form-control' id='keycontrol' placeholder='Agrega una llave de control valida' type='number' />
      </label>
      <label htmlFor='balance'>
        Tipo de saldo
        <select id='balance'>
          <option>Deudor</option>
          <option>Acreedor</option>
        </select>
      </label>
    </form>
  );
};

export default AccountForm;
