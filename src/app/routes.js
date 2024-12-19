import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

const Routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => ErrorPage(),
};

export default Routes;
