import { ROUTES, routes } from "../routes";

type Router = {
  render: (pathname: string) => void;
  navigate: (pathname: string) => void;
  init: () => void;
};

const createBaseRouter = (
  container: HTMLElement,
  getCurrentPath: () => string,
  updatePath: (path: string) => void,
): Router => {
  const checkAuth = (pathname: string) => {
    const route = routes[pathname];
    if (route?.isProtectedRoute && !localStorage.getItem("user")) {
      navigate(ROUTES.LOGIN);
      return ROUTES.LOGIN;
    }
    if (pathname === ROUTES.LOGIN && !!localStorage.getItem("user")) {
      navigate(ROUTES.HOME);
      return ROUTES.HOME;
    }
    return pathname;
  };

  const render = (pathname: string) => {
    const checkedPath = checkAuth(pathname);
    const route = routes[checkedPath] || routes[ROUTES.NOT_FOUND];
    container.innerHTML = route.component();
    route.setUp?.();
  };

  const navigate = (pathname: string) => {
    updatePath(pathname);
    render(pathname);
  };

  const init = () => {
    render(getCurrentPath());

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      const linkElement = target.closest("[data-link]");
      if (linkElement instanceof HTMLElement) {
        e.preventDefault();
        const pathname = linkElement.getAttribute("href") || ROUTES.HOME;
        navigate(pathname);
        return;
      }

      const logoutButton = target.closest('[data-action="logout"]');
      if (logoutButton) {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate(ROUTES.LOGIN);
        return;
      }
    });
  };

  return { render, navigate, init };
};

const createRouter = (container: HTMLElement): Router => {
  const isHashRouter = import.meta.env.VITE_ROUTER_MODE === "hash";
  console.log(import.meta.env.TEST);
  if (
    isHashRouter &&
    window.location.pathname !== "/index.hash.html" &&
    !import.meta.env.TEST
  ) {
    window.location.href = `/index.hash.html${window.location.hash || "#/"}`;
    return createBaseRouter(
      container,
      () => window.location.hash,
      (pathname) => (window.location.hash = pathname),
    );
  }

  const config = isHashRouter
    ? {
        getCurrentPath: () => window.location.hash,
        updatePath: (pathname: string) => (window.location.hash = pathname),
        event: "hashchange",
      }
    : {
        getCurrentPath: () => window.location.pathname,
        updatePath: (pathname: string) =>
          window.history.pushState({}, "", pathname),
        event: "popstate",
      };

  const router = createBaseRouter(
    container,
    config.getCurrentPath,
    config.updatePath,
  );

  window.addEventListener(config.event, () => {
    router.render(config.getCurrentPath());
  });

  return router;
};

export default createRouter;
