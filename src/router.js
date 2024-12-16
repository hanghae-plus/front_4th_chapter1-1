export const Router = () => {
  const routes = {};

  function handlePopState() {
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    const handler = routes[path] || routes["/errror"];
    if (handler) {
      document.body.innerHTML = handler();
    } else {
      /* empty */
    }
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigateTo(path) {
    history.pushState(null, "", path);
    handleRoute(path);
  }

  function setDefaultRoute() {
    handleRoute("/");
  }

  window.addEventListener("popstate", handlePopState);

  return {
    setDefaultRoute,
    addRoute,
    navigateTo,
  };
};
