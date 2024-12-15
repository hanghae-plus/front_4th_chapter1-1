import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, setupLoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import { setupHeader } from "./shared/components/Header";

export type Routes = {
  [key: string]: {
    setUp: () => void;
    component: () => string;
  };
};

export const routes: Routes = {
  "/": {
    setUp: () => {
      setupHeader();
    },
    component: MainPage,
  },
  "/login": {
    setUp: setupLoginPage,
    component: LoginPage,
  },
  "/profile": {
    setUp: () => {
      setupHeader();
    },
    component: ProfilePage,
  },
  "*": {
    setUp: () => {},
    component: NotFoundPage,
  },
};
