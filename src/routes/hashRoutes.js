import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";

const HASH_ROUTES = {
  "#/": () => HomePage(),
  "#/profile": () => ProfilePage(),
  "#/login": () => LoginPage(),
};

export default HASH_ROUTES;
