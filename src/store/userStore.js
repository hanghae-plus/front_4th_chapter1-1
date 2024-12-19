class UserStore {
  constructor() {
    if (UserStore.instance) {
      return UserStore.instance;
    }
    UserStore.instance = this;
    this.user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
  }

  deleteUser() {
    localStorage.removeItem("user");
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  isLogin() {
    return !!this.user;
  }
}

export default new UserStore();
