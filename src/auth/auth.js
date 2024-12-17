export function login(username) {
  saveUser(username, "", "");
}

export function logout() {
  localStorage.removeItem("user");
}

export function getAuth() {
  return localStorage.getItem("user");
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}

export function saveUser(username, email, bio) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username,
      email: email,
      bio: bio,
    }),
  );
}
