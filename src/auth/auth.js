import { USER_KEY } from "../common/const";

export class Auth {
  static get isLoggedIn() {
    return localStorage.getItem(USER_KEY) ? true : false;
  }
}
