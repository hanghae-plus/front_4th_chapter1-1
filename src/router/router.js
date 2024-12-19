export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", () => {
      this.handleRoute(window.location.pathname);
    });
  }
  addRoute(path, handler) {
    this.routes[path] = handler;
  }
  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }
  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.navigateTo("/404");
    }

    const nav = document.querySelector("nav");
    // 주소값이 다르다..
    if (nav) {
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          this.navigateTo(e.target.pathname);
        }
      });
    }
  }
}

export class HashRouter {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", () => {
      this.handleRoute(window.location.href);
    });
  }
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    const hashUrl = `${window.location.pathname}#` + path;
    history.pushState(null, "", hashUrl);
    this.handleRoute(hashUrl);
  }
  handleRoute(path) {
    const urlRoute = path.split("#")[1] || "";
    const handler = this.routes[urlRoute];
    if (handler) {
      handler();
    } else {
      this.navigateTo("/404");
    }

    const nav = document.querySelector("nav");
    if (nav) {
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          this.navigateTo(e.target.pathname);
        }
      });
    }
  }
}
