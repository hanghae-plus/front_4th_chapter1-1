import NotFoundPage from "./pages/NotFoundPage";
import { LoginPage, setupLoginPage } from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { ProfilePage, setUpProfilePage } from "./pages/ProfilePage";

export type Routes = {
  [key: string]: {
    setUp?: () => void;
    component: () => string;
    isProtectedRoute?: boolean;
  };
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  NOT_FOUND: "*",
} as const;

export type RoutePaths = (typeof ROUTES)[keyof typeof ROUTES];

export const routes: Record<
  RoutePaths,
  {
    component: () => string;
    setUp?: () => void;
    isProtectedRoute: boolean;
  }
> = {
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
    setUp: () => {},
    component: NotFoundPage,
    isProtectedRoute: false,
  },
};
