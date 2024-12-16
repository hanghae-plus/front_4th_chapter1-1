export default class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      const errorHandler = this.routes["/error"];
      if (errorHandler) errorHandler();
    }
  }
}
