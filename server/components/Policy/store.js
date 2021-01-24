const Model = require('./model');
const accountModel = require('../Account/model');
const { accountExists, policyExists } = require('../../utils/commonQueries');

const find = async (filter) => {
  const policies = await Model.find(filter).populate('account');
  return policies;
};

const save = async (policy) => {
  const account = await accountModel.find({
    identifier: policy.account,
  });
  if (account.length === 0) {
    const response = {
      code: 404,
      error: 'No se encontro la cuenta asociada a la póliza',
      body: '',
    };
    return response;
  }
  const newPolicy = new Model({
    ...policy,
    account: account[0]._id,
  });
  const policyData = await newPolicy.save();
  return {
    code: 201,
    body: policyData,
    error: null,
  };
};

const remove = async (identifier) => {
  const isRemoved = await Model.deleteOne({
    identifier,
  });
  if (isRemoved.deletedCount === 0) {
    return {
      code: 404,
      error: 'Póliza no encontrada, verifique el identificador',
      body: '',
    };
  }
  return {
    code: 200,
    error: null,
    body: 'Póliza borrada exitosamente',
  };
};

const patch = async (updatedPolicy) => {
  const policy = await policyExists(Model, updatedPolicy.identifier);
  if (!policy) {
    return {
      code: 404,
      error: 'No se encontro la poliza',
      body: '',
    };
  }
  const account = await accountExists(accountModel, updatedPolicy.account);
  if (!account) {
    return {
      code: 404,
      error: 'No se encontro la cuenta asociada a la póliza',
      body: '',
    };
  }
  const keys = Object.keys(updatedPolicy);
  keys.forEach((key) => {
    policy[key] = updatedPolicy[key];
  });
  policy.account = account._id;
  const patchPolicy = await policy.save();
  return {
    code: 200,
    body: patchPolicy,
    error: null,
  };
};

module.exports = {
  find,
  save,
  remove,
  patch,
};
