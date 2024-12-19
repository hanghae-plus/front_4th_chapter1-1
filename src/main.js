import AuthManager from "./authManager";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import NotFoundPage from "./pages/notFound";
import ProfilePage from "./pages/profile";
import Router from "./router";
import UserProfile from "./userProfile";

const mainPage = new MainPage();
const userProfile = new UserProfile();
const profilePage = new ProfilePage(userProfile);
const loginPage = new LoginPage();
const notFoundPage = new NotFoundPage();

const routes = {
  "/": () => mainPage.render(),
  "/profile": () => profilePage.render(),
  "/login": () => loginPage.render(),
  "/404": () => notFoundPage.render(),
};

const router = new Router(routes);
router.init();

const auth = new AuthManager(router);
auth.init();
