export function login(username) {
  localStorage.setItem("user", username);
}

export function logout() {
  localStorage.removeItem("user");
}

export function getAuth() {
  return localStorage.getItem("user");
}
