import { store } from "../modules/store";

export const user = {
  isLogin: () => {
    return store.get("user") != null;
  },
  login: (user) => {
    store.set(
      "user",
      {
        username: "",
        email: "",
        bio: "",
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
  getProfile: () => {
    return (
      store.get("user") ?? {
        username: "",
        email: "",
        bio: "",
      }
    );
  },
};
