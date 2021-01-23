const store = require('./store');
const Validator = require('../../utils/CustomValidator');
const errorResponse = require('../../utils/ErrorResponse');

const getPolicy = async (policyFilter) => {
  const filter = {};
  if (policyFilter) {
    filter.identifier = policyFilter;
  }
  const policies = await store.find(filter);
  return {
    code: 200,
    body: policies,
    error: null,
  };
};

const createPolicy = async (policy) => {
  const policyValidator = new Validator({
    ...policy,
  }, {
    date: 'required|date',
    identifier: 'required|string|length:5,5|policy',
    consecutive: 'required|integer|digits:3',
    account: 'required|string|length:8,1|account:5',
    concept: 'required|string',
    amount: 'required|decimal',
    type: 'required|string|accepted:cargo,abono',
  });
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

module.exports = {
  getPolicy,
  createPolicy,
  removePolicy,
};
