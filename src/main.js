import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

export const Router = (function () {
  const routes = {};

  function addRoute(path, component) {
    routes[path] = component;
  }

  function navigate(path) {
    if (!routes[path]) {
      path = "/404";
    }

    window.history.pushState({}, "", path); // history API: 새로고침 없이 주소만 변경이 가능하다
    render(path); // 컴포넌트 렌더링
  }

  function render(path) {
    const appElement = document.getElementById("root");
    if (!appElement) {
      console.error("app 요소를 찾을 수 없습니다.");
      return;
    }
    const component = routes[path] || routes["/404"]; // 경로를 찾지 못하면 404
    appElement.innerHTML = component();
  }

  // popstate: 뒤로가기, 앞으로가기 버튼을 눌렀을 때 발생하는 이벤트
  function handlePopState() {
    const currentPath = window.location.pathname;

    if (currentPath === "/profile" && !isLoggedIn()) {
      window.history.replaceState({}, "", "/login"); // replaceState: 현재 페이지의 상태를 새로 고쳐서 history entry를 교체합니다
      render("/login");
      return;
    }

    render(window.location.pathname);
  }

  function init() {
    window.addEventListener("popstate", handlePopState); // 뒤로가기, 앞으로가기 버튼을 눌렀을 때 발생하는 이벤트
    document.addEventListener("click", (e) => {
      const target = e.target.closest("a.nav-link");
      if (target) {
        e.preventDefault();
        const path = target.getAttribute("href");
        navigate(path);
      }
    });
    navigate(window.location.pathname);
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();

function isLoggedIn() {
  return localStorage.getItem("user");
}

Router.addRoute("/", MainPage);
Router.addRoute("/profile", ProfilePage);
Router.addRoute("/login", LoginPage);
Router.addRoute("/404", ErrorPage);

Router.init();
