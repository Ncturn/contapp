const niv = require('node-input-validator');
const store = require('./store');

niv.extendMessages({
  identifier: 'The first number of identifer must be less that 5',
});
niv.extend('identifier', ({ value, args }) => {
  const firstNumber = String(value).charAt(0);
  if (firstNumber <= args[0]) {
    return true;
  }
  return false;
});

const getAccount = () => {
  return new Promise((resolve, reject) => {
    const account = store.find({});
    account
      .then((list) => {
        resolve({
          code: 200,
          body: list,
        });
      })
      .catch((error) => {
        const response = {
          code: 500,
          error,
        };
        reject(response);
      });
  });
};

const createAccount = ({ identifier, description, level, type, keycontrol, balance }) => {
  return new Promise((resolve, reject) => {
    const accountValidator = new niv.Validator({
      identifier,
      description,
      level,
      type,
      keycontrol,
      balance,
    }, {
      identifier: 'required|integer|digits:8|identifier:5',
      description: 'required|string',
      level: 'required|integer|between:1,5',
      type: 'required|integer|between:1,2',
      keycontrol: 'required|integer|digits:8|identifier:5',
      balance: 'required|accepted:deudor,acreedor',
    });
    accountValidator.check()
      .then((matched) => {
        if (matched) {
          const account = {
            identifier,
            description,
            level,
            type,
            keycontrol,
            balance,
          };
          resolve(store.save(account));
        } else {
          const response = {
            code: 400,
            error: accountValidator.errors,
          };
          reject(response);
        }
      });
  });
};

module.exports = {
  getAccount,
  createAccount,
};
