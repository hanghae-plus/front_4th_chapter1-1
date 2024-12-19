import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";

export const ROUTE_PATH = { MAIN: 0, LOGIN: 1, PROFILE: 2, ERROR: 3 };

export const ROUTE_DATA = [
  { path: "/", view: () => MainPage() },
  { path: "/login", view: () => LoginPage() },
  { path: "/profile", view: () => ProfilePage() },
  { path: "/404", view: () => ErrorPage() },
];

export const HASH_ROUTE_DATA = [
  { path: "#/", view: MainPage() },
  { path: "#/login", view: LoginPage() },
  { path: "#/profile", view: () => ProfilePage() },
  { path: "#/404", view: ErrorPage() },
];
