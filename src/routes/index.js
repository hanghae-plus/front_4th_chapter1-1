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

  // 해시 모드 여부 확인
  // 해시 모드와 히스토리 모드에 따라 다르게 처리
  const isHashMode = () => window.location.pathname.endsWith("hash.html");

  // 현재 경로 반환
  function getPath() {
    return isHashMode()
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;
  }

  // 새로운 경로로 이동
  function updatePath(path) {
    if (isHashMode()) {
      window.location.hash = path;
    } else {
      history.pushState(null, "", path);
    }
  }

  // 현재 경로를 새로운 경로로 교체 (이전 히스토리를 유지하지 않고 덮어쓰기)
  function replacePath(path) {
    if (isHashMode()) {
      window.location.replace(`#${path}`);
    } else {
      history.replaceState(null, "", path);
    }
  }

  // 라우트 보호 처리 (로그인 상태에 따라 접근 처리)
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
    // DOM 초기화
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

    // 라우트 보호 및 페이지 렌더링
    const protectedPath = protectRoute(path);
    const page = routes[protectedPath];
    const pageInstance = page();

    if (typeof pageInstance.render === "function") {
      pageInstance.render(rootElement);
    }
  }

  // 경로 업데이트 및 페이지 렌더링 수행
  function navigate(path) {
    updatePath(path);
    renderPage(path);
  }

  // 라우트 변경 이벤트 핸들러
  function handleRouteChange() {
    const path = getPath();
    renderPage(path);
  }

  // 링크 클릭 이벤트 핸들러
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

    // 해시 모드와 히스토리 모드에 따른 링크 처리
    if (isHashMode()) {
      if (href?.startsWith("#") || href?.startsWith("/")) {
        e.preventDefault();
        const path = href.startsWith("#") ? href.slice(1) : href;
        navigate(path);
      }
    } else {
      if (href?.startsWith("/")) {
        e.preventDefault();
        navigate(href);
      }
    }
  }

  // 라우트 초기화
  // 이벤트 리스너 등록 및 초기 렌더링 수행
  function init() {
    if (isHashMode()) {
      window.addEventListener("hashchange", handleRouteChange);

      // 초기 해시 설정 및 렌더링
      if (!window.location.hash) {
        window.location.hash = "/";
      }
      handleRouteChange();
    } else {
      window.addEventListener("popstate", handleRouteChange);
      handleRouteChange();
    }

    // 전역 링크 클릭 이벤트 리스너
    document.addEventListener("click", handleLinkClick);

    // 클린업 함수 반환
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
