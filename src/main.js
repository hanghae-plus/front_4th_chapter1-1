import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import browserRouter from "./router/Router";
import userStore from "./store/userStore";

browserRouter.addRoute("/", new MainPage(browserRouter));
browserRouter.addRoute("/login", new LoginPage(browserRouter));
browserRouter.addRoute("/profile", new ProfilePage(browserRouter));

if (localStorage.getItem("user")) {
  const { username, email, bio } = JSON.parse(localStorage.getItem("user"));
  userStore.setState({
    username,
    email,
    bio,
  });
}

browserRouter.navigateTo(window.location.pathname);
