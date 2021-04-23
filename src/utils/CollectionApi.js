const getCollection = async (collection, parameter = '') => {
  const response = await fetch(`http://localhost:3000/${collection}${parameter}`);
  const data = await response.json();
  return data;
};
const deleteItem = async (collection, identifier) => {
  const response = await fetch(`http://localhost:3000/${collection}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
    }),
  });
  const data = await response.json();
  return data;
};
const createItem = async (collection, httpMethod, item) => {
  const response = await fetch(`http://localhost:3000/${collection}`, {
    method: httpMethod,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export {
  getCollection,
  deleteItem,
  createItem,
};
