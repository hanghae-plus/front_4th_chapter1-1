export class CreateRouter {
  constructor(routes) {
    this.routes = routes;

    Object.values(routes).forEach((route) => route.setRouter(this));
  }

  init() {
    this.popstateListener();
    this.linkEventListeners();
    this.navigate(window.location.pathname);
  }

  navigate(currentPath) {
    const template = this.routes[currentPath] || this.routes.error;

    this.pushHistoryState(currentPath);
    return template.render();
  }

  linkEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        const path = e.target.getAttribute("href");

        if (path === "#") return;

        window.history.pushState({}, path, window.location.origin + path);
        this.navigate(path);
      }
    });
  }

  popstateListener() {
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  pushHistoryState(path) {
    window.history.pushState({}, path, window.location.origin + path);
  }
}
