import "./main.js";
import { isLoggedIn } from "./utils/local-storage.js";

export class HashRouter {
  constructor() {
    this.routes = {};
    this.root = document.getElementById("root");
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    let currentPath = path !== undefined ? path : window.location.pathname;

    const routeList = Object.keys(this.routes);
    if (!routeList.includes(currentPath)) {
      currentPath = "/404";
    }
    const loggedIn = isLoggedIn();

    if (currentPath === "/login" && loggedIn) {
      currentPath = "/";
    }

    if (!loggedIn && currentPath === "/profile") {
      currentPath = "/login";
    }

    this.render(currentPath);
  }

  render(path) {
    history.pushState(null, "", path);
    const handler = this.routes[path];
    if (handler) {
      this.root.innerHTML = handler();
    }
  }
}
