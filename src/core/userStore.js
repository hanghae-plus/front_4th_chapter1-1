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
    return window.localStorage.getItem("user") ? true : false;
  }

  getUserInfo() {
    const storedUser = window.localStorage.getItem("user");
    const info = storedUser ? JSON.parse(storedUser) : {};
    return info;
  }
}

const userStore = new UserState();
export default userStore;
