//TODO: class 로 만들기.
export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const isLoggedIn = () => {
  const user = getUser();
  return user && user.username !== "";
};

export const saveUser = (username, email, bio) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username ?? "",
      email: email ?? "",
      bio: bio ?? "",
    }),
  );
};

export const getValue = (key) => {
  return localStorage.getItem(key) ?? "";
};

export const getUser = () => {
  const userValue = getValue("user");
  if (userValue) {
    return JSON.parse(userValue);
  }
  return null;
};

export const removeUser = () => {
  localStorage.clear();
};
