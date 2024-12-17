import { UserStore } from "./store/userStore";

export type Routes = "/" | "/profile" | "/login" | "404";
export type HashRoutes = "#/" | "#/profile" | "#/login";

// 컴포넌트 타입 정의
type Component = () => string;

export const Router = (function () {
  const routes: Record<Routes | HashRoutes, Component> = {} as Record<
    Routes | HashRoutes,
    Component
  >;
  let currentRoute: () => void;
  let current: "hash" | "history";

  function addRoute<T extends Routes | HashRoutes>(
    path: T,
    component: Component,
  ) {
    routes[path] = component;
  }

  function push(path: Routes) {
    const mappingPath = current === "hash" ? mappingHashRoute(path) : path;

    history.pushState({}, "", mappingPath);
    console.log(mappingPath);
    currentRoute();
  }

  function replace(path: Routes) {
    history.replaceState({}, "", mappingHashRoute(path));

    currentRoute();
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

  function mappingHashRoute(path: Routes) {
    switch (path) {
      case "/":
        return "#/";
      case "/login":
        return "#/login";
      case "/profile":
        return "#/profile";
      default:
        return path;
    }
  }

  function handleHashRoute() {
    const path = location.hash as HashRoutes;

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
    window.addEventListener("popstate", () => {
      console.log("history");
      current = "history";
      handleRoute;
    });
    window.addEventListener("hashchange", () => {
      console.log("hash");
      current = "hash";
      handleHashRoute;
    });

    const hash = location.hash;

    if (hash) {
      currentRoute = handleHashRoute;
      current = "hash";
    } else {
      current = "history";
      currentRoute = handleRoute;
    }

    currentRoute();
  }

  return {
    init,
    replace,
    push,
    addRoute,
  };
})();
