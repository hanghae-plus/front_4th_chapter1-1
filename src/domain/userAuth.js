import { userStore } from "../store/userStore";

export default class UserAuth {
  constructor() {}

  login({ username, email = "", bio = "" }) {
    const user = { username, email, bio };
    userStore.user = user;
  }

  logout() {
    userStore.clearUser();
  }

  validateUsername(username) {
    if (!username.trim()) {
      alert("사용자 이름을 입력해주세요.");
      return false;
    }
    if (!this.#isEmail(username) && !this.#isPhoneNumber(username)) {
      alert("이메일 또는 전화번호 형식으로 입력해주세요.");
      return false;
    }
    return true;
  }

  #isEmail(username) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(username);
  }

  #isPhoneNumber(username) {
    return /^(010|011|016|017|018|019)-?(\d{3,4})-?(\d{4})$/.test(username);
  }
}
