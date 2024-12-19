import UserAuth from "./domain/userAuth";
import UserProfile from "./domain/userProfile";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import NotFoundPage from "./pages/notFound";
import ProfilePage from "./pages/profile";
import Router from "./routers/router";

const mainPage = new MainPage();

const userProfile = new UserProfile();
const profilePage = new ProfilePage(userProfile);

const userAuth = new UserAuth();
const loginPage = new LoginPage(userAuth);

const notFoundPage = new NotFoundPage();

const routes = {
  "/": () => mainPage.render(),
  "/profile": () => profilePage.render(),
  "/login": () => loginPage.render(),
  "/404": () => notFoundPage.render(),
};

const router = new Router(routes);
router.init();
