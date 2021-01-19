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

const validateAccount = ({ identifier, description, level, type, keycontrol, balance, accounttype }) => {
  const accountValidator = new niv.Validator({
    identifier,
    description,
    level,
    type,
    keycontrol,
    balance,
    accounttype,
  }, {
    identifier: 'required|string|length:8,1|identifier:5',
    description: 'required|string',
    level: 'required|integer|between:1,5',
    type: 'required|string|accepted:resumen,detalle',
    keycontrol: 'required|string|length:8,1|identifier:5',
    balance: 'required|string|accepted:deudor,acreedor',
    accounttype: 'required|string',
  });
  return accountValidator;
};

const getValidatorErrors = (errorObject) => {
  const input = Object.keys(errorObject);
  const error = errorObject[input[0]];
  const response = {
    code: 400,
    error: error.message,
  };
  return response;
};

const getAccount = (accountfilter) => {
  return new Promise((resolve, reject) => {
    const filter = {};
    if (accountfilter) {
      filter.identifier = accountfilter;
    }
    const account = store.find(filter);
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

const createAccount = ({ identifier, description, level, type, keycontrol, balance, accounttype }) => {
  return new Promise((resolve, reject) => {
    const accountValidator = new niv.Validator({
      identifier,
      description,
      level,
      type,
      keycontrol,
      balance,
      accounttype,
    }, {
      identifier: 'required|string|length:8,1|identifier:5',
      description: 'required|string',
      level: 'required|integer|between:1,5',
      type: 'required|string|accepted:resumen,detalle',
      keycontrol: 'required|string|length:8,1|identifier:5',
      balance: 'required|string|accepted:deudor,acreedor',
      accounttype: 'required|string',
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
            accounttype,
          };
          resolve(store.save(account));
        } else {
          const input = Object.keys(accountValidator.errors);
          const error = accountValidator.errors[input[0]];
          const response = {
            code: 400,
            error: error.message,
          };
          reject(response);
        }
      });
  });
};

const deleteAccount = (identifier) => {
  return new Promise((resolve, reject) => {
    const accountValidator = new niv.Validator({
      identifier,
    }, {
      identifier: 'required|string|length:8,1|identifier:5',
    });
    accountValidator.check()
      .then((matched) => {
        if (matched) {
          resolve(store.remove(identifier));
        } else {
          reject(getValidatorErrors(accountValidator.errors));
        }
      });
  });
};

const editAccount = (accountEdited) => {
  return new Promise((resolve, reject) => {
    const accountValidator = validateAccount(accountEdited);
    accountValidator.check()
      .then((matched) => {
        if (matched) {
          resolve(store.edit(accountEdited));
        } else {
          reject(getValidatorErrors(accountValidator.errors));
        }
      });
  });
};

module.exports = {
  getAccount,
  createAccount,
  deleteAccount,
  editAccount,
};
