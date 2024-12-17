import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import router from "./router/Router";
import userStore from "./store/userStore";

router.addRoute("/", new MainPage());
router.addRoute("/login", new LoginPage());
router.addRoute("/profile", new ProfilePage());

if (localStorage.getItem("user")) {
  const { username, email, bio } = JSON.parse(localStorage.getItem("user"));
  userStore.setState({
    username,
    email,
    bio,
  });
}

router.navigateTo(window.location.pathname);
