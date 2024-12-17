export class UserProfile {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }

  init() {
    this.router.afterEnter("/profile", () => {
      this.renderUserData();
    });

    this.renderUserData();

    document.body.addEventListener("submit", (event) => {
      if (event.target?.id === "profile-form") {
        event.preventDefault();

        this.updateUserProfile();
      }
    });
  }

  renderUserData() {
    const user = this.auth.user;
    const updatedUser = this.findUserProfile();

    if (updatedUser) {
      const { usernameInput, emailInput, bioInput } = updatedUser;
      usernameInput.value = user.username || "";
      emailInput.value = user.email || "";
      bioInput.value = user.bio || "";
    }
  }

  findUserProfile() {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioInput = document.getElementById("bio");
    if (!usernameInput || !emailInput || !bioInput) {
      return null;
    }
    return { usernameInput, emailInput, bioInput };
  }

  updateUserProfile() {
    const { usernameInput, emailInput, bioInput } = this.findUserProfile();
    this.auth.user = {
      username: usernameInput.value,
      email: emailInput.value,
      bio: bioInput.value,
    };
  }
}
