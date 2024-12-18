import { login } from "../auth/auth";
import Controller from "../core/Controller";
import ProfilePage from "../pages/Profile";
import Router from "../router/router";
import ProfileController from "./ProfileController";

class LoginController extends Controller {
  attachListeners() {
    this.addListener("submit", "#login-form", (e) => {
      e.preventDefault();
      const username = this.$target.querySelector(".username").value.trim();

      if (!username) {
        return;
      }

      login(username);

      const router = new Router();

      const profileController = new ProfileController();
      profileController.onInit();
      const profileInstnace = new ProfilePage(this.$target, profileController);
      router.addRoute("/profile", () => profileInstnace);
      router.navigate("/");
    });
  }
}

export default LoginController;
