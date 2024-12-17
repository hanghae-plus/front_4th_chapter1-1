import UserPreferences from "../utils/userPreference";
export default class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.routes = {};
    this.isHashMode = window.location.pathname.endsWith("hash.html");
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (this.isHashMode) {
      window.location.hash = path === "/" ? "" : path;
    } else {
      history.pushState(null, "", path);
      this.handleRoute(path);
    }
  }

  handlePopState() {
    const path = this.isHashMode
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;
    this.handleRoute(path);
  }

  handleHashChange() {
    const path = window.location.hash.slice(1) || "/";
    this.handleRoute(path);
  }

  handleRoute(path) {
    const prefs = new UserPreferences();
    const username = prefs.get("username");

    if (username && path === "/login") {
      if (this.isHashMode) {
        window.location.hash = "/";
      } else {
        this.navigateTo("/");
      }
      return;
    }

    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      const errorHandler = this.routes["/error"];
      if (errorHandler) errorHandler();
    }
  }

  renderInit() {
    if (this.isHashMode) {
      const path = window.location.hash.slice(1) || "/";
      this.handleRoute(path);
    } else {
      const path = window.location.pathname;
      if (["/", "/profile", "/login"].includes(path)) {
        this.navigateTo(path);
      } else {
        this.navigateTo("/error");
      }
    }
  }
}
