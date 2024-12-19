import { userStore } from "../store/userStore";

const AUTH_REQUIRED_PAGES = ["/profile"];

export default class Router {
  #routes = {};

  constructor(routes) {
    this.#routes = routes;
  }

  init() {
    this.handleEventListeners();
    const path = this.isHash()
      ? window.location.hash
      : window.location.pathname;

    this.navigate(path);
  }

  navigate(path) {
    const root = document.getElementById("root");

    if (this.isHash()) {
      path = location.hash.slice(1) || "/";
    }
    const authenticatedPath = this.checkAuth(path);
    const render = this.#routes[authenticatedPath] || this.#routes["/404"];

    root.innerHTML = render();
  }

  checkAuth(path) {
    let authenticatedPath = path;

    if (AUTH_REQUIRED_PAGES.includes(path) && !userStore.isLoggedIn()) {
      alert("로그인이 필요한 페이지입니다.");
      authenticatedPath = "/login";
    } else if (path === "/login" && userStore.isLoggedIn()) {
      alert("이미 로그인되어 있습니다.");
      authenticatedPath = "/";
    }

    return authenticatedPath;
  }

  handleEventListeners() {
    this.handleLinkClick();
    this.handleHashChange();
    this.handlePopstate();
  }

  handlePopstate() {
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  handleHashChange() {
    window.addEventListener("hashchange", () => {
      this.navigate(window.location.hash);
    });
  }

  handleLinkClick() {
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (target) {
        e.preventDefault();

        const href = target.getAttribute("href");
        if (this.isHash()) {
          window.location.hash = href;
          return;
        }
        history.pushState(null, "", href);
        this.navigate(href);
      }
    });
  }

  isHash() {
    return location.hash && location.hash.startsWith("#");
  }
}
