export class UserStore {
  constructor() {
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) || null,
    };
    this.listeners = [];
  }

  get user() {
    return this.state.user;
  }

  set user(newUser) {
    this.state.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
    this.notify();
  }

  clearUser() {
    this.state.user = null;
    localStorage.removeItem("user");
    this.notify();
  }

  subscribeUser(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state.user));
  }
}

export const userStore = new UserStore();
