export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const isLoggedIn = () => {
  const user = getUser();
  if (user && user.username !== "") {
    return true;
  } else {
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
  console.log(`userValue: ${userValue}`);
  if (userValue) {
    return JSON.parse(userValue);
  }
  // return null
  return { username: "", email: "", bio: "" };
};
// userValue: {"username":"qweqweqwe","email":"asdasd@naver.com","bio":"nsajkdjasdnjkasdnjk"}

export const removeUser = () => {
  saveUser("", "", "");
};
