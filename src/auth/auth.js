export function login(username) {
  console.log(`save name : ${username}`);
  localStorage.setItem("username", username);
}

export function logout() {
  localStorage.removeItem("username");
}

export function getAuth() {
  return localStorage.getItem("username");
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}

export function saveUser(name, email, introduction) {
  localStorage.setItem(
    "user",
    JSON.stringify({ name: name, email: email, introduction: introduction }),
  );
}
