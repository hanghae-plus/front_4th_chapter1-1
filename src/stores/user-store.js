import { getItem, removeItem, setItem } from "@/utils/storage";
import { createStore } from "@/utils/store";

const initialState = {
  username: "",
  email: "",
  bio: "",
};

const userStore = createStore(getItem("user") ?? initialState);

const userStoreActions = {
  login: (user) => {
    setItem("user", user);
    userStore.setState(user);
  },
  logout: () => {
    removeItem("user");
    userStore.setState(initialState);
  },
  updateUser: (user) => {
    setItem("user", user);
    userStore.setState(user);
  },
};

export { userStore, userStoreActions };
