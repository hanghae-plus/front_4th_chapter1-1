export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const remove = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
