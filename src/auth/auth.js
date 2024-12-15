export function login(id) {
  localStorage.setItem("user", id);
}

export function logout() {
  localStorage.removeItem("user");
}

export function getAuth() {
  return localStorage.getItem("user");
}
