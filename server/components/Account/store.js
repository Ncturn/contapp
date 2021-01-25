const Model = require('./model');
const { accountExists } = require('../../utils/commonQueries');

const find = async (filter) => {
  const accounts = await Model.find(filter).sort({ identifier: 'asc' });
  return accounts;
};

const save = async (account) => {
  const isIdentifierUnique = await accountExists(Model, account.identifier);
  const isFirst = account.identifier === account.keycontrol;
  const keyControlExists = await accountExists(Model, account.keycontrol);
  if (isIdentifierUnique) {
    return {
      code: 409,
      body: null,
      error: 'El identificador de la cuenta ya existe',
    };
  }
  if (!keyControlExists && !isFirst) {
    return {
      code: 404,
      body: null,
      error: 'No se encontro la llave de control ingresada',
    };
  }
  const accountModel = new Model(account);
  const accountData = await accountModel.save();
  return {
    code: 201,
    body: accountData,
    error: null,
  };
};

const remove = async (identifier) => {
  const isKeyControl = await Model.findOne({
    keycontrol: identifier,
  });
  if (isKeyControl) {
    return {
      code: 409,
      body: null,
      error: 'Esta cuenta no puede ser borrada mientras sea llave de control de otra cuenta',
    };
  }
  const isRemoved = await Model.deleteOne({
    identifier,
  });
  if (isRemoved.deletedCount === 0) {
    return {
      code: 404,
      error: 'Cuenta no encontrada, verifique el identificador',
      body: '',
    };
  }
  return {
    code: 200,
    error: null,
    body: 'Cuenta borrada exitosamente',
  };
};

const edit = async (editedAccount) => {
  const account = await Model.findOne({
    identifier: editedAccount.identifier,
  });
  if (!account) {
    const response = {
      code: 404,
      error: 'No se encontro ninguna cuenta',
    };
    return Promise.reject(response);
  }
  const keys = Object.keys(editedAccount);
  keys.forEach((key) => {
    if (key !== 'identifier' && key !== 'keycontrol') {
      account[key] = editedAccount[key];
    }
  });
  const newAccount = await account.save();
  return Promise.resolve({
    code: 200,
    body: newAccount,
  });
};

module.exports = {
  find,
  save,
  remove,
  edit,
};
