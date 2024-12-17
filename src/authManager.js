import { userStore } from "./store/userStore";

export default class AuthManager {
  constructor(router) {
    this.router = router;
  }

  login({ username, email = "", bio = "" }) {
    const user = { username, email, bio };
    userStore.user = user;
    this.router.navigate("/");
  }

  logout() {
    userStore.clearUser();
    this.router.navigate("/login");
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

  // 이벤트 리스너 초기화
  init() {
    document.body.addEventListener("submit", (e) => {
      if (e.target?.id === "login-form") {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        const username = usernameInput?.value || "";

        // if (!this.validateUsername(username)) return;

        this.login({ username });
      }
    });

    document.body.addEventListener("click", (e) => {
      const logoutButton = e.target.closest("#logout");
      if (logoutButton) {
        e.preventDefault();
        this.logout();
      }
    });
  }
}
