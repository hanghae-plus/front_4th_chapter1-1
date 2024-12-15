import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import router from "./router/Router";

router.addRoute("/", new MainPage());
router.addRoute("/login", new LoginPage());
router.addRoute("/profile", new ProfilePage());

router.navigateTo(window.location.pathname);
