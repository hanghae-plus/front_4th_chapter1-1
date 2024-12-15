import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, setupLoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { ProfilePage, setUpProfilePage } from "./pages/ProfilePage";
import { setupHeader } from "./shared/components/Header";

export type Routes = {
  [key: string]: {
    setUp: () => void;
    component: () => string;
    isProtectedRoute?: boolean;
  };
};

export const routes: Routes = {
  "/": {
    setUp: () => {
      setupHeader();
    },
    component: MainPage,
    isProtectedRoute: false,
  },
  "/login": {
    setUp: setupLoginPage,
    component: LoginPage,
    isProtectedRoute: false,
  },
  "/profile": {
    setUp: () => {
      setupHeader();
      setUpProfilePage();
    },
    component: ProfilePage,
    isProtectedRoute: true,
  },
  "*": {
    setUp: () => {},
    component: NotFoundPage,
    isProtectedRoute: false,
  },
};
