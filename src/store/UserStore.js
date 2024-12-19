const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginState = () => {
  return !!getUser();
};

const setUser = ({ username, email, bio }) => {
  if (email && !isValidEmail(email)) {
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, email, bio }));
};

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const deleteUser = () => {
  localStorage.removeItem("user");
};

const isValidEmail = (val) => emailRegex.test(val);

const userStore = {
  LoginState,
  setUser,
  getUser,
  deleteUser,
  isValidEmail,
};

export default userStore;
