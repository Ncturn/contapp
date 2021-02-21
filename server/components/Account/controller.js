const store = require('./store');
const Validator = require('../../utils/CustomValidator');
const errorResponse = require('../../utils/ErrorResponse');

const getAccount = async (accountfilter) => {
  const filter = {};
  if (accountfilter) {
    filter.identifier = accountfilter;
  }
  const accounts = await store.find(filter);
  return {
    code: 200,
    body: accounts,
    error: null,
  };
};

const createAccount = async (account) => {
  const accountValidator = new Validator({
    ...account,
  }, {
    identifier: 'required|string|length:8,1|account:9',
    description: 'required|string',
    level: 'required|integer|between:1,5',
    type: 'required|string|accepted:resumen,detalle',
    keycontrol: 'required|string|length:8,1|account:9',
    balance: 'required|string|accepted:deudor,acreedor',
    accounttype: 'required|string',
  });
  const matched = await accountValidator.check();
  if (matched) {
    return store.save(account);
  }
  return errorResponse(accountValidator.errors);
};

const removeAccount = async ({ identifier }) => {
  const accountValidator = new Validator({
    identifier,
  }, {
    identifier: 'required|string|length:8,1|account:5',
  });
  const matched = accountValidator.check();
  if (matched) {
    return store.remove(identifier);
  }
  return errorResponse(accountValidator.errors);
};

const editAccount = async (accountEdited) => {
  const accountValidator = new Validator({
    ...accountEdited,
  }, {
    identifier: 'required|string|length:8,1|account:5',
    description: 'required|string',
    level: 'required|integer|between:1,5',
    type: 'required|string|accepted:resumen,detalle',
    keycontrol: 'required|string|length:8,1|account:5',
    balance: 'required|string|accepted:deudor,acreedor',
    accounttype: 'required|string',
  });
  const matched = await accountValidator.check();
  if (matched) {
    return store.edit(accountEdited);
  }
  return errorResponse(accountValidator.errors);
};

module.exports = {
  getAccount,
  createAccount,
  removeAccount,
  editAccount,
};
