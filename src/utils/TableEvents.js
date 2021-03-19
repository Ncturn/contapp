const handleTrashClick = (identifier, deleteItem) => {
  const confirmDelete = window.confirm(`¿Desea borrar la cuenta ${identifier}?`);
  if (confirmDelete) {
    deleteItem(identifier);
  }
};
const handlePencilClick = (history, identifier) => {
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
const createHotKeyPlusIcon = (event) => {
  if (event.key === '+') {
    event.preventDefault();
    handlePlusClick();
  }
};

export {
  handleTrashClick,
  handlePencilClick,
  handlePlusClick,
  handleFilterChange,
  createHotKeyPlusIcon,
};
