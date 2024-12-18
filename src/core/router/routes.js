import { MainPage } from "../../pages/main-page";
import { LoginPage } from "../../pages/login-page";
import { ProfilePage } from "../../pages/profile-page";
import { ErrorPage } from "../../pages/error-page";

const PAGES = {
  MAIN_PAGE: "/",
  LOGIN_PAGE: "/login",
  PROFILE_PAGE: "/profile",
  ERROR_PAGE: "#",
};

const ROUTES = {
  [PAGES.MAIN_PAGE]: MainPage,
  [PAGES.LOGIN_PAGE]: LoginPage,
  [PAGES.PROFILE_PAGE]: ProfilePage,
  [PAGES.ERROR_PAGE]: ErrorPage,
};

export default ROUTES;
