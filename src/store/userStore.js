let user = JSON.parse(localStorage.getItem("user"));

function setUser(newUser) {
  localStorage.setItem("user", JSON.stringify(newUser));
  user = newUser;
}

function deleteUser() {
  localStorage.removeItem("user");
  user = null;
}

function getUser() {
  return user;
}

function isLogin() {
  return !!user;
}

const userStore = {
  setUser,
  deleteUser,
  getUser,
  isLogin,
};

export default userStore;
