export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const isLoggedIn = () => {
  return localStorage.getItem("username");
};

export const remove = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
