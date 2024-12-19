class UserState {
  constructor() {
    this.state = {};
  }

  setUserState(userInfo) {
    window.localStorage.setItem("user", JSON.stringify(userInfo));
    this.state = userInfo;
  }

  logout() {
    this.state = {};
    window.localStorage.removeItem("user");
  }

  checkLoginState() {
    return window.localStorage.getItem("user");
  }

  getUserInfo() {
    const storedUser = window.localStorage.getItem("user");
    const info = storedUser ? JSON.parse(storedUser) : {};

    return {
      username: info.username ?? "",
      email: info.email ?? "",
      bio: info.bio ?? "",
    };
  }

  init() {
    const info = this.getUserInfo();
    if (window.localStorage.getItem("user")) {
      this.setUserState(info);
    } else {
      this.state = {};
    }
  }
}

const userStore = new UserState();
userStore.init();

export default userStore;
