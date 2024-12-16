import { path } from "../utils/const/path.js";
import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";

export const routes = {
  [path.MAIN]: MainPage,
  [path.PROFILE]: ProfilePage,
  [path.LOGIN]: LoginPage,
  [path.NOT_FOUND]: NotFoundPage,
};
