import { store } from "../store";

const defaultUserInfo = {
  username: "",
  email: "",
  bio: "",
};

export const userService = (() => {
  return {
    isLogin: () => {
      return store.get("user") != null;
    },
    login: (user) => {
      store.set(
        "user",
        {
          ...defaultUserInfo,
          ...user,
        },
        { persistent: true },
      );
    },
    logout: () => {
      store.remove("user");
    },
    updateProfile: (profile) => {
      const user = store.get("user");
      store.set(
        "user",
        {
          ...user,
          ...profile,
        },
        { persistent: true },
      );
    },
    get userProfile() {
      return store.get("user") ?? defaultUserInfo;
    },
  };
})();
