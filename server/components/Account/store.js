const Model = require('./model');

const find = (filter) => {
  return Model.find(filter).sort({ identifier: 'asc' });
};

const save = async (account) => {
  const isIdentifierUnique = await Model.find({
    identifier: account.identifier,
  });
  const isFirst = account.identifier === account.keycontrol;
  const keyControlExists = await Model.find({
    identifier: account.keycontrol,
  });

  if (isIdentifierUnique.length !== 0 || (keyControlExists.length === 0 && !isFirst)) {
    const response = {
      code: 409,
      error: 'Identificador duplicado o llave de control no encontrada',
    };
    return Promise.reject(response);
  }
  const accountModel = new Model(account);
  const accountData = await accountModel.save();
  return Promise.resolve({
    code: 201,
    body: accountData,
  });
};

const remove = async (identifier) => {
  const account = await Model.find({
    identifier,
  });
  const isKeyControl = await Model.find({
    keycontrol: identifier,
  });
  if (account.length !== 0 && isKeyControl.length === 0) {
    await Model.deleteOne({
      identifier,
    });
    return Promise.resolve({
      code: 200,
      body: 'Cuenta borrada exitosamente',
    });
  }
  const response = {
    code: 409,
    error: 'Esta cuenta no puede ser borrada mientras sea llave de control de otra cuenta',
  };
  return Promise.reject(response);
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
