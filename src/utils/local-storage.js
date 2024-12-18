export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const isLoggedIn = () => {
  const user = getUser();
  console.log(`isLoggedIn called, user: ${JSON.stringify(user)}`);

  if (user && user.username !== "") {
    console.log(`is logged in`);
    return true;
  } else {
    console.log(`is not logged in`);
    return false;
  }
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
