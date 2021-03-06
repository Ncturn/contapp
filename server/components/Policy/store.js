const Model = require('./model');
const { policyExists } = require('../../utils/commonQueries');

const find = async (filter) => {
  const policies = await Model.find(filter).populate('movements.account');
  return policies;
};

const save = async (policy) => {
  const isIdentifierUnique = await policyExists(Model, policy.identifier);
  if (isIdentifierUnique) {
    return {
      code: 409,
      body: null,
      error: 'El identificador de la poliza ya existe',
    };
  }
  const newPolicy = new Model(policy);
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

const edit = async (updatedPolicy) => {
  const policy = await policyExists(Model, updatedPolicy.identifier);
  if (!policy) {
    return {
      code: 404,
      error: 'No se encontro la poliza',
      body: '',
    };
  }
  const keys = Object.keys(updatedPolicy);
  keys.forEach((key) => {
    policy[key] = updatedPolicy[key];
  });
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
  edit,
};
