import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";

export const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  error: NotFoundPage,
};
