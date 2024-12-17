import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

export const Routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => ErrorPage(),
};
