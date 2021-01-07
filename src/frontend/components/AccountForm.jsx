import React from 'react';
import '../assets/styles/components/AccountForm.scss';

const AccountForm = () => {
  return (
    <form>
      <h1>Crea un nueva cuenta</h1>
      <label htmlFor='identifier'>
        Identificador
        <input id='identifier' placeholder='Agrega un identificador numerico' type='text' maxLength='8' />
      </label>
      <label htmlFor='description'>
        Descripcion
        <textarea id='description' placeholder='Agrega una descripcion' rows='5' />
      </label>
      <label htmlFor='level'>
        Nivel
        <select id='level'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </label>
      <label htmlFor='type'>
        Tipo
        <select id='type'>
          <option>1</option>
          <option>2</option>
        </select>
      </label>
      <label htmlFor='keycontrol'>
        Llave de control
        <input id='keycontrol' placeholder='Agrega una llave de control numerica valida' type='text' maxLength='8' />
      </label>
      <label htmlFor='balance'>
        Tipo de saldo
        <select id='balance'>
          <option>Deudor</option>
          <option>Acreedor</option>
        </select>
      </label>
      <button type='submit'>Crear</button>
    </form>
  );
};

export default AccountForm;
