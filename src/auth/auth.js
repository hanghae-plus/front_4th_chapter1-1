import { USER_KEY } from "../common/const";

export class Auth {
  static get isLoggedIn() {
    return localStorage.getItem(USER_KEY) ? true : false;
  }

  static login(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static logout() {
    this.isLoggedIn && localStorage.removeItem(USER_KEY);
  }
}
