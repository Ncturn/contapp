const Model = require('./model');
const { accountExists } = require('../../utils/commonQueries');

const find = async (filter) => {
  const accounts = await Model.find(filter).sort({ identifier: 'asc' });
  return accounts;
};

const save = async (account) => {
  const isIdentifierUnique = await accountExists(Model, account.identifier);
  if (isIdentifierUnique) {
    return {
      code: 409,
      body: null,
      error: 'El identificador de la cuenta ya existe',
    };
  }
  const isFirst = account.identifier === account.keycontrol;
  const keyControlExists = await accountExists(Model, account.keycontrol);
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
      body: null,
    };
  }
  return {
    code: 200,
    error: null,
    body: 'Cuenta borrada exitosamente',
  };
};

const edit = async (editedAccount) => {
  const account = await accountExists(Model, editedAccount.identifier);
  if (!account) {
    return {
      code: 404,
      error: 'Cuenta no encontrada, verifique el identificador',
      body: null,
    };
  }
  const isFirst = editedAccount.identifier === editedAccount.keycontrol;
  const keyControlExists = await accountExists(Model, editedAccount.keycontrol);
  if (!keyControlExists && !isFirst) {
    return {
      code: 404,
      body: null,
      error: 'No se encontro la llave de control ingresada',
    };
  }
  const keys = Object.keys(editedAccount);
  keys.forEach((key) => {
    account[key] = editedAccount[key];
  });
  const newAccount = await account.save();
  return {
    code: 200,
    body: newAccount,
    error: null,
  };
};

module.exports = {
  find,
  save,
  remove,
  edit,
};
