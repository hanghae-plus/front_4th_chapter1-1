/**
 * hash.js
 *
 * 이 라우터는 기본 라우터(index.js)와 유사하지만 해시 모드에서만 동작하도록 설계
 * 해시 모드는 URL의 해시(#) 부분을 사용하여 클라이언트 사이드 라우팅을 구현합니다.
 */

import { MainPage, LoginPage, ProfilePage, NotFoundPage } from "@pages";
import { UserStore } from "@stores";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ERROR: "/404",
  PROFILE: "/profile",
};

function createRouter(options = {}) {
  const routes = options.routes || {};

  function getPath() {
    return window.location.hash.slice(1) || "/";
  }

  function updatePath(path) {
    window.location.hash = path;
  }

  function replacePath(path) {
    window.location.replace(`#${path}`);
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
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }

    if (!routes[path]) {
      replacePath(ROUTES.ERROR);
      const notFoundPage = NotFoundPage();
      notFoundPage.render(rootElement);
      return;
    }

    const protectedPath = protectRoute(path);
    const page = routes[protectedPath];
    const pageInstance = page();

    if (typeof pageInstance.render === "function") {
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
    if (href?.startsWith("#") || href?.startsWith("/")) {
      e.preventDefault();
      const path = href.startsWith("#") ? href.slice(1) : href;
      navigate(path);
    }
  }

  function init() {
    window.addEventListener("hashchange", handleRouteChange);
    document.addEventListener("click", handleLinkClick);
    handleRouteChange();

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
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
