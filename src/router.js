export const Router = () => {
  const routes = {};

  function handlePopState() {
    console.log(window.location.pathname);
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    let handler;
    if (path === "/profile") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        handler = routes["/profile"];
      } else {
        handler = routes["/login"];
      }
    } else {
      handler = routes[path] || routes["/error"];
    }
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
    if (window.location.pathname == path) return;
    history.pushState(null, "", path);
    handleRoute(path);
  }

  function setDefaultRoute() {
    const initialPath = window.location.pathname;
    handleRoute(initialPath);
  }

  window.addEventListener("popstate", handlePopState);

  return {
    setDefaultRoute,
    addRoute,
    navigateTo,
  };
};
