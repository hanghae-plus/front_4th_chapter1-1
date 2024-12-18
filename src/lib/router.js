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

    updateURL: (url, { replace = false } = {}) => {
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
      window.removeEventListener("popstate", popstateHandler);
      window.addEventListener("popstate", popstateHandler);

      const clickHandler = (e) => {
        const link = e.target.closest("[data-link]");
        if (link) {
          e.preventDefault();
          const path = routerTypes.history.updateURL(link.href);
          handleRoute(path);
        }
      };
      document.removeEventListener("click", clickHandler);
      document.addEventListener("click", clickHandler);
    },
  },
  hash: {
    getPath: () => {
      const hash = window.location.hash.replace(/^#/, "");
      return hash ? hash : "/";
    },

    updateURL: (url, { replace = false } = {}) => {
      const hashPath = url.startsWith("http")
        ? new URL(url).hash.replace(/^#/, "")
        : url.replace(/^#/, "");
      const targetHash = hashPath.startsWith("/") ? hashPath : `/${hashPath}`;

      if (replace) {
        const currentURL = new URL(window.location.href);
        currentURL.hash = targetHash;
        history.replaceState(null, null, currentURL.href);
      } else {
        window.location.hash = targetHash;
      }

      return targetHash;
    },

    setupListeners: (handleRoute) => {
      const hashChangeHandler = () => handleRoute(routerTypes.hash.getPath());
      window.removeEventListener("hashchange", hashChangeHandler);
      window.addEventListener("hashchange", hashChangeHandler);

      const clickHandler = (e) => {
        const link = e.target.closest("[data-link]");
        if (link) {
          e.preventDefault();
          const href = link.getAttribute("href");
          const path = routerTypes.hash.updateURL(href);
          handleRoute(path);
        }
      };
      document.removeEventListener("click", clickHandler);
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
      navigate("/login", { replace: true });
      return;
    }

    if (path === "/login" && user) {
      navigate("/", { replace: true });
      return;
    }

    renderPage(path);
  };

  const navigate = (url, options) => {
    const path = router.updateURL(url, options);
    handleRoute(path);
    return path;
  };

  const init = (rootElementId) => {
    rootElement = document.getElementById(rootElementId);
    if (!rootElement) return;

    router.setupListeners(handleRoute);
    handleRoute(router.getPath());
  };

  return { init, navigate };
};

export default createRouter;
