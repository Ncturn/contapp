const niv = require('node-input-validator');

niv.extendMessages({
  account: 'El primer numero de la cuenta no puede ser 0',
});
niv.extend('account', ({ value, args }) => {
  const firstNumber = String(value).charAt(0);
  if (firstNumber <= args[0]) {
    return true;
  }
  return false;
});

niv.extendMessages({
  policy: 'El identificador de póliza debe empezar con dos letras seguidas de tres numeros',
});
niv.extend('policy', ({ value }) => {
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
});

module.exports = niv.Validator;
