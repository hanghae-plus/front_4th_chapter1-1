export class useAuth {
  login(auth) {
    localStorage.setItem("user", JSON.stringify(auth));
  }

  getAuth() {
    const info = JSON.parse(localStorage.getItem("user"));
    if (!info) {
      return null;
    }

    const { username, email, bio } = info;

    return { username, email, bio };
  }

  isLogin() {
    const auth = this.getAuth();
    return auth && auth.username ? true : false;
  }
  logOut() {
    localStorage.removeItem("user");
  }
}
