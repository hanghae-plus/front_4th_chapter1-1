import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";

const routes = {
  "/": HomePage(),
  "/profile": ProfilePage(),
  "/login": LoginPage(),
};

export default routes;
