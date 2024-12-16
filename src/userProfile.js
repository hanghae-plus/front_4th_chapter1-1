export class UserProfile {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }

  renderUserData() {
    const user = this.auth.user;

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioInput = document.getElementById("bio");

    if (usernameInput && emailInput && bioInput && user) {
      usernameInput.value = user.username || "";
      emailInput.value = user.email || "";
      bioInput.value = user.bio || "";
    }
  }

  observeDomAndRender() {
    const root = document.getElementById("root");
    if (!root) return;

    const observer = new MutationObserver(() => {
      const usernameInput = document.getElementById("username");
      const emailInput = document.getElementById("email");
      const bioInput = document.getElementById("bio");

      if (usernameInput && emailInput && bioInput) {
        this.renderUserData();
        observer.disconnect(); // Stop observing once inputs are ready and data is populated
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  }

  init() {
    this.router.afterEnter("/profile", () => {
      this.observeDomAndRender();
    });

    document.body.addEventListener("submit", (event) => {
      if (event.target?.id === "profile-form") {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const bio = document.getElementById("bio").value.trim();

        const user = { username, email, bio };
        this.auth.user = user;
        alert("프로필이 업데이트되었습니다!");
      }
    });
  }
}
