export const Router = (function () {
  const routes = {};

  function addRoute(path, component) {
    routes[path] = component;
    console.log("routes", routes);
  }

  function navigate(path) {
    const component = routes[path] || routes["404"];
    document.getElementById("root").innerHTML = component();
  }

  function init() {
    window.addEventListener("hashchange", () => {
      navigate(window.location.hash.slice(1));
    });
    navigate(window.location.pathname || "/");
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();
