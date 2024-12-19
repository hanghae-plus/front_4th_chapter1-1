import { getItem, removeItem, setItem } from "@/utils/storage";
import { createStore } from "@/utils/store";

const USER_STORE_KEY = "user";

const user = getItem(USER_STORE_KEY);

const initialState = {
  isLogin: user ? true : false,
  user,
};

const authStore = createStore(initialState);

const authStoreActions = {
  login: (user) => {
    setItem(USER_STORE_KEY, user);
    authStore.setState({ isLogin: true, user });
  },
  logout: () => {
    removeItem(USER_STORE_KEY);
    authStore.setState({ isLogin: false, user: null });
  },
  updateUser: (user) => {
    setItem(USER_STORE_KEY, user);
    authStore.setState((prev) => ({ ...prev, user }));
  },
};

export { authStore, authStoreActions };
