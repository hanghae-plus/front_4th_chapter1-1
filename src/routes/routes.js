import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";

const routes = {
  "/": MainPage(),
  "/profile": ProfilePage(),
  "/login": LoginPage(),
};

export default routes;
