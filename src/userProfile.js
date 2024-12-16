export class UserProfile {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }

  async renderUserData() {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioInput = document.getElementById("bio");

    if (usernameInput && emailInput && bioInput) {
      const user = this.auth.user;
      if (user) {
        usernameInput.value = user.username || "";
        emailInput.value = user.email || "";
        bioInput.value = user.bio || "";
      }
    }
  }

  init() {
    this.renderUserData();
    this.router.afterEnter("/profile", async () => {
      await this.renderUserData();
    });
  }
}
