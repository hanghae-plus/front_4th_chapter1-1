let routes = [];
let target = null;

function render(pageComponent) {
  target.innerHTML = pageComponent();
}

export function setRenderTarget(element) {
  target = element;
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

export function addRoutes(...newRoutes) {
  routes = [...routes, ...newRoutes];
}

export function navigator(path) {
  const pageComponent = findRoutes(path, routes);
  window.history.pushState(null, "", path);
  render(pageComponent);
}
