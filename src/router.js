import { pathRender } from "./pathRender";

export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (path == "/profile" && !localStorage.getItem("user")) {
      path = "/login";
    }
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
      document.getElementById("root").innerHTML = pathRender[404]; // 404 페이지 렌더링
    }
  }
}

export class HashRouter {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (`#${path}` !== window.location.hash) {
      window.location.hash = `#${path}`;
    }
    path = `#${path}`;

    if (path == "#/login" && localStorage.getItem("user")) {
      path = "#/";
    }
    if (path == "#/profile" && !localStorage.getItem("user")) {
      path = "#/login";
    }
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.hash);
  }

  handleRoute(path) {
    path = window.location.hash.slice(1) || "/";
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      document.getElementById("root").innerHTML = pathRender[404](); // 404 페이지 렌더링
    }
  }
}
