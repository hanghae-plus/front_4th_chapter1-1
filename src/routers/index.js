import { LoginPage, MainPage, ProfilePage, NotFoundPage } from "@pages";

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ERROR: "/404",
  PROFILE: "/profile",
};

function createRouter(options = {}) {
  const routes = options.routes || {};

  function renderPage(path) {
    const page = routes[path] || routes[ROUTES.ERROR];
    console.log(page());
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = page();
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

const Router = createRouter({
  routes: {
    [ROUTES.HOME]: MainPage,
    [ROUTES.PROFILE]: ProfilePage,
    [ROUTES.LOGIN]: LoginPage,
    [ROUTES.NOT_FOUND]: NotFoundPage,
  },
});

export default Router;
