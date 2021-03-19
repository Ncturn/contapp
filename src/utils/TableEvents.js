const handleTrashClick = (identifier, deleteItem) => {
  const confirmDelete = window.confirm(`¿Desea borrar la cuenta ${identifier}?`);
  if (confirmDelete) {
    deleteItem(identifier);
  }
};
const handlePencilClick = (history, collection, identifier) => {
  history.push(`/${collection}/edit/${identifier}`);
};
const handlePlusClick = (history, collection) => {
  history.push(`/${collection}/create/`);
};
let filterTimeout = null;
const handleFilterChange = (event, getCollection) => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(async () => {
    getCollection(event.target.value);
  }, 1000);
};

export {
  handleTrashClick,
  handlePencilClick,
  handlePlusClick,
  handleFilterChange,
};
