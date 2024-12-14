import { userStore } from "../store";

export const userService = (() => {
  return {
    isLogin: () => {
      return userStore.get("user") != null;
    },
    login: (user) => {
      userStore.set("user", user, { persistent: true });
    },
    logout: () => {
      userStore.remove("user");
    },
    updateProfile: (profile) => {
      userStore.set("userProfile", profile, { persistent: true });
    },
    get userProfile() {
      return userStore.get("userProfile") ?? {};
    },
  };
})();
