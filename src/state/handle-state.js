const USER_KEY = "user";

const userState = {
  user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
};

export const getUser = () => userState;

export const setUser = (user) => {
  userState.user = user;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUser = () => {
  userState.user = null;
  localStorage.removeItem(USER_KEY);
};
