import { LoginTemplate } from "../templates/LoginTemplate.js";
import { UserStore } from "../store/userStore.js";
import { Component } from "../utils/lib/component.js";
import { PATH } from "../utils/const/path.js";

class LoginPage extends Component {
  constructor() {
    super();
  }

  render() {
    if (new UserStore().getState() !== null) {
      this.router.navigate(PATH.MAIN);
      return;
    }

    this.setHTMLContent(LoginTemplate());

    this.loginEventListener();
  }

  loginEventListener() {
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;

      if (!username) {
        alert("사용자 이름을 입력해주세요.");
        return;
      }

      new UserStore().setState({ username: username, email: "", bio: "" });

      this.router.navigate(PATH.MAIN);
    });
  }
}

export const loginPage = new LoginPage();
