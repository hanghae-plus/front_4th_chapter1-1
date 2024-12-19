import MainPage from "../pages/MainPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import LoginPage from "../pages/LoginPage.js";
import ErrorPage from "../pages/ErrorPage.js";

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => ErrorPage(),
};

export default routes;
