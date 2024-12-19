const isCompletedMiddleware = (middlewares) => {
  if (!middlewares) return true;
  const isCompleted = middlewares.every((middleware) => middleware());
  return isCompleted;
};

const navigateTo = (path, options) => {
  if (options?.hash) {
    window.location.hash = path;
    dispatchEvent(new Event("hashchange"));
  } else {
    history.pushState(null, {}, path);
    dispatchEvent(new CustomEvent("routeChange"));
  }
};

const createRouter = (root) => {
  const routeMap = new Map();
  const middlewareMap = new Map();
  let currentPath = window.location.pathname;

  const addRoute = (route, element, middlewares) => {
    routeMap.set(route, element);
    middlewareMap.set(route, middlewares);
    return router;
  };

  const getElement = () => {
    const path = currentPath;

    const middlewares = middlewareMap.get(path);

    if (!isCompletedMiddleware(middlewares)) {
      return;
    }

    const element =
      routeMap.get(path) || routeMap.get("*") || document.createElement("div");

    return element();
  };

  const handleRouteChange = () => {
    currentPath = window.location.pathname;
    root.render();
  };

  const handlePopState = () => {
    handleRouteChange(window.location.pathname);
    root.render();
  };

  const init = () => {
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("routeChange", handleRouteChange);
    return router;
  };

  const router = {
    addRoute,
    getElement,
    init,
  };

  return router;
};

const createHashRouter = (root) => {
  const routeMap = new Map();
  const middlewareMap = new Map();
  let currentPath = window.location.hash;

  const addRoute = (route, element, middlewares) => {
    const hashRoute = `#${route}`;
    routeMap.set(hashRoute, element);
    middlewareMap.set(hashRoute, middlewares);
    return router;
  };

  const getElement = () => {
    const path = currentPath;

    const middlewares = middlewareMap.get(path);

    if (!isCompletedMiddleware(middlewares)) {
      return;
    }

    const element =
      routeMap.get(path) || routeMap.get("#*") || document.createElement("div");

    return element();
  };

  const handleRouteChange = () => {
    currentPath = window.location.hash;
    root.render();
  };

  const init = () => {
    if (currentPath === "") {
      navigateTo("/", { hash: true });
    }
    window.addEventListener("hashchange", handleRouteChange);
    return router;
  };

  const router = {
    addRoute,
    getElement,
    init,
  };

  return router;
};

export { createRouter, createHashRouter, navigateTo };
