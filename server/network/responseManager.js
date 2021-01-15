const success = (res, codeStatus, body) => {
  res.status(codeStatus).send({
    error: '',
    body,
  });
};

const fail = (res, codeStatus, error) => {
  res.status(codeStatus).send({
    error,
    body: '',
  });
};

module.exports = {
  success,
  fail,
};
