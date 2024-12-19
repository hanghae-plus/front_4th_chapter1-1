import { userStore } from "./store/userStore";

export default class UserProfile {
  constructor() {
    this.renderUserData = this.renderUserData.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.findUserProfile = this.findUserProfile.bind(this);
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
