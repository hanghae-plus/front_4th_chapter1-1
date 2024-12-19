const userState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  userState.user = user;
}

export function deleteUser() {
  localStorage.removeItem("user");
  userState.user = null;
}

export function getUser() {
  return userState.user;
}
