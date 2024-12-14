import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

export type Routes = {
  [key: string]: () => string;
};

export const routes: Routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "*": ErrorPage,
};
