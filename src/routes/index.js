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
  const isHashMode = () => window.location.pathname.endsWith("hash.html");

  function getPath() {
    return isHashMode()
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;
  }

  function updatePath(path) {
    console.log("이거뭐야", isHashMode());
    if (isHashMode()) {
      window.location.hash = path;
    } else {
      history.pushState(null, "", path);
    }
  }

  function replacePath(path) {
    if (isHashMode()) {
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
    // DOM을 완전히 초기화
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }

    // 유효하지 않은 경로 처리
    if (!routes[path]) {
      replacePath(ROUTES.ERROR);
      const notFoundPage = NotFoundPage();
      notFoundPage.render(rootElement);
      return;
    }

    // 라우트 보호 처리
    const protectedPath = protectRoute(path);
    const page = routes[protectedPath];
    const pageInstance = page();

    // 페이지 렌더링
    if (typeof pageInstance.render === "function") {
      pageInstance.render(rootElement);
    }
  }

  function navigate(path) {
    console.log("이거 뭐냐 navigate", path);
    updatePath(path);
    renderPage(path);
  }

  function handleRouteChange() {
    const path = getPath();
    console.log("Current path:", path);
    renderPage(path);
  }

  function handleLinkClick(e) {
    const target = e.target.closest("a");
    if (!target) return;
    console.log("이거 뭐냐 handleLinkClick", target);
    if (target.id === "logout") {
      e.preventDefault();
      UserStore.clearState();
      navigate(ROUTES.LOGIN);
      return;
    }

    const href = target.getAttribute("href");
    // 해시 모드일 때와 아닐 때의 링크 처리
    if (isHashMode()) {
      // 해시 모드에서는 '#'으로 시작하는 링크도 처리
      if (href?.startsWith("#") || href?.startsWith("/")) {
        e.preventDefault();
        // '#'으로 시작하면 '#' 제거, 아니면 그대로 사용
        const path = href.startsWith("#") ? href.slice(1) : href;
        navigate(path);
      }
    } else {
      // 히스토리 모드에서는 '/'로 시작하는 링크만 처리
      if (href?.startsWith("/")) {
        e.preventDefault();
        navigate(href);
      }
    }
  }
  function init() {
    if (isHashMode()) {
      // hashchange 이벤트 핸들러 등록
      window.addEventListener("hashchange", () => {
        // 즉시 실행
        handleRouteChange();
      });
      if (!window.location.hash) {
        window.location.hash = "/";
        // 초기 렌더링 즉시 실행
        handleRouteChange();
      } else {
        // 이미 해시가 있는 경우 즉시 렌더링
        handleRouteChange();
      }
    } else {
      window.addEventListener("popstate", handleRouteChange);
      handleRouteChange();
    }

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
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
