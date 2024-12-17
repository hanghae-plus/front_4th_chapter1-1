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
    console.count("count");
    history.pushState({}, "", path);

    handleRoute();
  }

  function replace(path: Routes) {
    history.replaceState({}, "", path);

    handleRoute();
  }

  function handleRoute() {
    const path = location.pathname as Routes;

    const redirectPath = routeGuard(path);
    const shouldRedirect = !!redirectPath;

    if (shouldRedirect && redirectPath !== path) {
      push(redirectPath);
      return;
    }

    const component = routes[path] || routes["404"];

    const root = document.getElementById("root");

    if (root) {
      root.innerHTML = component();
    }
  }

  function routeGuard(path: Routes): Routes | undefined {
    switch (path) {
      case "/login":
        if (UserStore.state.userInfo) {
          return "/";
        }
        break;
      case "/profile":
        if (!UserStore.state.userInfo) {
          return "/login";
        }
        break;
      default:
        return undefined;
    }
  }

  function init() {
    window.addEventListener("popstate", handleRoute);

    handleRoute();
  }

  return {
    init,
    replace,
    push,
    addRoute,
  };
})();
