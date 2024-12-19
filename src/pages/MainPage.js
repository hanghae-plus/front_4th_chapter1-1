import { MainTemplate } from "../templates/MainTemplate.js";
import { UserStore } from "../store/userStore.js";
import { Component } from "../utils/lib/component.js";
import { PATH } from "../utils/const/path.js";

class MainPage extends Component {
  constructor() {
    super();
  }

  render() {
    this.setHTMLContent(MainTemplate(this.isLogin()));

    this.logoutEventListener();
  }

  logoutEventListener() {
    if (this.isLogin()) {
      document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();

        new UserStore().removeUser();
        this.router.navigate(PATH.LOGIN);
      });
    }
  }

  isLogin() {
    return new UserStore().getState() !== null;
  }
}

export const mainPage = new MainPage();
