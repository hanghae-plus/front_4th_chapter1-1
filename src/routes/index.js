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

  // 로그인 상태에 따라 라우트 보호
  function protectRoute(path) {
    const isLogin = UserStore.getValue("isLogin");

    if (path === ROUTES.PROFILE && !isLogin) {
      history.replaceState(null, "", ROUTES.LOGIN);
      return ROUTES.LOGIN;
    }
    if (path === ROUTES.LOGIN && isLogin) {
      history.replaceState(null, "", ROUTES.HOME);
      return ROUTES.HOME;
    }

    return path;
  }

  function renderPage(path) {
    // 유효한 라우트인지 확인
    if (!routes[path]) {
      history.replaceState(null, "", ROUTES.ERROR);
      const rootElement = document.getElementById("root");
      const notFoundPage = NotFoundPage();
      notFoundPage.render(rootElement);
      return;
    }
    const protectedPath = protectRoute(path);
    const page = routes[protectedPath];

    // 페이지 컴포넌트 생성하고 render 메서드 호출
    const pageInstance = page();
    if (typeof pageInstance.render === "function") {
      pageInstance.render();
    }
  }

  // 페이지 이동
  function navigate(path) {
    history.pushState(null, "", path);
    renderPage(path);
  }

  // 뒤로가기/앞으로가기 처리
  function handlePopState() {
    const path = window.location.pathname;
    renderPage(path);
  }

  // 링크 클릭 이벤트 처리
  function handleLinkClick(e) {
    const target = e.target.closest("a");
    if (!target) return;

    // 로그아웃
    if (target.id === "logout") {
      e.preventDefault();
      UserStore.clearState();
      navigate(ROUTES.LOGIN);
      return;
    }

    if (target.href.startsWith(window.location.origin)) {
      e.preventDefault();
      const path = target.getAttribute("href");
      navigate(path);
    }
  }

  // 라우터 초기화
  function init() {
    console.log("init");
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);

    renderPage(window.location.pathname || ROUTES.HOME);

    return () => {
      // 클린업 함수
      window.removeEventListener("popstate", handlePopState);
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
    [ROUTES.NOT_FOUND]: NotFoundPage,
  },
});
