const store = require('./store');

const getAccount = () => {
  return new Promise((resolve, reject) => {
    const account = store.find({});
    account
      .then((list) => {
        resolve({
          code: 200,
          body: list,
        });
      })
      .catch((error) => {
        const response = {
          code: 500,
          error,
        };
        reject(response);
      });
  });
};

module.exports = {
  getAccount,
};
