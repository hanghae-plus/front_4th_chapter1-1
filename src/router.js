import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { ProfilePage } from "./pages/Profile";

const routes = [
  { path: "/", element: HomePage, useLayout: true },
  { path: "/login", element: LoginPage, useLayout: false },
  { path: "/profile", element: ProfilePage, useLayout: true },
  { path: "/not-found", element: NotFoundPage, useLayout: false },
];

export const Router = (() => {
  const findComponent = (path) =>
    routes.find((route) => route.path === path)?.element || NotFoundPage;

  return { findComponent };
})();
