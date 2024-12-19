const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
