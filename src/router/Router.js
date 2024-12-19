class Router {
  routes = [];

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = Router;
  }

  addRoutes = (path, element) => {
    this.routes = [...this.routes, { path, element }];
  };

  navigator = (path) => {
    const route =
      this.routes.find((route) => route.path === path) ||
      this.routes.find((route) => route.path === "*");
    window.history.pushState(null, "", path);
    this.render(route);
  };

  render = (route) => {
    const root = document.getElementById("root");
    root.innerHTML = route.element();
  };
}

export default new Router();
