import { ProfileTemplate } from "../templates/ProfileTemplate.js";
import { UserStore } from "../store/userStore.js";
import { Component } from "../utils/lib/component.js";
import { PATH } from "../utils/const/path.js";

class ProfilePage extends Component {
  constructor() {
    super();
  }

  render() {
    if (!new UserStore().getState()) {
      this.router.navigate(PATH.LOGIN);
      return;
    }

    this.setHTMLContent(ProfileTemplate(new UserStore().getState().bio));

    this.editEventListeners();
    this.updateProfileTemplate();
    this.logoutEventListener();
  }

  editEventListeners() {
    document.getElementById("profile-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      new UserStore().setState({ username, email, bio });
      this.updateProfileTemplate();
    });
  }

  updateProfileTemplate() {
    const { username, email, bio } = new UserStore().getState();

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
  }

  logoutEventListener() {
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      new UserStore().removeUser();
      this.router.navigate(PATH.LOGIN);
    });
  }
}

export const profilePage = new ProfilePage();
