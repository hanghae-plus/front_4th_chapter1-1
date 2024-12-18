import UserService from "../service/UserService";
import Controller from "../core/Controller";
import ProfilePage from "../pages/Profile";
import Router from "../router/Router";
import ProfileController from "./ProfileController";

class LoginController extends Controller {
  attachListeners() {
    // 로그인 폼 제출 시 로그인 처리 및 프로필 페이지 초기화
    this.addListener("submit", "#login-form", (e) => {
      e.preventDefault();
      const username = this.$target.querySelector(".username").value.trim();

      if (!username) return;

      UserService.login(username);

      const router = new Router();

      // 새 프로필 컨트롤러 및 페이지 생성, 라우트 등록
      const profileController = new ProfileController();
      profileController.onInit();
      const profileInstnace = new ProfilePage(this.$target, profileController);
      router.addRoute("/profile", () => profileInstnace);
      router.navigate("/");
    });
  }
}

export default LoginController;
