class CreateRouter {
  constructor(routes = {}, { mode = "history" }) {
    this.routes = routes;
    this.currentRoute = "";
    this.mode = mode;
  }

  initialize() {
    this.addEventListeners();

    if (this.mode === "history") {
      this.navigateTo(location.pathname);
    } else if (this.mode === "hash") {
      this.navigateTo(location.hash || "/");
    }
  }

  addEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigateTo(path);
      }
    });

    window.addEventListener("popstate", () => {
      this.navigateTo(location.pathname, false);
    });
    window.addEventListener("hashchange", () => {
      this.navigateTo(location.hash.slice(1), false);
    });
  }

  navigateTo(path, pushState = true) {
    if (this.routes[path]) {
      this.currentRoute = path;
      if (pushState) {
        if (this.mode === "hash") {
          location.hash = path;
        } else if (this.mode === "history") {
          history.pushState({}, "", path);
        }
      }
      this.render();
    } else {
      console.error(`Route ${path} not found.`);
      this.navigateTo("/404", pushState);
    }
  }

  render() {
    const component = this.routes[this.currentRoute] || this.routes["/"];
    component();
  }
}

export default CreateRouter;
