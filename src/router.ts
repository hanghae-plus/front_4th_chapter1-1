import { UserStore } from "./store/userStore";

export type Routes = "/" | "/profile" | "/login" | "404";
type Component = () => string;

interface createRoutesType<T extends Routes> {
  route: Record<T, Component>;
  isHash: boolean;
}

export const Router = (function () {
  const routes: Record<Routes, Component> = {} as Record<Routes, Component>;

  let routeMode: "hash" | "history";

  function createRoutes<T extends Routes>(props: createRoutesType<T>) {
    (Object.keys(props.route) as (keyof typeof props.route)[]).forEach(
      (prop) => {
        routes[prop] = props.route[prop];
      },
    );

    const { isHash } = props;

    if (isHash) {
      attatchHistoryEvent();
      attatchHashEvent();
    } else {
      attatchHistoryEvent();
    }

    routeMode = isHash && location.hash ? "hash" : "history";

    handleRoute();
  }

  function push(path: Routes) {
    const pathName = getMappingPathByRoutingMode(path);
    history.pushState({}, "", pathName);

    handleRoute();
  }

  function replace(path: Routes) {
    const pathName = getMappingPathByRoutingMode(path);

    history.replaceState({}, "", pathName);

    handleRoute();
  }

  function getMappingPathByRoutingMode(path: Routes) {
    if (location.hash) {
      return `#${path}`;
    } else {
      return path;
    }
  }

  function handleRoute() {
    const path =
      routeMode === "history"
        ? (location.pathname as Routes)
        : (location.hash.replace("#", "") as Routes);

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
        return UserStore.state.userInfo ? "/" : undefined;
      case "/profile":
        return !UserStore.state.userInfo ? "/login" : undefined;
      default:
        return undefined;
    }
  }

  function attatchHistoryEvent() {
    window.addEventListener("popstate", () => {
      routeMode = "history";
      handleRoute();
    });
  }

  function attatchHashEvent() {
    window.addEventListener("hashchange", () => {
      routeMode = "hash";
      handleRoute();
    });
  }

  return {
    replace,
    push,
    createRoutes,
  };
})();
