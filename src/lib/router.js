// src/lib/router.js
import { MainPage } from "../pages/MainPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { ErrorPage } from "../pages/ErrorPage.js";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": ErrorPage,
};

const routerTypes = {
  history: {
    getPath: () => window.location.pathname,

    navigate: (url, { replace = false } = {}) => {
      const pathname = url.startsWith("http") ? new URL(url).pathname : url;

      if (replace) {
        history.replaceState(null, null, pathname);
      } else {
        history.pushState(null, null, pathname);
      }
      return pathname;
    },

    setupListeners: (handleRoute) => {
      const popstateHandler = () => handleRoute(routerTypes.history.getPath());
      window.removeEventListener("popstate", popstateHandler); // 기존 리스너 제거
      window.addEventListener("popstate", popstateHandler);

      const clickHandler = (e) => {
        if (e.target.matches("[data-link]")) {
          e.preventDefault();
          const path = routerTypes.history.navigate(e.target.href);
          handleRoute(path);
        }
      };
      document.removeEventListener("click", clickHandler); // 기존 리스너 제거
      document.addEventListener("click", clickHandler);
    },
  },
};

const createRouter = (type = "history") => {
  const router = routerTypes[type];
  let rootElement;

  const renderPage = (path) => {
    const page = routes[path] || routes["/404"];
    if (!page) return;
    rootElement.innerHTML = page();
  };

  const handleRoute = (path) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (path === "/profile" && !user) {
      router.navigate("/login", { replace: true });
      return;
    }
    renderPage(path);
  };

  const init = (rootElementId) => {
    rootElement = document.getElementById(rootElementId);
    if (!rootElement) return;

    router.setupListeners(handleRoute);
    handleRoute(router.getPath());
  };

  return { init, navigate: router.navigate };
};

export const router = createRouter("history");
