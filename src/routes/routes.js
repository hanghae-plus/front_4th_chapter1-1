import { path } from "../utils/const/path.js";
import { mainPage } from "../pages/MainPage.js";
import { profilePage } from "../pages/ProfilePage.js";
import { loginPage } from "../pages/LoginPage.js";
import { notFoundPage } from "../pages/NotFoundPage.js";

export const routes = {
  [path.MAIN]: mainPage,
  [path.PROFILE]: profilePage,
  [path.LOGIN]: loginPage,
  [path.NOT_FOUND]: notFoundPage,
};
