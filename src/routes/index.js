// src/routes/index.js
import { LoginPage, MainPage, ProfilePage, NotFoundPage } from "@pages";
import { UserStore } from "@stores";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ERROR: "/404",
  PROFILE: "/profile",
};

function createRouter(options = {}) {
  const routes = options.routes || {};
  const isHashMode = window.location.pathname.endsWith("hash.html");

  function getPath() {
    return isHashMode
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;
  }

  function updatePath(path) {
    if (isHashMode) {
      window.location.hash = path;
    } else {
      history.pushState(null, "", path);
    }
  }

  function replacePath(path) {
    if (isHashMode) {
      window.location.replace(`#${path}`);
    } else {
      history.replaceState(null, "", path);
    }
  }

  function protectRoute(path) {
    const isLogin = UserStore.getValue("isLogin");

    if (path === ROUTES.PROFILE && !isLogin) {
      replacePath(ROUTES.LOGIN);
      return ROUTES.LOGIN;
    }
    if (path === ROUTES.LOGIN && isLogin) {
      replacePath(ROUTES.HOME);
      return ROUTES.HOME;
    }

    return path;
  }

  function renderPage(path) {
    const rootElement = document.getElementById("root");

    // 페이지 렌더링 전에 root 엘리먼트 초기화
    rootElement.innerHTML = "";
    if (!routes[path]) {
      replacePath(ROUTES.ERROR);
      const rootElement = document.getElementById("root");
      const notFoundPage = NotFoundPage();
      notFoundPage.render(rootElement);
      return;
    }

    const protectedPath = protectRoute(path);
    const page = routes[protectedPath];
    const pageInstance = page();

    if (typeof pageInstance.render === "function") {
      const rootElement = document.getElementById("root");
      pageInstance.render(rootElement);
    }
  }

  function navigate(path) {
    updatePath(path);
    renderPage(path);
  }

  function handleRouteChange() {
    const path = getPath();
    renderPage(path);
  }

  function handleLinkClick(e) {
    const target = e.target.closest("a");
    if (!target) return;

    if (target.id === "logout") {
      e.preventDefault();
      UserStore.clearState();
      navigate(ROUTES.LOGIN);
      return;
    }

    const href = target.getAttribute("href");
    if (href?.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
  }

  function init() {
    if (isHashMode) {
      window.addEventListener("hashchange", handleRouteChange);
      if (!window.location.hash) {
        window.location.hash = "/";
        return;
      }
    } else {
      window.addEventListener("popstate", handleRouteChange);
    }

    document.addEventListener("click", handleLinkClick);
    handleRouteChange();

    return () => {
      if (isHashMode) {
        window.removeEventListener("hashchange", handleRouteChange);
      } else {
        window.removeEventListener("popstate", handleRouteChange);
      }
      document.removeEventListener("click", handleLinkClick);
    };
  }

  return {
    navigate,
    init,
  };
}

export const Router = createRouter({
  routes: {
    [ROUTES.HOME]: MainPage,
    [ROUTES.PROFILE]: ProfilePage,
    [ROUTES.LOGIN]: LoginPage,
    [ROUTES.ERROR]: NotFoundPage,
  },
});
