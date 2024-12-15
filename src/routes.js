import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";

const routes = {
  "/": MainPage(),
  "/profile": ProfilePage(),
  "/login": LoginPage(),
  "/*": ErrorPage(),
};

export default routes;
