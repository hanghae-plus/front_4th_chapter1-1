import { Layout } from "../components/Layout";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/Login";
import { NotFoundPage } from "../pages/NotFound";
import { ProfilePage } from "../pages/Profile";

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

export const useNavigate = () => {
  const rootElement = document.querySelector("#root");

  const renderContent = (path) => {
    const route = routes.find((route) => route.path === path);
    const Component = Router.findComponent(path);

    if (rootElement) {
      rootElement.innerHTML = route?.useLayout
        ? Layout(Component.render())
        : Component.render();

      if (Component?.onMount) {
        Component.onMount();
      }
    }
  };

  const navigate = (path) => {
    renderContent(path);
    window.history.pushState({}, "", path);
  };

  return { navigate, renderPage: renderContent };
};
