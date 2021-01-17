const Model = require('./model');

const find = () => {
  return Model.find({}).sort({ identifier: 'asc' });
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
      code: 400,
      error: 'Keycontrol does not exists or identifier duplicated',
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
    code: 400,
    error: 'Esta cuenta no puede ser borrada mientras sea llave de control de otra cuenta',
  };
  return Promise.reject(response);
};

module.exports = {
  find,
  save,
  remove,
};
