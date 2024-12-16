import AuthManager from "./authManager";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";
import Router from "./router";
import { UserProfile } from "./userProfile";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": ErrorPage,
};

const router = new Router(routes);
router.init();

const auth = new AuthManager(router);
auth.init();

const userProfile = new UserProfile(auth, router);
userProfile.init();
