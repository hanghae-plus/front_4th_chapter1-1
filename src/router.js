const AUTH_REQUIRED_PAGES = ["/profile"];

const isLoggedIn = () => !!localStorage.getItem("user");
export default class Router {
  #routes = {};
  #afterEnterCallbacks = null;

  constructor(routes) {
    this.#routes = routes;
  }

  init() {
    this.handleEventListeners();
    const path = window.location.pathname;
    this.navigate(path);
  }

  navigate(path) {
    const root = document.getElementById("root");

    const authenticatedPath = this.checkAuth(path);

    const render = this.#routes[authenticatedPath] || this.#routes["/404"];
    root.innerHTML = render();

    if (
      this.#afterEnterCallbacks &&
      this.#afterEnterCallbacks[authenticatedPath]
    ) {
      this.#afterEnterCallbacks[authenticatedPath].forEach((callback) =>
        callback(),
      );
    }
  }

  afterEnter(path, callback) {
    if (!this.#afterEnterCallbacks) {
      this.#afterEnterCallbacks = {};
      this.#afterEnterCallbacks[path] = [];
    }
    this.#afterEnterCallbacks[path].push(callback);
  }

  checkAuth(path) {
    let authenticatedPath = path;
    if (AUTH_REQUIRED_PAGES.includes(path) && !isLoggedIn()) {
      alert("로그인이 필요한 페이지입니다.");
      authenticatedPath = "/login";
    } else if (path === "/login" && isLoggedIn()) {
      alert("이미 로그인되어 있습니다.");
      authenticatedPath = "/";
    }
    return authenticatedPath;
  }

  handleEventListeners() {
    this.handleLinkClick();
    this.handlePopstate();
  }

  handlePopstate() {
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  handleLinkClick() {
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (target) {
        e.preventDefault();
        const path = target.getAttribute("href");
        history.pushState(null, "", path);
        this.navigate(path);
      }
    });
  }
}
