import { getPathnames, getRoutes } from "../routes";

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
  const PATHNAMES = getPathnames();
  const ROUTES = getRoutes();

  const checkAuth = (pathname: string) => {
    const route = ROUTES[pathname];
    if (route?.isProtectedRoute && !localStorage.getItem("user")) {
      navigate(PATHNAMES.LOGIN);
      return PATHNAMES.LOGIN;
    }
    if (pathname === PATHNAMES.LOGIN && !!localStorage.getItem("user")) {
      navigate(PATHNAMES.HOME);
      return PATHNAMES.HOME;
    }
    return pathname;
  };

  const render = (pathname: string) => {
    const checkedPath = checkAuth(pathname);
    const route = ROUTES[checkedPath] || ROUTES[PATHNAMES.NOT_FOUND];
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
        const pathname = linkElement.getAttribute("href") || PATHNAMES.HOME;
        navigate(pathname);
        return;
      }

      const logoutButton = target.closest('[data-action="logout"]');
      if (logoutButton) {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate(PATHNAMES.LOGIN);
        return;
      }
    });
  };

  return { render, navigate, init };
};

const createRouter = (container: HTMLElement): Router => {
  const isHashRouter = window.ROUTE_MODE === "hash";

  if (window.location.hash === "" && isHashRouter) {
    const currentPath = window.location.pathname;
    const [_, __, ...pathnames] = currentPath.split("/");

    window.location.href = `${window.location.origin}/index.hash.html#/${pathnames}`;
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
