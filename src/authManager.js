export default class AuthManager {
  constructor(router) {
    this.router = router;
  }

  isLoggedIn() {
    return localStorage.getItem("user") !== null;
  }

  get user() {
    return this.isLoggedIn() ? JSON.parse(localStorage.getItem("user")) : null;
  }

  set user(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  login({ username, email = "", bio = "" }) {
    const user = { username, email, bio };
    localStorage.setItem("user", JSON.stringify(user));
    this.router.navigate("/");
  }

  logout() {
    localStorage.removeItem("user");
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
