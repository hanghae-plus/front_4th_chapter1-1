export interface User {
  username?: string;
  email?: string;
  bio?: string;
}

const createUserStore = () => {
  return {
    getUser() {
      const localStorageUser = localStorage.getItem("user");
      const user = localStorageUser ? JSON.parse(localStorageUser) : null;

      return user;
    },
    setUser(user: User) {
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser() {
      localStorage.removeItem("user");
    },
  };
};

export const userStore = createUserStore();
