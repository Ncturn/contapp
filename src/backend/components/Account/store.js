const model = require('./model');

const find = () => {
  return model.find({});
};

module.exports = {
  find,
};
