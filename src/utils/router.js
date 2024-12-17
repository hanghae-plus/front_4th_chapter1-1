const createRouter = (root) => {
  const routes = new Map();
  let currentPath = window.location.pathname;
  const addRoute = (route, element) => {
    routes.set(route, element);
    return router;
  };

  const getElement = () => {
    const path = currentPath;
    const element =
      routes.get(path) || routes.get("*") || document.createElement("div");
    return element;
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

const navigateTo = (path, options) => {
  if (options?.hash) {
    window.location.hash = path;
    dispatchEvent(new Event("hashchange"));
  } else {
    history.pushState(null, {}, path);
    dispatchEvent(new CustomEvent("routeChange"));
  }
};

const createHashRouter = (root) => {
  const routes = new Map();
  let currentPath = window.location.hash;

  const addRoute = (route, element) => {
    const hashRoute = `#${route}`;
    routes.set(hashRoute, element);
    return router;
  };

  const getElement = () => {
    const path = currentPath;
    const element =
      routes.get(path) || routes.get("#*") || document.createElement("div");
    return element;
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
