const accountExists = async (Model, identifier) => {
  const account = await Model.findOne({
    identifier,
  });
  return account;
};

const policyExists = async (Model, identifier) => {
  const policy = await Model.findOne({
    identifier,
  });
  return policy;
};

module.exports = {
  accountExists,
  policyExists,
};
