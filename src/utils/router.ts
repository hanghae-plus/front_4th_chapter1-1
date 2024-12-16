import { UserStore } from "../store/authStore";

export type Routes = "/" | "/profile" | "/login" | "404";

// 컴포넌트 타입 정의
type Component = () => string;

export const Router = (function () {
  const routes: Record<Routes, Component> = {} as Record<Routes, Component>;

  function addRoute<T extends Routes>(path: T, component: Component) {
    routes[path] = component;
  }

  function push(path: Routes) {
    history.pushState({}, "", path);

    handleRoute();
  }

  function replace(path: Routes) {
    history.replaceState({}, "", path);

    handleRoute();
  }

  function handleRoute() {
    const path = location.pathname as Routes;

    const isAuthorized = checkAuthorized(path);

    if (isAuthorized) {
      replace("/login");
      return;
    }

    const component = routes[path] || routes["404"];

    const root = document.getElementById("root");

    if (root) {
      root.innerHTML = component();
    }
  }

  function checkAuthorized(path: Routes) {
    return !UserStore.state.userInfo && path === "/profile";
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
