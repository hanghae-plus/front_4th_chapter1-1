import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";
import hashRouter from "./router/HashRouter";
import browserRouter from "./router/Router";
import userStore from "./store/userStore";

browserRouter.addRoute("/", new MainPage(browserRouter));
browserRouter.addRoute("/login", new LoginPage(browserRouter));
browserRouter.addRoute("/profile", new ProfilePage(browserRouter));

hashRouter.addRoute("/", new MainPage(hashRouter));
hashRouter.addRoute("/login", new LoginPage(hashRouter));
hashRouter.addRoute("/profile", new ProfilePage(hashRouter));

if (localStorage.getItem("user")) {
  const { username, email, bio } = JSON.parse(localStorage.getItem("user"));
  userStore.setState({
    username,
    email,
    bio,
  });
}

window.addEventListener("hashchange", () => {
  if (window.location.hash) {
    hashRouter.navigateTo(window.location.hash.slice(1));
  }
});

if (window.location.hash) {
  hashRouter.navigateTo(window.location.hash.slice(1));
} else {
  browserRouter.navigateTo(window.location.pathname);
}
