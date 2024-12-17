import { userStore } from "./store/userStore";

export class UserProfile {
  constructor(router) {
    this.router = router;

    // userStore 구독
    userStore.subscribeUser((user) => {
      this.renderUserData(user);
    });
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

  renderUserData(user = userStore.user) {
    const renderedUser = this.findUserProfile();
    if (renderedUser && user) {
      const { usernameInput, emailInput, bioInput } = renderedUser;
      usernameInput.value = user.username || "";
      emailInput.value = user.email || "";
      bioInput.value = user.bio || "";
    }
  }

  findUserProfile() {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioInput = document.getElementById("bio");
    return usernameInput && emailInput && bioInput
      ? { usernameInput, emailInput, bioInput }
      : null;
  }

  updateUserProfile() {
    const user = this.findUserProfile();
    if (user) {
      const { usernameInput, emailInput, bioInput } = user;
      userStore.user = {
        username: usernameInput.value,
        email: emailInput.value,
        bio: bioInput.value,
      };
    }
  }
}
