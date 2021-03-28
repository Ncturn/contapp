const getCollection = async (collection, identifier) => {
  let parameter = '';
  if (identifier) {
    parameter = `?identifier=${identifier}`;
  }
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

export {
  getCollection,
  deleteItem,
};
