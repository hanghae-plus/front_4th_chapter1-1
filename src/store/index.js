const USER_KEY = "user";

export function getUser() {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : false;
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}
