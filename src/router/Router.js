let routes = [];
let target = null;

function render(route) {
  target.innerHTML = route.element();
}

export function setRenderTarget(element) {
  target = element;
}

export function addRoutes(path, element) {
  routes = [...routes, { path, element }];
}

export function navigator(path) {
  const route =
    routes.find((route) => route.path === path) ||
    routes.find((route) => route.path === "*");
  window.history.pushState(null, "", path);
  render(route);
}
