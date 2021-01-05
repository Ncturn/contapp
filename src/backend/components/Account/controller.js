const { Validator } = require('node-input-validator');
const store = require('./store');

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
    const accountValidator = new Validator({
      identifier,
      description,
      level,
      type,
      keycontrol,
      balance,
    }, {
      identifier: 'required|integer|digits:8',
      description: 'required|string',
      level: 'required|integer|between:0,6',
      type: 'required|integer|between:0,3',
      keycontrol: 'required|integer',
      balance: 'required|accepted:deudor,acredor',
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
