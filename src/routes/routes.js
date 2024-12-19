import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import DefaultLayout from "../components/DefaultLayout";

const ROUTES = {
  "/": () => DefaultLayout(HomePage),
  "/profile": () => DefaultLayout(ProfilePage),
  "/login": () => LoginPage(),
};

export default ROUTES;