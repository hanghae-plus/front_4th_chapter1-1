import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, setupLoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

export type Routes = {
  [key: string]: {
    setUp: () => void;
    component: () => string;
  };
};

export const routes: Routes = {
  "/": {
    setUp: () => {},
    component: MainPage,
  },
  "/login": {
    setUp: setupLoginPage,
    component: LoginPage,
  },
  "/profile": {
    setUp: () => {},
    component: ProfilePage,
  },
  "*": {
    setUp: () => {},
    component: NotFoundPage,
  },
};
