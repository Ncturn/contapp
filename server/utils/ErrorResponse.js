const errorResponse = (errors) => {
  const input = Object.keys(errors);
  const error = errors[input[0]];
  const response = {
    code: 400,
    error: error.message,
    body: '',
  };
  return response;
};

module.exports = errorResponse;
