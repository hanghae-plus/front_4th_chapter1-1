import User from "@/lib/auth/User";
import Store from "./core/Store";

class UserStore extends Store {
  constructor() {
    super({ user: User.getUser() });
  }

  getUser = () => {
    return this._getState().user;
  };

  setUser = (user) => {
    if (!user) return;
    this._setState({ user });
    User.setUser(user);
    // this.notifyObservers(this.state);
  };

  clearUser = () => {
    this._setState({ user: null });
    User.clearUser();
    // this.notifyObservers(this.state);
  };
}

const userStore = new UserStore();

export default userStore;
