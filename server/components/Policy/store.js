const Model = require('./model');
const accountModel = require('../Account/model');

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

module.exports = {
  find,
  save,
};
