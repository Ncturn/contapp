import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import PolicyFormRow from './PolicyFormRow';
import { getCollection, createItem } from '../utils/CollectionApi';
import '../assets/styles/components/PolicyForm.scss';

const PolicyForm = ({ title, httpMethod, formValues, history, successMessage, readOnly = false, initialMovements = [0], initialPayments = { names: [], value: 0 }, initialCharges = { names: [], value: 0 } }) => {

  const [movements, setMovements] = useState(initialMovements);
  const [payments, setPayments] = useState(initialPayments);
  const [charges, setCharges] = useState(initialCharges);
  const { register, handleSubmit, errors, reset, setValue, getValues } = useForm(
    {
      defaultValues: formValues,
    },
  );
  const totalAmountsAreEqual = () => {
    return payments.value === charges.value;
  };
  const onSubmit = async (formData) => {
    if (totalAmountsAreEqual()) {
      const data = await createItem('policy', httpMethod, formData);
      if (!data.error) {
        alert(successMessage);
        history.push('/policy');
      } else {
        alert(data.error);
      }
    } else {
      alert('Los cargos y abonos no son equivalentes');
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
    if (event.key === 'Tab' && event.target.value === '' && movements.length > 1) {
      const inputName = event.target.name;
      const lastElementName = inputName.replace(movements.length - 1, (movements.length - 2));
      const lastElementValue = document.getElementsByName(lastElementName)[0].value;
      setValue(inputName, lastElementValue);
    }
  };
  const getAccountName = async (accountId, accountNameInput) => {
    const data = await getCollection('account', accountId);
    if (data.body.length > 0) {
      setValue(accountNameInput, data.body[0].description);
      const accountInput = accountNameInput.replace('accountName', 'account');
      setValue(accountInput, data.body[0]._id);
    } else {
      setValue(accountNameInput, '');
      alert('Identificador de cuenta no encontrado');
    }
  };
  const handleBlur = (event) => {
    const accountNameInput = event.target.name.replace('accountId', 'accountName');
    const accountIdValue = event.target.value;
    if (accountIdValue !== '') {
      getAccountName(accountIdValue, accountNameInput);
    }
  };
  const calculateTotal = (names) => {
    let value = 0;
    names.forEach((amountName) => {
      value += getValues(amountName);
    });
    return value;
  };
  const addTotalAmountRef = (amountName, amount) => {
    if (amount === 'payments') {
      const paymentsNames = [...payments.names];
      if (paymentsNames.indexOf(amountName) === -1) {
        paymentsNames.push(amountName);
      }
      const value = calculateTotal(paymentsNames);
      setPayments({
        names: paymentsNames,
        value,
      });
    } else {
      const chargesNames = [...charges.names];
      if (chargesNames.indexOf(amountName) === -1) {
        chargesNames.push(amountName);
      }
      const value = calculateTotal(chargesNames);
      setCharges({
        names: chargesNames,
        value,
      });
    }
  };
  const removeTotalAmountRef = (amountName, amount) => {
    if (amount === 'payments') {
      const paymentsNames = [...payments.names];
      const amountIndex = paymentsNames.indexOf(amountName);
      if (amountIndex > -1) {
        paymentsNames.splice(amountIndex, 1);
      }
      const value = calculateTotal(paymentsNames);
      setPayments({
        names: paymentsNames,
        value,
      });
    } else {
      const chargesNames = [...charges.names];
      const amountIndex = chargesNames.indexOf(amountName);
      if (amountIndex > -1) {
        chargesNames.splice(amountIndex, 1);
      }
      const value = calculateTotal(chargesNames);
      setCharges({
        names: chargesNames,
        value,
      });
    }
  };
  const validateTypeValue = (typeValue, amountName) => {
    if (typeValue !== '') {
      if (typeValue === 'abono') {
        addTotalAmountRef(amountName, 'payments');
        removeTotalAmountRef(amountName, 'charges');
      } else {
        addTotalAmountRef(amountName, 'charges');
        removeTotalAmountRef(amountName, 'payments');
      }
    }
  };
  const handleAmountsChange = (event) => {
    const amountName = event.target.name;
    const typeName = amountName.replace('amount', 'type');
    const typeValue = getValues(typeName);
    validateTypeValue(typeValue, amountName);
  };
  const handleTypesChange = (event) => {
    const typeName = event.target.name;
    const typeValue = getValues(typeName);
    const amountName = typeName.replace('type', 'amount');
    validateTypeValue(typeValue, amountName);
  };
  const addMovement = () => {
    setMovements((prevIndexes) => [...prevIndexes, movements.length]);
  };
  const removeMovement = () => {
    const movementsPop = [...movements];
    movementsPop.pop();
    setMovements(movementsPop);
    const amountName = `movements[${movements.length - 1}].amount`;
    removeTotalAmountRef(amountName, 'payments');
    removeTotalAmountRef(amountName, 'charges');
  };
  const handleMinusClick = () => {
    const confirmDelete = window.confirm(`¿Desea borrar la fila #${movements.length}?`);
    if (confirmDelete) {
      removeMovement();
    }
  };
  const createHotKeyPlusIcon = (event) => {
    if (event.key === '+') {
      event.preventDefault();
      addMovement();
    }
  };
  const createHotKeyMinusIcon = (event) => {
    if (event.key === '-') {
      event.preventDefault();
      handleMinusClick();
    }
  };
  useEffect(() => {
    reset(formValues);
    setMovements(initialMovements);
    setPayments(initialPayments);
    setCharges(initialCharges);
    document.getElementsByName('identifier')[0].focus();
    window.addEventListener('keydown', createHotKeyPlusIcon);
    window.addEventListener('keydown', createHotKeyMinusIcon);
    return () => {
      window.removeEventListener('keydown', createHotKeyPlusIcon);
      window.removeEventListener('keydown', createHotKeyMinusIcon);
    };
  }, [formValues]);
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
              <input name='charges' type='number' value={charges.value} readOnly />
            </div>
          </label>
          <label htmlFor='payments'>
            Abonos
            <div>
              <input name='payments' type='number' value={payments.value} readOnly />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
