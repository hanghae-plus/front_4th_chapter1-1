import ErrorPage from "../page/error";
import { isAuthenticated } from "../util/login";

class Router {
  constructor(routerMap) {
    if (Router.instance) {
      console.log("test");
      return Router.instance;
    }
    Router.instance = this;
    this.routerMap = { error: ErrorPage, ...routerMap };
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }
  #updatePage(path) {
    const root = $("#root");
    const route = this.routerMap[path];

    if (!route) {
      root.innerHTML = this.routerMap["/error"].component();
      return;
    }

    if (route.authRequired && !isAuthenticated()) {
      this.push("/login");
      return;
    }

    root.innerHTML = this.routerMap[path].component();
  }
  push(path) {
    history.pushState(null, null, path);
    this.#updatePage(path);
  }

  replace(path) {
    history.replaceState(null, null, path);
    this.#updatePage(path);
  }

  handlePopState() {
    this.#updatePage(window.location.pathname);
  }

  // back() {
  //   history.back();
  // }

  // forward() {
  //   history.forward();
  // }

  // go(delta) {
  //   history.go(delta);
  // }
}
export default Router;
