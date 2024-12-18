import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

export const router = {
  "/": () => MainPage(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
  "/404": () => ErrorPage(),
};
