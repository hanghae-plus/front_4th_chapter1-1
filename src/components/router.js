import { renderHome } from "@/pages/home";
import { renderLogin } from "@/pages/login";
import { render404 } from "@/pages/not-found";
import { renderProfile } from "@/pages/profile";

class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentRoute = "";
  }

  initialize() {
    this.addEventListeners();
    this.navigateTo(location.pathname || "/");
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
  }

  navigateTo(path, pushState = true) {
    if (this.routes[path]) {
      this.currentRoute = path;
      if (pushState) {
        history.pushState({}, "", path);
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

export default Router;

const routes = {
  "/": renderHome,
  "/login": renderLogin,
  "/profile": renderProfile,
  "/404": render404,
};

export const router = new Router(routes);
