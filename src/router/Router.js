let routes = [];
let target = null;

function render(element) {
  target.innerHTML = element();
}

function findRoutes(path, routeList) {
  for (const route of routeList) {
    if (route.path === path) return route.element;
    if (route.children) {
      const layout = route;
      for (const child of route.children) {
        if (child.path === path) {
          return () => layout.element(child.element);
        }
      }
    }
  }
  return routeList.find((route) => route.path === "*").element;
}

export function setRenderTarget(element) {
  target = element;
}

export function addRoutes(...newRoutes) {
  routes = [...routes, ...newRoutes];
}

export function navigator(path) {
  const element = findRoutes(path, routes);
  window.history.pushState(null, "", path);
  render(element);
}
