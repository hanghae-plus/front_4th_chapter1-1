export class CreateRouter {
  constructor(routes) {
    this.routes = routes;
  }

  init() {
    this.popstateListener();
    this.linkEventListeners();
    this.navigate(window.location.pathname);
  }

  navigate(path) {
    const handler = this.routes[path] || this.routes.error;

    document.getElementById("root").innerHTML = handler();
  }

  linkEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const path = e.target.getAttribute("href");

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
}
