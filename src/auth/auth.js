import { storage } from "../storage/localstrage";

const createAuth = (storage) => {
  const storageKey = "user";

  const login = (username) => {
    if (!username) throw new Error("Username is required.");
    storage.setItem(storageKey, { username, email: "", bio: "" });
  };

  const update = (username, email, bio) => {
    if (!username) throw new Error("Username is required.");
    storage.setItem(storageKey, { username, email, bio });
  };

  const isLoggedIn = () => {
    const user = getUser();
    return user ? true : false;
  };

  const getUser = () => {
    const data = storage.getItem(storageKey);
    return data;
  };

  const logout = () => {
    storage.removeItem(storageKey);
  };

  return {
    login,
    isLoggedIn,
    getUser,
    logout,
    update,
  };
};

export const Auth = createAuth(storage);
