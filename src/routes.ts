import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, setupLoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { ProfilePage, setUpProfilePage } from "./pages/ProfilePage";

export type Routes<T extends string> = {
  [key in T]: {
    setUp?: () => void;
    component: () => string;
    isProtectedRoute?: boolean;
  };
};

export const getPathnames = () => {
  const isHashRouter = window.ROUTE_MODE === "hash";
  return {
    HOME: isHashRouter ? "#/" : "/",
    LOGIN: isHashRouter ? "#/login" : "/login",
    PROFILE: isHashRouter ? "#/profile" : "/profile",
    NOT_FOUND: isHashRouter ? "#/404" : "404",
  } as const;
};

export const getRoutes = () => {
  const PATHNAMES = getPathnames();

  return {
    [PATHNAMES.HOME]: {
      component: MainPage,
      isProtectedRoute: false,
    },
    [PATHNAMES.LOGIN]: {
      setUp: setupLoginPage,
      component: LoginPage,
      isProtectedRoute: false,
    },
    [PATHNAMES.PROFILE]: {
      setUp: setUpProfilePage,
      component: ProfilePage,
      isProtectedRoute: true,
    },
    [PATHNAMES.NOT_FOUND]: {
      component: NotFoundPage,
      isProtectedRoute: false,
    },
  };
};
