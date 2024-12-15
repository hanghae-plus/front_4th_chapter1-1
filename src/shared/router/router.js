// History 속성
// 1. length Return
// 2. scrollRestoration
// 3. state

// History method
// 1. history.back() === history.go(-1)
// 2. history.go() 인수에 따라 상대적으로 동작함 -1, 0, 1
// 1. history.pushState() 스택에 추가
// 1. history.relaceState() 스택 최근 데이터로 대체

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
