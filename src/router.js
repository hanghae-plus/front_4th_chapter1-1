export const Router = () => {
  const routes = {};

  function handlePopState() {
    console.log(window.location.pathname);
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    console.log("test", routes[path] || routes["/error"]);
    const handler = routes[path] || routes["/error"];
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

  // function setDefaultRoute() {
  //     handleRoute("/");
  // }\
  function setDefaultRoute() {
    const initialPath = window.location.pathname;
    handleRoute(initialPath); // 현재 경로에 맞는 핸들러 실행
  }

  window.addEventListener("popstate", handlePopState);

  return {
    setDefaultRoute,
    addRoute,
    navigateTo,
  };
};
