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

module.exports = {
  find,
  save,
};
