import { userStore } from "../store";

const defaultUserInfo = {
  username: "",
  email: "",
  bio: "",
};

export const userService = (() => {
  return {
    isLogin: () => {
      return userStore.get("user") != null;
    },
    login: (user) => {
      userStore.set(
        "user",
        {
          ...defaultUserInfo,
          ...user,
        },
        { persistent: true },
      );
    },
    logout: () => {
      userStore.remove("user");
    },
    updateProfile: (profile) => {
      const user = userStore.get("user");
      userStore.set(
        "user",
        {
          ...user,
          ...profile,
        },
        { persistent: true },
      );
    },
    get userProfile() {
      return userStore.get("user") ?? defaultUserInfo;
    },
  };
})();
