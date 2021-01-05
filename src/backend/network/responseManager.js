const success = (res, codeStatus, body) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  });
  res.status(codeStatus).send({
    error: '',
    body,
  });
};

const fail = (res, codeStatus, error) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  });
  res.status(codeStatus).send({
    error,
    body: '',
  });
};

module.exports = {
  success,
  fail,
};
