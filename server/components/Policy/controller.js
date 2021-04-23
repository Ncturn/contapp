const store = require('./store');
const Validator = require('../../utils/CustomValidator');
const errorResponse = require('../../utils/ErrorResponse');

const getPolicyValidator = (policy) => {
  const policyValidator = new Validator({
    ...policy,
  }, {
    date: 'required|date',
    identifier: 'required|string|length:5,5|policy',
    movements: 'required|array',
    'movements.*.consecutive': 'required|integer',
    'movements.*.account': 'required|mongoId',
    'movements.*.concept': 'required|string',
    'movements.*.amount': 'required|decimal',
    'movements.*.type': 'required|string|accepted:cargo,abono',
  });
  return policyValidator;
};

const getPolicy = async (identifier) => {
  const filter = {};
  if (identifier) {
    filter.identifier = identifier;
  }
  const policies = await store.find(filter);
  return {
    code: 200,
    body: policies,
    error: null,
  };
};

const createPolicy = async (policy) => {
  const policyValidator = getPolicyValidator(policy);
  const matched = await policyValidator.check();
  if (matched) {
    return store.save(policy);
  }
  const response = errorResponse(policyValidator.errors);
  return response;
};

const removePolicy = async ({ identifier }) => {
  const policyValidator = new Validator({
    identifier,
  }, {
    identifier: 'required|string|length:5,5|policy',
  });
  const matched = await policyValidator.check();
  if (matched) {
    return store.remove(identifier);
  }
  const response = errorResponse(policyValidator.errors);
  return response;
};

const editPolicy = async (policy) => {
  const policyValidator = getPolicyValidator(policy);
  const matched = await policyValidator.check();
  if (matched) {
    return store.edit(policy);
  }
  const response = errorResponse(policyValidator.errors);
  return response;
};

const getBalance = async (accountId, date) => {
  const idValidator = new Validator({
    accountId,
    date,
  }, {
    'accountId': 'required|mongoId',
    'date': 'required|date',
  });
  const matched = await idValidator.check();
  if (matched) {
    const policies = await store.balance(accountId, date);
    return {
      code: 200,
      body: policies,
      error: null,
    };
  }
  const response = errorResponse(idValidator.errors);
  return response;
};

module.exports = {
  getPolicy,
  createPolicy,
  removePolicy,
  editPolicy,
  getBalance,
};
