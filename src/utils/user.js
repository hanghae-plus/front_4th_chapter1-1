export const getUser = () => {
  const user = localStorage.getItem("user");
  return user;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
