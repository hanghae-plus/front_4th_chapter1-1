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

const isHistoryRouter = import.meta.env.VITE_ROUTER_MODE === "history";

export const ROUTES = {
  HOME: isHistoryRouter ? "/" : "#/",
  LOGIN: isHistoryRouter ? "/login" : "#/login",
  PROFILE: isHistoryRouter ? "/profile" : "#/profile",
  NOT_FOUND: isHistoryRouter ? "404" : "#/404",
} as const;

export type RoutePaths = (typeof ROUTES)[keyof typeof ROUTES];

export const routes = {
  [ROUTES.HOME]: {
    component: MainPage,
    isProtectedRoute: false,
  },
  [ROUTES.LOGIN]: {
    setUp: setupLoginPage,
    component: LoginPage,
    isProtectedRoute: false,
  },
  [ROUTES.PROFILE]: {
    setUp: () => {
      setUpProfilePage();
    },
    component: ProfilePage,
    isProtectedRoute: true,
  },
  [ROUTES.NOT_FOUND]: {
    component: NotFoundPage,
    isProtectedRoute: false,
  },
};
