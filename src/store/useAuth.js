export class useAuth {
  login(auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
    this.getAuth();
  }

  getAuth() {
    const info = JSON.parse(localStorage.getItem("auth"));
    if (!info) {
      return null;
    }

    const { id, password } = info;

    return { id, password };
  }

  isLogin() {
    const auth = this.getAuth();
    return auth && auth.id && auth.password ? true : false;
  }
  logOut() {
    localStorage.removeItem("auth");
  }
}
