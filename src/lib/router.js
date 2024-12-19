import { EventManager } from "@/util/eventManager";
import UserStore from "./user";

class Router {
  routes = {};
  container;

  constructor() {
    this.state = {};
    this.init();
  }
  createRoutes(routes) {
    this.routes = routes;
  }
  init() {
    this.container = document.getElementById("root");
    this.container.innerHTML = "";

    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      this.linkRoute(window.location.pathname);
    });

    document.addEventListener("click", (e) => {
      const isLink = e.target.closest("a");
      if (!isLink) return;
      e.preventDefault();

      if (isLink.id === "logout") UserStore.logout();
      this.navigation(e.target.pathname);
    });
    document.addEventListener("DOMContentLoaded", () => {
      this.navigation(window.location.pathname);
    });
  }

  navigation(pathname) {
    history.pushState({ path: pathname }, null, pathname);
    this.linkRoute(pathname);
  }

  linkRoute(pathname) {
    const route = this.routes[pathname] || this.routes.notFound;

    if (!!route?.requiresAuth && !UserStore.checkLogin()) {
      this.navigation("/login");
      return;
    }

    if (pathname === "/login" && UserStore.checkLogin()) {
      this.navigation("/");
      return;
    }

    EventManager.clearEvent();

    this.container.innerHTML = route.component({
      router: this,
      container: this.container,
    });
  }
}

export { Router };
