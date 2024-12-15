import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";

type Routes = "/" | "/profile" | "/login" | "404";

// 컴포넌트 타입 정의
type Component = () => string;

const Router = (function () {
  const routes: Record<Routes, Component> = {} as Record<Routes, Component>;

  function addRoute<T extends Routes>(path: T, component: Component) {
    routes[path] = component;
  }

  function push(path: Routes) {
    // 브라우저 경로 변경
    history.pushState({}, "", path);

    // 현재 경로에 따라 컴포넌트 렌더링
    handleRoute();
  }

  function replace(path: Routes) {
    // 브라우저 경로 변경
    history.replaceState({}, "", path);

    // 현재 경로에 따라 컴포넌트 렌더링
    handleRoute();
  }

  function handleRoute() {
    const path = location.pathname as Routes;

    const component = routes[path] || routes["404"];

    const root = document.getElementById("root");

    if (root) {
      root.innerHTML = component();
    }
  }

  function init() {
    window.addEventListener("popstate", handleRoute);

    // 초기 경로 처리
    handleRoute();

    // window.addEventListener("hashchange", () => {
    //   const currentPath = window.location.hash.slice(1) as Routes;
    //   navigate(currentPath || "/");
    // });

    // const initialPath = window.location.hash.slice(1) as Routes;
    // navigate(initialPath || "/");
  }

  return {
    addRoute,
    push,
    replace,
    init,
  };
})();

Router.addRoute("/", MainPage);
Router.addRoute("/profile", ProfilePage);
Router.addRoute("/login", LoginPage);
Router.addRoute("404", ErrorPage);
Router.init();
