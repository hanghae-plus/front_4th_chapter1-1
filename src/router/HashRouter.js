import ErrorPage from "../page/ErrorPage";

class HashRouter {
  constructor() {
    this.root = document.querySelector("#root");
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  handlePopState() {
    this.handleRoute(window.location.hash.slice(1));
  }

  /**
   * history 상태 추가
   */
  navigateTo(path) {
    window.location.hash = path;
    this.handleRoute(path);
  }

  handleRoute(path) {
    console.log(path);
    const handler = this.routes[path];

    if (handler) {
      handler.render();
    } else {
      this.root.innerHTML = `${ErrorPage()}`;
    }

    if (document.querySelector("nav")) {
      document.querySelector("nav").addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          window.location.hash = e.target.href.replace(
            window.location.origin,
            "",
          );
        }
      });
    }
  }
}

const hashRouter = new HashRouter();

export default hashRouter;
